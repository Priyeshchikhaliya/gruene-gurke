import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublicConfig } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * An die Request-Cookies gebundener Client für den Verwaltungsbereich.
 * Nutzt den Anon-Key plus die Sitzung des Nutzers, es gilt also RLS.
 */
export async function createClient() {
  const config = supabasePublicConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // In Server Components sind Cookies schreibgeschützt. Die Sitzung
          // wird im Proxy aufgefrischt, daher ist das hier unkritisch.
        }
      },
    },
  });
}
