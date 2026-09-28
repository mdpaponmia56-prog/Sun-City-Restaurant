CREATE TABLE "dishes" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"price" integer NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"image_url" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_signature" boolean DEFAULT false NOT NULL,
	"details" jsonb DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "party_menus" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"price_per_person" integer NOT NULL,
	"min_guests" integer DEFAULT 20 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"items" jsonb DEFAULT '[]' NOT NULL,
	"title_bn" text DEFAULT '' NOT NULL,
	"more_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"phone" text NOT NULL,
	"guests" integer NOT NULL,
	"seating" text NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"special_requests" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"author_name" text NOT NULL,
	"rating" integer NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"dish_name" text DEFAULT '' NOT NULL,
	"photos" jsonb DEFAULT '[]' NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"source" text DEFAULT 'website' NOT NULL,
	"created_date" timestamp with time zone DEFAULT now() NOT NULL
);
