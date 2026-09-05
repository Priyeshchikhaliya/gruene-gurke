-- Grüne Gurke · Datenbankschema
-- Einspielen: Supabase Dashboard → SQL Editor → einfügen → Run
-- Danach supabase/seed.sql ausführen, um die Inhalte der Website zu übernehmen.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Hilfsfunktionen
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Wer hier eine Zeile hat, darf alles verwalten. Alle anderen angemeldeten
-- Nutzer sind für die RLS ganz normale Besucher.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text,
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
-- Öffnungszeiten (Sommer / Winter, wie auf der bisherigen Website)
-- ---------------------------------------------------------------------------
create table if not exists public.opening_seasons (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  label text not null,                       -- "Sommer"
  period text not null,                      -- "1. Mai – 31. Oktober"
  start_month int not null check (start_month between 1 and 12),
  end_month int not null check (end_month between 1 and 12),
  restaurant_opens text not null,            -- "11:00"
  restaurant_closes text not null,
  takeaway_opens text not null,
  takeaway_closes text not null,
  kitchen_until text not null,
  sort_order int not null default 0
);

create trigger opening_seasons_set_updated_at
  before update on public.opening_seasons
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Speisekarte
-- ---------------------------------------------------------------------------
create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  intro text,
  note text,
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
  name text not null,
  description text,
  price_cents int not null check (price_cents >= 0),
  allergens text,                            -- "A.C.G" wie gedruckt
  tags text[] not null default '{}',         -- veg | fish | chef
  extra_label text,
  extra_price_cents int check (extra_price_cents >= 0),
  sort_order int not null default 0,
  is_available boolean not null default true
);

create index if not exists menu_items_category_idx on public.menu_items (category_id, sort_order);

create trigger menu_items_set_updated_at
  before update on public.menu_items
  for each row execute function public.set_updated_at();

-- Preisvarianten, z. B. "als Vorspeise" / "als kleines Hauptgericht"
create table if not exists public.menu_item_variants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  item_id uuid not null references public.menu_items (id) on delete cascade,
  label text not null,
  price_cents int not null check (price_cents >= 0),
  sort_order int not null default 0
);

create index if not exists menu_item_variants_item_idx on public.menu_item_variants (item_id, sort_order);

-- Zusatzstoffe und Allergene (Legende unter der Karte)
create table if not exists public.allergens (
  code text primary key,
  label text not null,
  sort_order int not null default 0
);

-- Hinweise unter der Karte ("Das sei noch angemerkt")
create table if not exists public.menu_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  text text not null,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Galerie
-- ---------------------------------------------------------------------------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Entweder ein Pfad aus /public (Bestand) oder eine öffentliche Storage-URL.
  url text not null,
  alt text not null,
  category text not null check (category in ('restaurant', 'catering')),
  width int,
  height int,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create index if not exists gallery_images_category_idx on public.gallery_images (category, sort_order);

create trigger gallery_images_set_updated_at
  before update on public.gallery_images
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Jobs
-- ---------------------------------------------------------------------------
create table if not exists public.job_postings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,                       -- "Koch (w/m/d)"
  terms text,                                -- "ab sofort in Vollzeit / Teilzeit / Pauschal"
  sort_order int not null default 0,
  is_active boolean not null default true
);

create trigger job_postings_set_updated_at
  before update on public.job_postings
  for each row execute function public.set_updated_at();

create table if not exists public.job_benefits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  label text not null,                       -- "5-Tage-Woche"
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Einstellungen (kurze Texte, die überall auftauchen)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  label text not null,                       -- Beschriftung im Verwaltungsbereich
  hint text,                                 -- Erklärung, wo der Text erscheint
  multiline boolean not null default false,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Reservierungen und Nachrichten
-- ---------------------------------------------------------------------------
create type public.reservation_status as enum ('offen', 'bestaetigt', 'abgesagt');

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
  status public.reservation_status not null default 'offen',
  internal_note text
);

create index if not exists reservations_date_idx on public.reservations (reserved_date, reserved_time);
create index if not exists reservations_status_idx on public.reservations (status);

create trigger reservations_set_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 120),
  phone text check (char_length(phone) <= 30),
  message text not null check (char_length(message) between 10 and 2000),
  is_read boolean not null default false
);

create index if not exists contact_messages_read_idx on public.contact_messages (is_read, created_at desc);

create trigger contact_messages_set_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.admin_users        enable row level security;
alter table public.opening_seasons    enable row level security;
alter table public.menu_categories    enable row level security;
alter table public.menu_items         enable row level security;
alter table public.menu_item_variants enable row level security;
alter table public.allergens          enable row level security;
alter table public.menu_notes         enable row level security;
alter table public.gallery_images     enable row level security;
alter table public.job_postings       enable row level security;
alter table public.job_benefits       enable row level security;
alter table public.site_settings      enable row level security;
alter table public.reservations       enable row level security;
alter table public.contact_messages   enable row level security;

-- Besucher: nur lesen, und nur veröffentlichte Inhalte.
create policy "oeffentlich lesen: oeffnungszeiten" on public.opening_seasons    for select using (true);
create policy "oeffentlich lesen: kategorien"      on public.menu_categories    for select using (is_active);
create policy "oeffentlich lesen: gerichte"        on public.menu_items         for select using (is_available);
create policy "oeffentlich lesen: varianten"       on public.menu_item_variants for select using (true);
create policy "oeffentlich lesen: allergene"       on public.allergens          for select using (true);
create policy "oeffentlich lesen: hinweise"        on public.menu_notes         for select using (true);
create policy "oeffentlich lesen: galerie"         on public.gallery_images     for select using (is_active);
create policy "oeffentlich lesen: stellen"         on public.job_postings       for select using (is_active);
create policy "oeffentlich lesen: vorteile"        on public.job_benefits       for select using (true);
create policy "oeffentlich lesen: einstellungen"   on public.site_settings      for select using (true);

-- Reservierungen und Nachrichten sind nicht öffentlich lesbar. Geschrieben
-- wird ausschließlich serverseitig mit dem Service-Role-Schlüssel, deshalb
-- gibt es hier bewusst keine Insert-Policy für Besucher.

-- Verwaltung: darf alles.
create policy "verwaltung: admins"           on public.admin_users        for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: oeffnungszeiten"  on public.opening_seasons    for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: kategorien"       on public.menu_categories    for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: gerichte"         on public.menu_items         for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: varianten"        on public.menu_item_variants for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: allergene"        on public.allergens          for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: hinweise"         on public.menu_notes         for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: galerie"          on public.gallery_images     for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: stellen"          on public.job_postings       for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: vorteile"         on public.job_benefits       for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: einstellungen"    on public.site_settings      for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: reservierungen"   on public.reservations       for all using (public.is_admin()) with check (public.is_admin());
create policy "verwaltung: nachrichten"      on public.contact_messages   for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: öffentlicher Bucket für Bilder, schreiben nur die Verwaltung
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('galerie', 'galerie', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

create policy "galerie oeffentlich lesen" on storage.objects
  for select using (bucket_id = 'galerie');
create policy "galerie verwaltung anlegen" on storage.objects
  for insert to authenticated with check (bucket_id = 'galerie' and public.is_admin());
create policy "galerie verwaltung aendern" on storage.objects
  for update to authenticated using (bucket_id = 'galerie' and public.is_admin());
create policy "galerie verwaltung loeschen" on storage.objects
  for delete to authenticated using (bucket_id = 'galerie' and public.is_admin());
