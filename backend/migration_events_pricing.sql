-- Run this if you ALREADY ran the old schema.sql once.
-- This safely upgrades your existing tables without losing data.

alter table events add column if not exists price numeric;
alter table gallery_images add column if not exists event_id uuid references events(id) on delete set null;
