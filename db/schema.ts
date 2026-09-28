import { pgTable, text, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const dishes = pgTable('dishes', {
  id: text().primaryKey(), name: text().notNull(), category: text().notNull(),
  price: integer().notNull(), description: text().notNull().default(''),
  image_url: text().notNull().default(''), sort_order: integer().notNull().default(0),
  is_signature: boolean().notNull().default(false),
  details: jsonb().$type<Record<string, unknown>>().notNull().default({}),
});
export const partyMenus = pgTable('party_menus', {
  id: text().primaryKey(), title: text().notNull(), description: text().notNull().default(''),
  price_per_person: integer().notNull(), min_guests: integer().notNull().default(20),
  sort_order: integer().notNull().default(0), items: jsonb().$type<string[]>().notNull().default([]),
  title_bn: text().notNull().default(''), more_count: integer().notNull().default(0),
});
export const reservations = pgTable('reservations', {
  id: text().primaryKey(), name: text().notNull(), email: text().notNull().default(''),
  phone: text().notNull(), guests: integer().notNull(), seating: text().notNull(),
  date: text().notNull(), time: text().notNull(), special_requests: text().notNull().default(''),
  status: text().notNull().default('pending'), created_date: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
export const reviews = pgTable('reviews', {
  id: text().primaryKey(), user_id: text().notNull(), author_name: text().notNull(),
  rating: integer().notNull(), title: text().notNull(), body: text().notNull(),
  dish_name: text().notNull().default(''), photos: jsonb().$type<string[]>().notNull().default([]),
  is_approved: boolean().notNull().default(false), is_verified: boolean().notNull().default(false),
  source: text().notNull().default('website'), created_date: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
