import { getUser } from '@netlify/identity';
import { getStore } from '@netlify/blobs';
import sharp from 'sharp';
import type { Context } from '@netlify/functions';
export default async (req: Request, context: Context) => {
  const store = getStore('review-photos');
  if (req.method === 'GET') {
    const id = context.params.id;
    if (!/^[a-f0-9-]+\.webp$/.test(id || '')) return new Response('Not found', { status: 404 });
    const photo = await store.get(id, { type: 'arrayBuffer' });
    return photo ? new Response(photo, { headers: { 'Content-Type': 'image/webp', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=86400' } }) : new Response('Not found', { status: 404 });
  }
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!await getUser()) return Response.json({ error: 'Please sign in to upload photos' }, { status: 401 });
  if (req.headers.get('origin') && req.headers.get('origin') !== new URL(req.url).origin) return new Response('Forbidden', { status: 403 });
  try {
    const data = await req.formData();
    const file = data.get('file');
    if (!(file instanceof File) || file.size > 3 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return Response.json({ error: 'Use a JPG, PNG or WebP image under 3 MB' }, { status: 400 });
    const buffer = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 20000000 }).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp().toBuffer();
    const id = crypto.randomUUID() + '.webp';
    await store.set(id, new Uint8Array(buffer).buffer);
    return Response.json({ file_url: '/api/photos/' + id });
  } catch { return Response.json({ error: 'Photo upload failed. Please use a valid image.' }, { status: 400 }); }
};
export const config = { path: ['/api/photos', '/api/photos/:id'] };
