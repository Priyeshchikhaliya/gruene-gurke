"use server";

import { adminClient, fail, ok, reorder, revalidatePublic, text, type AdminState } from "./helpers";
import { routes } from "@/lib/routes";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const TIME_FIELDS = [
  "restaurant_opens",
  "restaurant_closes",
  "takeaway_opens",
  "takeaway_closes",
  "kitchen_until",
] as const;

const paths = [routes.contact, routes.menu];

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `zeitraum-${Date.now()}`
  );
}

function readMonth(formData: FormData, key: string) {
  const value = Number.parseInt(text(formData, key), 10);
  return Number.isInteger(value) && value >= 1 && value <= 12 ? value : null;
}

/** Öffnungszeiten anlegen oder ändern. Ohne id wird ein neuer Zeitraum erstellt. */
export async function saveOpeningSeason(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const label = text(formData, "label");
  const period = text(formData, "period");
  const startMonth = readMonth(formData, "start_month");
  const endMonth = readMonth(formData, "end_month");

  if (!label) return fail("Bitte eine Bezeichnung eingeben, zum Beispiel Sommer.");
  if (!period) return fail("Bitte den Zeitraum eingeben, zum Beispiel 1. Mai – 31. Oktober.");
  if (startMonth === null || endMonth === null) return fail("Bitte Anfangs- und Endmonat wählen.");

  const times = {} as Record<(typeof TIME_FIELDS)[number], string>;
  for (const field of TIME_FIELDS) {
    const value = text(formData, field);
    if (!TIME.test(value)) return fail("Bitte alle Uhrzeiten im Format 11:00 angeben.");
    times[field] = value;
  }

  const values = {
    label,
    period,
    start_month: startMonth,
    end_month: endMonth,
    restaurant_opens: times.restaurant_opens,
    restaurant_closes: times.restaurant_closes,
    takeaway_opens: times.takeaway_opens,
    takeaway_closes: times.takeaway_closes,
    kitchen_until: times.kitchen_until,
  };

  try {
    const supabase = await adminClient();

    if (id) {
      const { error } = await supabase.from("opening_seasons").update(values).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase.from("opening_seasons").select("*", { count: "exact", head: true });
      const { error } = await supabase
        .from("opening_seasons")
        .insert({ ...values, slug: slugify(label), sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Öffnungszeiten", error);
    return fail("Das Speichern hat nicht geklappt. Vielleicht gibt es die Bezeichnung schon.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Öffnungszeiten gespeichert." : "Zeitraum hinzugefügt.");
}

export async function deleteOpeningSeason(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");

  try {
    const supabase = await adminClient();

    // Ohne einen einzigen Zeitraum zeigt die Website wieder die mitgelieferten
    // Zeiten an. Das wäre verwirrend, deshalb muss einer übrig bleiben.
    const { count } = await supabase.from("opening_seasons").select("*", { count: "exact", head: true });
    if ((count ?? 0) <= 1) {
      return fail("Es muss mindestens ein Zeitraum bestehen bleiben. Ändern Sie ihn lieber, statt ihn zu löschen.");
    }

    const { error } = await supabase.from("opening_seasons").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Öffnungszeiten löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Zeitraum gelöscht.");
}

export async function moveOpeningSeason(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const direction = text(formData, "direction") === "up" ? "up" : "down";

  try {
    const supabase = await adminClient();
    const { data, error } = await supabase.from("opening_seasons").select("id, sort_order").order("sort_order");
    if (error) throw error;

    const next = reorder(data ?? [], id, direction);
    if (!next) return ok("Unverändert.");

    for (const row of next) {
      const { error: updateError } = await supabase
        .from("opening_seasons")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id);
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error("[verwaltung] Öffnungszeiten verschieben", error);
    return fail("Das Verschieben hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Reihenfolge geändert.");
}
