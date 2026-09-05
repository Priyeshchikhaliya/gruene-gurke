import "server-only";

const PLACEHOLDER = /YOUR-PROJECT|example\.com|^$/;

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || PLACEHOLDER.test(trimmed)) return undefined;
  return trimmed;
}

/**
 * Supabase ist optional: Solange keine Zugangsdaten hinterlegt sind, läuft die
 * Website mit den mitgelieferten Inhalten aus `src/lib`. Sobald die Schlüssel
 * in `.env.local` stehen, kommen die Inhalte aus der Datenbank.
 */
export function supabasePublicConfig() {
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function supabaseServiceConfig() {
  const base = supabasePublicConfig();
  const serviceKey = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!base || !serviceKey) return null;
  return { ...base, serviceKey };
}

export function isSupabaseConfigured() {
  return supabasePublicConfig() !== null;
}

/** Wirft mit klarer Meldung – für Stellen, die ohne Datenbank nicht arbeiten können. */
export function requireSupabaseService() {
  const config = supabaseServiceConfig();
  if (!config) {
    throw new Error(
      "Supabase ist nicht eingerichtet. Bitte NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY und SUPABASE_SERVICE_ROLE_KEY in .env.local eintragen.",
    );
  }
  return config;
}

export function resendConfig() {
  const apiKey = clean(process.env.RESEND_API_KEY);
  const from = clean(process.env.RESEND_FROM_EMAIL) ?? "Grüne Gurke <onboarding@resend.dev>";
  const inbox = clean(process.env.RESTAURANT_INBOX_EMAIL);
  if (!apiKey || !inbox) return null;
  return { apiKey, from, inbox };
}
