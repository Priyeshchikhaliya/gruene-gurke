# Supabase einrichten

Die Website läuft auch ohne Datenbank – dann zeigt sie die mitgelieferten
Inhalte aus `src/lib`. Sobald die Zugangsdaten in `.env.local` stehen, kommen
alle Inhalte aus Supabase und lassen sich unter `/admin` bearbeiten.

## 1. Projekt anlegen

1. Auf [supabase.com](https://supabase.com) ein neues Projekt erstellen
   (Region: **Frankfurt (eu-central-1)**, wegen DSGVO und Ladezeit).
2. Ein sicheres Datenbank-Passwort vergeben und notieren.

## 2. Schlüssel eintragen

**Project Settings → API** öffnen und die Werte nach `.env.local` kopieren.
Wichtig: Bei `NEXT_PUBLIC_SUPABASE_URL` gehört die **Project URL** hinein, also
`https://<ref>.supabase.co` – nicht die daneben angezeigte REST-Adresse mit
`/rest/v1/` am Ende. Mit dem Zusatz schlagen alle Abfragen fehl.

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret>
```

Der `service_role`-Schlüssel umgeht alle Sicherheitsregeln. Er gehört
ausschließlich in `.env.local` bzw. in die Vercel-Umgebungsvariablen und
niemals ins Repository.

## 3. Schema und Inhalte einspielen

1. Im Supabase-Dashboard unter **SQL Editor** die Datei
   `migrations/0001_init.sql` einfügen und **Run** – legt Tabellen, Regeln und
   den Bilder-Speicher an.
2. Die Inhalte der bisherigen Website übernehmen:

```bash
npm run seed
```

Das Skript schreibt über die API und meldet, was angelegt wurde. Wer lieber im
SQL Editor arbeitet, kann stattdessen `seed.sql` einfügen und ausführen.

Beides leert die Inhaltstabellen vorher. Ein zweiter Lauf verwirft also alles,
was inzwischen im Verwaltungsbereich geändert wurde. Reservierungen und
Nachrichten bleiben unangetastet.

## 4. Zugang für die Verwaltung anlegen

```bash
node scripts/create-admin.mjs info@gruene-gurke.com "Grüne Gurke"
```

Das Skript legt das Konto an, schaltet es in `admin_users` frei und gibt einen
einmaligen Link aus, über den man sein eigenes Passwort setzt. Das Passwort
taucht dabei nirgends im Klartext auf. Der Link gilt eine Stunde.

Nur wer in `admin_users` steht, kommt in den Verwaltungsbereich. Ein bloßes
Konto reicht nicht.

Weitere Zugänge legt man mit demselben Befehl und einer anderen E-Mail-Adresse
an. Einen Zugang entzieht man, indem man die Zeile aus `admin_users` löscht.

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
