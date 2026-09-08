-- Run this in Supabase SQL Editor

-- 1. Event types (Birthday, Engagement, Half Saree, Wedding, etc.) — manage from Admin
create table event_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text default '📷',
  sort_order int default 0
);

-- 2. Link existing services to a specific event type (services shown depend on selected event type)
alter table services add column if not exists event_type_id uuid references event_types(id) on delete cascade;

-- 3. Physical album options (single-select)
create table albums (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric default 0,
  sort_order int default 0
);

-- 4. Deliverables (multi-select, can be free)
create table deliverables (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric default 0,
  is_free boolean default false,
  sort_order int default 0
);

-- 5. Extend bookings to store the full quote breakdown
alter table bookings add column if not exists event_type text;
alter table bookings add column if not exists location text;
alter table bookings add column if not exists services_selected jsonb;
alter table bookings add column if not exists album_selected text;
alter table bookings add column if not exists deliverables_selected jsonb;
alter table bookings add column if not exists notes text;
alter table bookings add column if not exists total_estimate numeric;

-- ---------- Seed data (edit/add more anytime from the admin panel) ----------

with et as (
  insert into event_types (name, icon, sort_order) values
    ('Birthday', '🎂', 1),
    ('Engagement', '💍', 2),
    ('Half Saree', '🥻', 3),
    ('Wedding', '❤️', 4)
  returning id, name
)
insert into services (name, base_price, sort_order, event_type_id)
select v.name, v.price, v.sort_order, et.id
from et
join (values
  ('Engagement', 'Traditional Photography', 15000, 1),
  ('Engagement', 'Traditional Videography', 15000, 2),
  ('Engagement', 'Drone', 8000, 3),
  ('Engagement', 'Candid Photography', 18000, 4),
  ('Engagement', 'Candid Videography', 18000, 5),
  ('Engagement', 'Live Streaming', 10000, 6),
  ('Engagement', 'No Need', 0, 7),
  ('Wedding', 'Traditional Photography', 25000, 1),
  ('Wedding', 'Traditional Videography', 25000, 2),
  ('Wedding', 'Drone', 10000, 3),
  ('Wedding', 'Candid Photography', 30000, 4),
  ('Wedding', 'Candid Videography', 30000, 5),
  ('Wedding', 'Live Streaming', 12000, 6),
  ('Wedding', 'No Need', 0, 7)
) as v(event_name, name, price, sort_order) on v.event_name = et.name;

insert into albums (name, price, sort_order) values
  ('No Album', 0, 1),
  ('Candid Album (30 sheet)', 12000, 2),
  ('Wedding Album (50 sheet)', 20000, 3),
  ('Pre/Post Wedding Album (30 sheet)', 15000, 4),
  ('Engagement/Half Saree Album (20 sheet)', 10000, 5),
  ('Outdoor Engagement/Half Saree Album (20 sheet)', 12000, 6);

insert into deliverables (name, price, is_free, sort_order) values
  ('Full Raw Photos', 0, true, 1),
  ('Highlight Video', 8000, false, 2),
  ('Full Length Video', 15000, false, 3),
  ('Reels/Short Videos', 5000, false, 4);
