@AGENTS.md

# Grüne Gurke — project conventions

Restaurant website (demo, but built to production standard). Bilingual DE/EN.

## Stack
Next.js 16 App Router + TypeScript, Tailwind v4, next-intl, Supabase (DB/Auth/Storage),
Resend (email), Zod 4, `motion` for animation. Deployed on Vercel. Package manager: npm.

## Rules
- Every user-facing string goes in `src/messages/{de,en}.json`; never hardcode copy in components.
  Keep both files in sync (same keys).
- Links use `Link` from `@/i18n/navigation`, not `next/link`, so locale prefixes stay correct.
- Server Actions live in `src/actions/*` and validate with Zod. Return translation *keys*
  (`fieldErrors`, `formError`); the client translates them.
- Supabase clients: `lib/supabase/server.ts` in Server Components/Actions, `client.ts` in
  Client Components, `admin.ts` (service role) only in server code that must bypass RLS.
- Secrets are read through `serverEnv()` in `src/lib/env.ts`; add new vars there and in `.env.example`.
- Styling: use the tokens in `src/app/globals.css` (`forest-*`, `cream-*`, `sage-*`, `gold-*`,
  `font-display`, `font-sans`, `container-site`). No arbitrary hex values in components.
- Schema changes go in a new `supabase/migrations/NNNN_*.sql` and update `database.types.ts`.
- Accessibility is not optional: labels, `aria-invalid`, focus states, reduced-motion respected.

## Commands
`npm run dev` · `npm run build` · `npm run lint`
