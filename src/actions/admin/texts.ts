"use server";

import { adminClient, fail, ok, revalidatePublic, text, type AdminState } from "./helpers";
import { routes } from "@/lib/routes";

/** Alle Textbausteine auf einmal speichern. */
export async function saveSettings(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const keys = formData.getAll("keys").map(String);
  if (!keys.length) return fail("Es gab nichts zu speichern.");

  try {
    const supabase = await adminClient();
    for (const key of keys) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: text(formData, `value:${key}`) })
        .eq("key", key);
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Texte", error);
    return fail("Das Speichern hat nicht geklappt. Bitte erneut versuchen.");
  }

  revalidatePublic(routes.menu, routes.jobs, routes.events, routes.gallery, routes.contact);
  return ok("Texte gespeichert.");
}
