/**
 * Legt einen Zugang für den Verwaltungsbereich an.
 * Aufruf: node scripts/create-admin.mjs <e-mail> "<Name>"
 *
 * Das Passwort wird nie angezeigt oder gespeichert: Das Skript erzeugt ein
 * zufälliges Startpasswort und gibt einen einmaligen Link aus, über den man
 * sein eigenes Passwort setzt.
 */
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const [email, name] = process.argv.slice(2);

if (!email || !email.includes("@")) {
  console.error('Aufruf: node scripts/create-admin.mjs <e-mail> "<Name>"');
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((line) => line.includes("=") && !line.trim().startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const siteUrl = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Vorhandenen Zugang wiederverwenden, statt einen zweiten anzulegen.
const { data: list, error: listError } = await db.auth.admin.listUsers();
if (listError) {
  console.error("Konnte die Nutzerliste nicht laden:", listError.message);
  process.exit(1);
}

let user = list.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());

if (user) {
  console.log(`Zugang für ${email} besteht bereits.`);
} else {
  const { data, error } = await db.auth.admin.createUser({
    email,
    password: randomBytes(24).toString("base64url"),
    email_confirm: true,
  });
  if (error) {
    console.error("Zugang konnte nicht angelegt werden:", error.message);
    process.exit(1);
  }
  user = data.user;
  console.log(`Zugang für ${email} angelegt.`);
}

const { error: adminError } = await db
  .from("admin_users")
  .upsert({ user_id: user.id, name: name ?? null }, { onConflict: "user_id" });

if (adminError) {
  console.error("Freischaltung fehlgeschlagen:", adminError.message);
  process.exit(1);
}
console.log("In der Tabelle admin_users freigeschaltet.");

const { data: link, error: linkError } = await db.auth.admin.generateLink({
  type: "recovery",
  email,
  options: { redirectTo: `${siteUrl}/admin/passwort` },
});

if (linkError) {
  console.error("Link konnte nicht erzeugt werden:", linkError.message);
  console.error("Passwort ersatzweise im Supabase-Dashboard setzen: Authentication -> Users.");
  process.exit(1);
}

console.log("\nEinmaliger Link zum Setzen des Passworts:\n");
console.log(link.properties.action_link);
console.log("\nDer Link gilt nur einmal und läuft nach einer Stunde ab.");
