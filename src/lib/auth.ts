import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = { id: string; email: string; name: string | null };

/**
 * Angemeldeter Verwalter oder null. Es genügt nicht, angemeldet zu sein –
 * es braucht zusätzlich eine Zeile in `admin_users`.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id, name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) return null;
  return { id: user.id, email: user.email ?? "", name: admin.name };
}

/** Für geschützte Seiten und Aktionen: leitet zur Anmeldung, wenn nötig. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/anmelden");
  return user;
}
