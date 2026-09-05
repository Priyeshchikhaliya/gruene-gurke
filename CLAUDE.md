@AGENTS.md

# Grüne Gurke — Projektkonventionen

Website der Gaststätte „Grüne Gurke“ in Wernigerode. Demo, aber auf Produktionsniveau gebaut.
**Die Seite ist einsprachig Deutsch.** Kein i18n, keine Sprachumschaltung, keine `/de`-Präfixe.

## Stack
Next.js 16 App Router + TypeScript, Tailwind v4, Supabase (DB/Auth/Storage), Resend (E-Mail),
Zod 4, `motion`. Deployment auf Vercel. Paketmanager: npm.

## Regeln
- **Inhalte nur aus echten Quellen.** Texte stammen von gruene-gurke.com bzw. aus
  `public/speisekarte.pdf`. Nichts dazuerfinden – im Zweifel weglassen und nachfragen.
- Deutsche Oberflächentexte stehen direkt in der Komponente. Datenartige Inhalte liegen in
  `src/lib/` (`menu.ts`, `gallery.ts`, `hours.ts`, `legal.ts`, `site.ts`).
- Pfade kommen aus `src/lib/routes.ts` (`routes`, `navLinks`); Links mit `next/link`.
- Server Actions in `src/actions/*` validieren mit Zod und geben fertige deutsche
  Fehlermeldungen zurück (`fieldErrors`, `formError`).
- Supabase-Clients: `lib/supabase/server.ts` in Server Components/Actions, `client.ts` in
  Client Components, `admin.ts` (Service Role) nur serverseitig, wo RLS umgangen werden muss.
- Secrets über `serverEnv()` in `src/lib/env.ts`; neue Variablen dort und in `.env.example`.
- Styling über die Tokens in `src/app/globals.css` (`forest-*`, `cream-*`, `sage-*`, `gold-*`,
  `font-display`, `font-sans`, `container-site`). Keine rohen Hex-Werte in Komponenten.
- Einblendungen mit `<FadeIn>` (CSS-Klasse `.reveal`), nie mit Inline-Styles einer
  Animationsbibliothek – sonst gibt es Hydration-Konflikte.
- Kein `backdrop-filter` auf Elementen, die etwas mit `position: fixed` enthalten. Der Filter
  macht sie zum Bezugsrahmen, und das Overlay wird nur so groß wie das Elternelement.
- Inhalte der Website immer über `src/lib/data/content.ts` lesen. Diese Funktionen fallen
  auf die Dateien in `src/lib` zurück, wenn Supabase fehlt – die Seite darf nie leer sein.
- Der Verwaltungsbereich liegt unter `src/app/admin/(geschuetzt)`, ist `force-dynamic` und
  prüft die Rechte mit `requireAdmin()`. Schreibende Aktionen liegen in `src/actions/admin/`
  und nutzen den an die Sitzung gebundenen Client, damit RLS greift.
- Nach jeder Änderung im Verwaltungsbereich `revalidatePublic()` aufrufen.
- Schemaänderungen als neue Datei `supabase/migrations/NNNN_*.sql` plus `database.types.ts`,
  danach `npm run seed:generate`.
- Barrierefreiheit ist Pflicht: Labels, `aria-invalid`, Fokuszustände, `prefers-reduced-motion`.
- Responsiv ab 320 px prüfen; kein horizontales Scrollen.

## Befehle
`npm run dev` · `npm run build` · `npm run lint`
