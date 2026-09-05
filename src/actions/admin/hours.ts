"use server";

import { adminClient, fail, ok, revalidatePublic, text, type AdminState } from "./helpers";
import { routes } from "@/lib/routes";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Öffnungszeiten einer Saison speichern. */
export async function saveOpeningSeason(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const fields = {
    label: text(formData, "label"),
    period: text(formData, "period"),
    restaurant_opens: text(formData, "restaurant_opens"),
    restaurant_closes: text(formData, "restaurant_closes"),
    takeaway_opens: text(formData, "takeaway_opens"),
    takeaway_closes: text(formData, "takeaway_closes"),
    kitchen_until: text(formData, "kitchen_until"),
  };

  if (!fields.label || !fields.period) return fail("Bitte Bezeichnung und Zeitraum ausfüllen.");

  for (const key of ["restaurant_opens", "restaurant_closes", "takeaway_opens", "takeaway_closes", "kitchen_until"] as const) {
    if (!TIME.test(fields[key])) return fail("Bitte alle Uhrzeiten im Format 11:00 angeben.");
  }

  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("opening_seasons").update(fields).eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Öffnungszeiten", error);
    return fail("Das Speichern hat nicht geklappt. Bitte erneut versuchen.");
  }

  revalidatePublic(routes.contact, routes.menu);
  return ok("Öffnungszeiten gespeichert.");
}
