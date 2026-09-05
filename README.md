# Grüne Gurke

Website der Gaststätte und des Vereinsheims „Grüne Gurke“ in Wernigerode.
Einsprachig Deutsch, mit vollständiger Speisekarte, Galerie, Jobs, Kontaktformular
und Tischreservierung.

## Stack

| Bereich          | Wahl                                             |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 16 (App Router, Server Actions), TypeScript |
| Styling          | Tailwind CSS v4, Design-Tokens in `globals.css`  |
| Animation        | CSS-Übergänge, keine Bibliothek                   |
| Datenbank & Auth | Supabase (Postgres + RLS, Auth, Storage)          |
| E-Mail           | Resend                                            |
| Validierung      | Zod 4                                             |
| Hosting          | Vercel                                            |

## Loslegen

```bash
npm install
cp .env.example .env.local   # Supabase- und Resend-Schlüssel eintragen
npm run dev
```

Danach das Datenbankschema einspielen – siehe [`supabase/README.md`](supabase/README.md).

## Skripte

| Skript          | Wirkung                              |
| --------------- | ------------------------------------ |
| `npm run dev`   | Entwicklungsserver auf Port 3000     |
| `npm run build` | Produktionsbuild                     |
| `npm run start` | Produktionsbuild ausliefern          |
| `npm run lint`  | ESLint                               |
| `npm run seed`  | Inhalte aus `src/lib` in die Datenbank schreiben |
| `npm run seed:generate` | `supabase/seed.sql` aus `src/lib` neu erzeugen |

## Seiten

| Pfad               | Inhalt                                             |
| ------------------ | -------------------------------------------------- |
| `/`                | Start: Hero, Angebot, Öffnungszeiten, Galerie, Jobs, Anfahrt |
| `/speisekarte`     | Vollständige Karte mit Preisen, Allergenen und PDF |
| `/feiern-catering` | Räume für Feiern und Partyservice                  |
| `/galerie`         | Bilder mit Lightbox                                |
| `/jobs`            | Offene Stellen                                     |
| `/kontakt`         | Kontaktdaten, Formular, Karte                      |
| `/reservierung`    | Tischanfrage                                       |
| `/impressum`, `/datenschutz` | Rechtstexte                              |
| `/admin`           | Verwaltungsbereich, nur mit Anmeldung              |

## Verwaltungsbereich

Unter `/admin` pflegt das Restaurant seine Inhalte selbst: Öffnungszeiten,
Speisekarte mit Preisen, Galerie, Jobs, wiederkehrende Texte sowie die
eingegangenen Reservierungen und Nachrichten. Die Anmeldung läuft über Supabase
Auth mit E-Mail und Passwort; freigeschaltet ist nur, wer in der Tabelle
`admin_users` steht. Einrichtung siehe [`supabase/README.md`](supabase/README.md).

Ohne Datenbank bleibt die Website vollständig sichtbar – sie greift dann auf die
mitgelieferten Inhalte in `src/lib` zurück.

## Projektstruktur

```
src/
  actions/        Server Actions (Reservierung, Kontakt)
  app/
    layout.tsx    Wurzel-Layout, Schriften, Metadaten
    (site)/       Öffentliche Seiten mit Header und Footer
    admin/        Verwaltungsbereich (folgt)
    sitemap.ts, robots.ts
  components/
    forms/        Kontakt- und Reservierungsformular
    gallery/      Galerie-Raster mit Lightbox
    layout/       Header, Footer, mobile Navigation
    legal/        Renderer für Impressum und Datenschutz
    menu/         Speisekarte
    seo/          JSON-LD
    ui/           Buttons, Felder, Abschnitte, Karte, Öffnungszeiten
  lib/
    data/         Inhalte lesen: content.ts (Website), admin.ts (Verwaltung)
    menu.ts       Speisekarte aus dem PDF, Preise in Cent
    gallery.ts    Bilder mit Alternativtexten
    hours.ts      Saisonale Öffnungszeiten
    legal.ts      Impressum und Datenschutzerklärung
    routes.ts     Alle Pfade und die Hauptnavigation
    site.ts       Adresse, Telefon, Social, Bilder
    env.ts        Geprüfte Server-Umgebung
    supabase/     Browser-, Server-, Public- und Service-Role-Client
    auth.ts       Anmeldung und Rechteprüfung für die Verwaltung
    email/        Resend-Vorlagen
  actions/admin/  Server Actions des Verwaltungsbereichs
supabase/
  migrations/     SQL-Schema mit RLS und Storage-Policies
  seed.sql        Startinhalte, erzeugt aus src/lib
```

## Datenfluss

- **Reservierung und Kontakt**: Formular → Server Action → Zod-Prüfung → Insert mit dem
  Service-Role-Client → Resend-Benachrichtigung. Der Anon-Key darf nicht schreiben, das
  öffentliche API taugt also nicht zum Spammen.
- **Antwort an den Gast**: Wird eine Reservierung im Verwaltungsbereich auf „Bestätigt“ oder
  „Abgesagt“ gestellt, geht automatisch eine E-Mail an den Gast. Das lässt sich pro Vorgang
  abwählen, und ein erneutes Speichern verschickt nichts doppelt.
- **Ohne Resend-Schlüssel** wird nichts versendet; die Anfragen landen trotzdem in der
  Datenbank und im Verwaltungsbereich.
- **Inhalte** (Karte, Zeiten, Galerie, Jobs, Texte) kommen aus Supabase. Schlägt eine
  Abfrage fehl oder fehlen die Zugangsdaten, greifen die Inhalte aus `src/lib`.
- **Öffentliche Seiten** sind statisch und werden alle zehn Minuten sowie nach jedem
  Speichern im Verwaltungsbereich neu erzeugt.

## Offene Punkte

- Bilder in besserer Auflösung vom Betreiber; aktuell die Dateien der bisherigen Website.
- Die Datenschutzerklärung stammt von der alten Seite und muss vor dem Livegang an den
  neuen Stack angepasst werden (Vercel, Supabase, Resend, selbst gehostete Schriften).
