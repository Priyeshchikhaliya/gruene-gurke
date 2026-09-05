"use server";

import {
  adminClient,
  bool,
  fail,
  ok,
  optionalText,
  reorder,
  revalidatePublic,
  text,
  type AdminState,
} from "./helpers";
import { routes } from "@/lib/routes";

const paths = [routes.jobs];

export async function saveJobPosting(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const title = text(formData, "title");
  if (!title) return fail("Bitte eine Stellenbezeichnung eingeben.");

  const values = {
    title,
    terms: optionalText(formData, "terms"),
    is_active: bool(formData, "is_active"),
  };

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("job_postings").update(values).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase.from("job_postings").select("*", { count: "exact", head: true });
      const { error } = await supabase.from("job_postings").insert({ ...values, sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Stelle", error);
    return fail("Das Speichern hat nicht geklappt. Bitte erneut versuchen.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Stelle gespeichert." : "Stelle hinzugefügt.");
}

export async function deleteJobPosting(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("job_postings").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Stelle löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Stelle gelöscht.");
}

export async function moveJobPosting(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const direction = text(formData, "direction") === "up" ? "up" : "down";

  try {
    const supabase = await adminClient();
    const { data, error } = await supabase.from("job_postings").select("id, sort_order").order("sort_order");
    if (error) throw error;
    const next = reorder(data ?? [], id, direction);
    if (!next) return ok("Unverändert.");
    for (const row of next) {
      const { error: updateError } = await supabase
        .from("job_postings")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id);
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error("[verwaltung] Stelle verschieben", error);
    return fail("Das Verschieben hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Reihenfolge geändert.");
}

export async function saveJobBenefit(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const label = text(formData, "label");
  if (!label) return fail("Bitte einen Text eingeben.");

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("job_benefits").update({ label }).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase.from("job_benefits").select("*", { count: "exact", head: true });
      const { error } = await supabase.from("job_benefits").insert({ label, sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Vorteil", error);
    return fail("Das Speichern hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Gespeichert." : "Hinzugefügt.");
}

export async function deleteJobBenefit(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("job_benefits").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Vorteil löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Gelöscht.");
}
