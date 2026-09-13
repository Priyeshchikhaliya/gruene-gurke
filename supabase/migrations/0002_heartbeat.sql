-- Grüne Gurke · Keep-alive für das kostenlose Supabase-Projekt
--
-- Supabase pausiert kostenlose Projekte nach etwa sieben Tagen ohne
-- Aktivität. Vercel Cron ruft einmal täglich /api/cron/keepalive auf, und der
-- Endpunkt schreibt eine Zeile in diese Tabelle.
--
-- Einspielen: Supabase-Dashboard -> SQL Editor -> einfügen -> Run.
-- Das Skript lässt sich gefahrlos mehrfach ausführen.

create table if not exists public.heartbeat (
  id smallint primary key default 1 check (id = 1),
  beat_at timestamptz not null default now(),
  source text
);

insert into public.heartbeat (id) values (1) on conflict (id) do nothing;

-- Nur der Service-Role-Schlüssel darf hier lesen und schreiben.
alter table public.heartbeat enable row level security;
revoke all on public.heartbeat from anon, authenticated;
