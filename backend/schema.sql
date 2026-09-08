-- Run this in Supabase SQL Editor to set up all tables
-- NOTE: This version does NOT use Supabase Storage — images are stored as
-- external links (e.g. from Google Drive, Imgur, Cloudinary free tier, etc.)
-- so there is no storage bucket usage at all.

create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  address text,
  created_at timestamp with time zone default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  shoot_type text not null,
  event_date date not null,
  package text default 'Standard',
  distance_km numeric,
  estimate numeric,
  status text default 'Pending',
  created_at timestamp with time zone default now()
);

-- Events: each event can have its own price and many related images
create table events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  date date,
  price numeric,
  cover_image text,
  description text,
  created_at timestamp with time zone default now()
);

-- Gallery images: each image can optionally belong to an event (event_id).
-- If event_id is null, it's just a standalone portfolio image under a category.
create table gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text not null,
  event_id uuid references events(id) on delete set null,
  uploaded_at timestamp with time zone default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  base_price numeric not null,
  sort_order int default 0,
  created_at timestamp with time zone default now()
);

-- Seed starter services (edit freely from the admin panel afterward)
insert into services (name, description, base_price, sort_order) values
  ('Wedding Photography', 'Full day wedding coverage with edited highlights.', 25000, 1),
  ('Pre-Wedding Shoot', 'Outdoor/studio pre-wedding photo session.', 8000, 2),
  ('Event Coverage', 'Coverage for engagements, receptions, and parties.', 12000, 3),
  ('Portrait Session', 'Individual or family portrait session.', 4000, 4);
