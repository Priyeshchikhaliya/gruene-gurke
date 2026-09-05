import { createClient } from "@supabase/supabase-js";
import { supabasePublicConfig } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Lesezugriff auf öffentliche Inhalte – ohne Cookies, damit Seiten statisch
 * erzeugt werden können. Gibt null zurück, solange Supabase nicht eingerichtet ist.
 */
export function createPublicClient() {
  const config = supabasePublicConfig();
  if (!config) return null;
  return createClient<Database>(config.url, config.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
