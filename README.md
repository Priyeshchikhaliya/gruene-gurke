# Grüne Gurke

Premium restaurant website: bilingual (DE/EN), table reservations, contact form,
and an admin area for menu, opening hours and gallery.

## Stack

| Concern         | Choice                                              |
| --------------- | --------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Server Actions), TypeScript |
| Styling         | Tailwind CSS v4, design tokens in `globals.css`     |
| Motion          | `motion` (Framer Motion)                            |
| i18n            | `next-intl`, routes under `/de` and `/en`           |
| Database & auth | Supabase (Postgres + RLS, Auth, Storage)            |
| Email           | Resend                                              |
| Validation      | Zod 4                                               |
| Hosting         | Vercel                                              |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Resend keys
npm run dev
```

Then apply the database schema — see [`supabase/README.md`](supabase/README.md).

## Scripts

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server at http://localhost:3000 |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

## Project layout

```
src/
  actions/        Server Actions (reservations, contact)
  app/
    [locale]/     Root layout, locale-aware routes
      (site)/     Public pages with header + footer
      admin/      Admin area (Supabase Auth, coming next)
    sitemap.ts, robots.ts
  components/
    forms/        Reservation + contact forms
    layout/       Header, footer, nav, locale switcher
    ui/           Buttons, fields, sections, motion helpers
  i18n/           next-intl routing + request config
  lib/
    supabase/     Browser, server and admin (service-role) clients + DB types
    email/        Resend templates
    env.ts        Lazy, validated server env
    site.ts       Static site facts (address, phone, socials)
  messages/       de.json / en.json — every user-facing string lives here
  proxy.ts        Locale detection (Next 16 "proxy", formerly middleware)
supabase/
  migrations/     SQL schema with RLS and storage policies
```

## How data flows

- **Reservations / contact**: client form → Server Action → Zod validation →
  insert with the service-role client → Resend notification + guest
  acknowledgement. The anon key has no insert rights, so the public API cannot be
  used for spam.
- **Content** (menu, hours, gallery): public read via RLS; admin writes gated by
  `admin_users`.
- **Photos**: Supabase Storage bucket `gallery` (public read), served through
  `next/image` for AVIF/WebP and responsive sizes.
