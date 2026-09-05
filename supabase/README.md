# Supabase einrichten

Die Website läuft auch ohne Datenbank – dann zeigt sie die mitgelieferten
Inhalte aus `src/lib`. Sobald die Zugangsdaten in `.env.local` stehen, kommen
alle Inhalte aus Supabase und lassen sich unter `/admin` bearbeiten.

## 1. Projekt anlegen

1. Auf [supabase.com](https://supabase.com) ein neues Projekt erstellen
   (Region: **Frankfurt (eu-central-1)**, wegen DSGVO und Ladezeit).
2. Ein sicheres Datenbank-Passwort vergeben und notieren.

## 2. Schlüssel eintragen

**Project Settings → API** öffnen und die Werte nach `.env.local` kopieren:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret>
```

Der `service_role`-Schlüssel umgeht alle Sicherheitsregeln. Er gehört
ausschließlich in `.env.local` bzw. in die Vercel-Umgebungsvariablen und
niemals ins Repository.

## 3. Schema und Inhalte einspielen

Im Supabase-Dashboard unter **SQL Editor**, nacheinander:

1. `migrations/0001_init.sql` einfügen und **Run** – legt Tabellen, Regeln und
   den Bilder-Speicher an.
2. `seed.sql` einfügen und **Run** – übernimmt Speisekarte, Öffnungszeiten,
   Galerie, Jobs und Texte der bisherigen Website.

`seed.sql` leert die Inhaltstabellen vorher. Ein zweiter Lauf verwirft also
alles, was inzwischen im Verwaltungsbereich geändert wurde.

Alternativ mit der CLI:

```bash
npx supabase login
npx supabase link --project-ref <ref>
npx supabase db push
```

## 4. Zugang für die Verwaltung anlegen

1. **Authentication → Users → Add user**: E-Mail und Passwort vergeben,
   „Auto Confirm User“ anhaken.
2. Die angezeigte User-ID kopieren und im SQL Editor ausführen:

```sql
insert into public.admin_users (user_id, name)
values ('<user-id>', 'Bernd Roland');
```

Nur wer in `admin_users` steht, kommt in den Verwaltungsbereich. Ein bloßes
Konto reicht nicht.

Empfehlung: unter **Authentication → Providers → Email** die Selbstregistrierung
abschalten, damit sich niemand sonst ein Konto anlegen kann.

## 5. Anmelden

`http://localhost:3000/admin` aufrufen und mit der eben angelegten E-Mail-Adresse
anmelden.

## Typen nach Schemaänderungen erneuern

```bash
npx supabase gen types typescript --project-id <ref> --schema public \
  > src/lib/supabase/database.types.ts
```

## Startinhalte neu erzeugen

`seed.sql` wird aus den Dateien in `src/lib` erzeugt:

```bash
npm run seed:generate
```
