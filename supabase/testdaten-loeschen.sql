-- Testdaten entfernen, Inhalte behalten
--
-- Vor der Übergabe an den Betreiber ausführen: Supabase-Dashboard ->
-- SQL Editor -> einfügen -> Run.
--
-- Gelöscht werden nur die Anfragen aus den Formularen. Speisekarte,
-- Öffnungszeiten, Galerie, Jobs, Texte und die Zugänge zur Verwaltung
-- bleiben unangetastet.

begin;

delete from public.reservations;
delete from public.contact_messages;

commit;

-- Zur Kontrolle: beide Zeilen müssen 0 zeigen.
select 'Reservierungen' as tabelle, count(*) from public.reservations
union all
select 'Nachrichten', count(*) from public.contact_messages;
