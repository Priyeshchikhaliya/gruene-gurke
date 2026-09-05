-- Grüne Gurke · initial schema
-- Apply via Supabase SQL editor or `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admins are explicit rows in admin_users. Any other authenticated user is a
-- normal visitor as far as RLS is concerned.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- reservations
-- ---------------------------------------------------------------------------
create type public.reservation_status as enum ('pending', 'confirmed', 'cancelled');

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 120),
  phone text not null check (char_length(phone) between 6 and 30),
  guests int not null check (guests between 1 and 50),
  reserved_date date not null,
  reserved_time time not null,
  message text check (char_length(message) <= 1000),
  locale text not null default 'de' check (locale in ('de', 'en')),
  status public.reservation_status not null default 'pending',
  internal_note text
);

create index if not exists reservations_date_idx on public.reservations (reserved_date, reserved_time);
create index if not exists reservations_status_idx on public.reservations (status);

create trigger reservations_set_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 120),
  message text not null check (char_length(message) between 10 and 2000),
  locale text not null default 'de' check (locale in ('de', 'en')),
  is_read boolean not null default false
);

create trigger contact_messages_set_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- menu
-- ---------------------------------------------------------------------------
create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  name_de text not null,
  name_en text not null,
  description_de text,
  description_en text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create trigger menu_categories_set_updated_at
  before update on public.menu_categories
  for each row execute function public.set_updated_at();

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  category_id uuid not null references public.menu_categories (id) on delete cascade,
  name_de text not null,
  name_en text not null,
  description_de text,
  description_en text,
  price_cents int not null check (price_cents >= 0),
  tags text[] not null default '{}',        -- e.g. vegan, vegetarian, spicy
  allergens text[] not null default '{}',   -- EU allergen codes A–N
  image_path text,                          -- path inside the `gallery` bucket
  sort_order int not null default 0,
  is_available boolean not null default true
);

create index if not exists menu_items_category_idx on public.menu_items (category_id, sort_order);

create trigger menu_items_set_updated_at
  before update on public.menu_items
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- opening hours (multiple rows per weekday allow split shifts)
-- ---------------------------------------------------------------------------
create table if not exists public.opening_hours (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  weekday int not null check (weekday between 0 and 6), -- 0 = Monday
  opens_at time,
  closes_at time,
  is_closed boolean not null default false,
  note_de text,
  note_en text,
  sort_order int not null default 0,
  check (is_closed or (opens_at is not null and closes_at is not null))
);

create index if not exists opening_hours_weekday_idx on public.opening_hours (weekday, sort_order);

create trigger opening_hours_set_updated_at
  before update on public.opening_hours
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- gallery
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  storage_path text not null unique,        -- path inside the `gallery` bucket
  alt_de text not null,
  alt_en text not null,
  width int,
  height int,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create trigger gallery_images_set_updated_at
  before update on public.gallery_images
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- site settings (key/value, e.g. announcement banner, holiday notice)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- row level security
-- ---------------------------------------------------------------------------
alter table public.admin_users      enable row level security;
alter table public.reservations     enable row level security;
alter table public.contact_messages enable row level security;
alter table public.menu_categories  enable row level security;
alter table public.menu_items       enable row level security;
alter table public.opening_hours    enable row level security;
alter table public.gallery_images   enable row level security;
alter table public.site_settings    enable row level security;

-- Visitors: read published content only. Writes to reservations and
-- contact_messages go through server actions using the service role, so no
-- anon insert policy is needed (keeps the anon key useless for spam).
create policy "public read menu categories" on public.menu_categories
  for select using (is_active);
create policy "public read menu items" on public.menu_items
  for select using (is_available);
create policy "public read opening hours" on public.opening_hours
  for select using (true);
create policy "public read gallery" on public.gallery_images
  for select using (is_active);
create policy "public read settings" on public.site_settings
  for select using (true);

-- Admins: full access everywhere.
create policy "admin all admin_users"      on public.admin_users      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all reservations"     on public.reservations     for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all contact_messages" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all menu_categories"  on public.menu_categories  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all menu_items"       on public.menu_items       for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all opening_hours"    on public.opening_hours    for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all gallery_images"   on public.gallery_images   for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all site_settings"    on public.site_settings    for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- storage: public-read bucket for photos, admin-only writes
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

create policy "gallery public read" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "gallery admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery' and public.is_admin());
create policy "gallery admin update" on storage.objects
  for update to authenticated using (bucket_id = 'gallery' and public.is_admin());
create policy "gallery admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery' and public.is_admin());

-- ---------------------------------------------------------------------------
-- seed: one row per weekday, placeholder hours (edit in admin later)
-- ---------------------------------------------------------------------------
insert into public.opening_hours (weekday, opens_at, closes_at, is_closed)
values
  (0, null, null, true),          -- Monday closed
  (1, '17:00', '23:00', false),
  (2, '17:00', '23:00', false),
  (3, '17:00', '23:00', false),
  (4, '17:00', '23:30', false),
  (5, '12:00', '23:30', false),
  (6, '12:00', '22:00', false);
