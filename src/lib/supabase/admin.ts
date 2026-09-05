import "server-only";

import { createClient } from "@supabase/supabase-js";
import { requireSupabaseService } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Service-Role-Client. Umgeht RLS – ausschließlich in Server Actions und Route
 * Handlern verwenden, niemals in einer Komponente.
 */
export function createAdminClient() {
  const { url, serviceKey } = requireSupabaseService();
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
