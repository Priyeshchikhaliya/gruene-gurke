# Grüne Gurke

Website der Gaststätte und des Vereinsheims „Grüne Gurke“ in Wernigerode.
Einsprachig Deutsch, mit vollständiger Speisekarte, Galerie, Jobs, Kontaktformular
und Tischreservierung.

## Stack

| Bereich          | Wahl                                             |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 16 (App Router, Server Actions), TypeScript |
| Styling          | Tailwind CSS v4, Design-Tokens in `globals.css`  |
| Animation        | `motion` plus CSS-Reveal                          |
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
| `/admin`           | Platzhalter für den Verwaltungsbereich             |

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
    menu.ts       Speisekarte aus dem PDF, Preise in Cent
    gallery.ts    Bilder mit Alternativtexten
    hours.ts      Saisonale Öffnungszeiten
    legal.ts      Impressum und Datenschutzerklärung
    routes.ts     Alle Pfade und die Hauptnavigation
    site.ts       Adresse, Telefon, Social, Bilder
    env.ts        Geprüfte Server-Umgebung
    supabase/     Browser-, Server- und Service-Role-Client
    email/        Resend-Vorlagen
supabase/
  migrations/     SQL-Schema mit RLS und Storage-Policies
```

## Datenfluss

- **Reservierung und Kontakt**: Formular → Server Action → Zod-Prüfung → Insert mit dem
  Service-Role-Client → Resend-Benachrichtigung. Der Anon-Key darf nicht schreiben, das
  öffentliche API taugt also nicht zum Spammen.
- **Inhalte** (Karte, Zeiten, Galerie) liegen derzeit in `src/lib/` und ziehen später in
  Supabase um, sobald der Verwaltungsbereich steht.

## Offene Punkte

- Verwaltungsbereich mit Supabase Auth.
- Bilder in besserer Auflösung vom Betreiber; aktuell die Dateien der bisherigen Website.
- Die Datenschutzerklärung stammt von der alten Seite und muss vor dem Livegang an den
  neuen Stack angepasst werden (Vercel, Supabase, Resend, selbst gehostete Schriften).
