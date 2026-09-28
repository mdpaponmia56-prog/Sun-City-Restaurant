import { getUser } from '@netlify/identity';
import { eq, desc, asc } from 'drizzle-orm';
import { z } from 'zod';
import { getDb } from '../../db/index';
import { dishes, partyMenus, reservations, reviews } from '../../db/schema';
import { dishInput, partyInput, reservationInput, reviewInput, isAdmin } from '../lib/validation';
import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const reply = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
  try {
    const { entity, id } = context.params;
    const tables = { Dish: dishes, PartyMenu: partyMenus, Reservation: reservations, Review: reviews };
    const table = tables[entity as keyof typeof tables];
    if (!table) return reply({ error: 'Not found' }, 404);
    const user = await getUser();
    const admin = isAdmin(user);
    const url = new URL(req.url);
    const adminView = url.searchParams.get('admin') === 'true';
    if ((adminView || entity === 'Reservation' && req.method !== 'POST' || ['PATCH', 'DELETE'].includes(req.method) || req.method === 'POST' && ['Dish', 'PartyMenu'].includes(entity)) && !admin) return reply({ error: 'Administrator access required' }, user ? 403 : 401);
    const db = getDb();
    if (req.method === 'GET') {
      const conditions = id ? eq(table.id, id) : entity === 'Review' && !adminView ? eq(reviews.is_approved, true) : undefined;
      const rows = await db.select().from(table).where(conditions).orderBy('created_date' in table ? desc(table.created_date) : asc(table.sort_order)).limit(500);
      const result = rows.map((row: any) => {
        const { details, user_id, ...rest } = row;
        return details ? { ...details, ...rest, details } : rest;
      }).filter((row: any) => entity !== 'Review' || adminView || row.is_approved);
      if (id && !result[0]) return reply({ error: 'Not found' }, 404);
      return reply(id ? result[0] : result);
    }
    if (!['POST', 'PATCH', 'DELETE'].includes(req.method)) return reply({ error: 'Method not allowed' }, 405);
    if (req.headers.get('origin') && req.headers.get('origin') !== url.origin) return reply({ error: 'Invalid origin' }, 403);
    if (req.method === 'DELETE') {
      if (!id) return reply({ error: 'Record ID required' }, 400);
      const removed = await db.delete(table).where(eq(table.id, id)).returning({ id: table.id });
      return removed.length ? reply({ success: true }) : reply({ error: 'Not found' }, 404);
    }
    const raw = await req.text();
    if (raw.length > 20000) return reply({ error: 'Request too large' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return reply({ error: 'Invalid JSON' }, 400); }
    if (req.method === 'PATCH') {
      if (!id) return reply({ error: 'Record ID required' }, 400);
      const schema = entity === 'Dish' ? dishInput.partial() : entity === 'PartyMenu' ? partyInput.partial() : entity === 'Reservation' ? z.object({ status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']) }) : z.object({ is_approved: z.boolean() });
      const data = schema.parse(body);
      if (!Object.keys(data).length) return reply({ error: 'No changes supplied' }, 400);
      const rows = await db.update(table).set(data).where(eq(table.id, id)).returning();
      return rows.length ? reply(rows[0]) : reply({ error: 'Not found' }, 404);
    }
    if (entity === 'Review' && !user) return reply({ error: 'Please sign in to write a review' }, 401);
    const data = (entity === 'Dish' ? dishInput : entity === 'PartyMenu' ? partyInput : entity === 'Reservation' ? reservationInput : reviewInput).parse(body);
    const values = { ...data, id: crypto.randomUUID(), ...(entity === 'Review' ? { user_id: user!.id, is_approved: false, is_verified: false, source: 'website' } : {}), ...(entity === 'Reservation' ? { status: 'pending' } : {}) };
    const [created] = await db.insert(table).values(values as any).returning();
    return reply(created, 201);
  } catch (error) {
    if (error instanceof z.ZodError) return reply({ error: error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }, 400);
    return reply({ error: 'Unable to complete this request. Please try again.' }, 500);
  }
};
export const config = { path: ['/api/restaurant/:entity', '/api/restaurant/:entity/:id'] };
