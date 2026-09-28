import { z } from 'zod';
const short = z.string().trim().min(1).max(200);
const image = z.string().max(2000).refine(v => v === '' || /^https:\/\//.test(v) || /^\/(?!\/)/.test(v), 'Use a local path or HTTPS image URL');
export const dishInput = z.object({
  name: short, category: z.enum(['Appetizers', 'Biryani & Rice', 'Curries', 'Kebabs & Grills', 'Seafood', 'Thai & Chinese', 'Desserts', 'Beverages', 'Breads', 'Salads']),
  price: z.number().int().min(0).max(1000000), description: z.string().max(3000).default(''),
  image_url: image.default(''), sort_order: z.number().int().default(0), is_signature: z.boolean().default(false),
  details: z.object({ name_bn: z.string().max(300).optional(), description_bn: z.string().max(3000).optional(),
    gallery: z.array(image).max(10).optional(), is_popular: z.boolean().optional(), is_chef_recommendation: z.boolean().optional(),
    is_vegetarian: z.boolean().optional(), is_vegan: z.boolean().optional(), is_gluten_free: z.boolean().optional(),
    spice_level: z.string().max(30).optional(), prep_time: z.number().min(0).max(300).optional(),
    add_ons: z.array(z.object({name: short, price: z.number().min(0).max(10000)})).max(20).optional(),
  }).default({}),
});
export const partyInput = z.object({ title: short, title_bn: z.string().max(300).default(''), description: z.string().max(3000).default(''), price_per_person: z.number().int().min(0).max(1000000), min_guests: z.number().int().min(1).max(10000), sort_order: z.number().int().default(0), items: z.array(short).max(50), more_count: z.number().int().min(0).default(0) });
export const reservationInput = z.object({ name: short, email: z.union([z.string().email().max(254), z.literal('')]).default(''), phone: z.string().trim().min(6).max(40), guests: z.number().int().min(1).max(50), seating: z.enum(['Indoor Luxury', 'Window View', 'Private Dining']), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {
  const date = new Date(v + 'T00:00:00Z');
  return !isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === v && date.getUTCDay() !== 1 && v >= new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dhaka' });
}, 'Choose an upcoming date, Tuesday through Sunday'), time: z.enum(['10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:30 PM', '9:00 PM']), special_requests: z.string().max(3000).default('') });
export const reviewInput = z.object({ author_name: short, rating: z.number().int().min(1).max(5), title: short, body: z.string().trim().min(1).max(5000), dish_name: z.string().max(200).default(''), photos: z.array(z.string().regex(/^\/api\/photos\/[a-f0-9-]+\.webp$/)).max(4).default([]) });
export function isAdmin(user: { roles?: string[] } | null) { return Boolean(user?.roles?.includes('admin')); }
