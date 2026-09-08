-- Run this in Supabase SQL Editor (adds video support to gallery images)

alter table gallery_images add column if not exists media_type text not null default 'photo';
-- media_type will be 'photo' or 'video'

-- The `services` table is now the single source of truth for "shoot types"
-- (Wedding, Pre-Wedding, Event, Portrait, Product, Food, etc.) — both their
-- names AND prices are edited live from the admin panel, no code changes needed.
-- Add as many rows as you like, e.g.:
-- insert into services (name, description, base_price, sort_order) values ('Food Photography', 'Restaurant/product food shoots.', 5000, 5);
