"use server";

import {
  adminClient,
  bool,
  fail,
  ok,
  optionalText,
  priceToCents,
  reorder,
  revalidatePublic,
  text,
  type AdminState,
} from "./helpers";
import { routes } from "@/lib/routes";

const paths = [routes.menu];
const TAGS = ["veg", "fish", "chef"] as const;

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `kategorie-${Date.now()}`
  );
}

// --- Kategorien ------------------------------------------------------------

export async function saveMenuCategory(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const title = text(formData, "title");
  if (!title) return fail("Bitte einen Namen für die Kategorie eingeben.");

  const values = {
    title,
    intro: optionalText(formData, "intro"),
    note: optionalText(formData, "note"),
    is_active: bool(formData, "is_active"),
  };

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("menu_categories").update(values).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase.from("menu_categories").select("*", { count: "exact", head: true });
      const { error } = await supabase
        .from("menu_categories")
        .insert({ ...values, slug: slugify(title), sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Kategorie", error);
    return fail("Das Speichern hat nicht geklappt. Vielleicht gibt es die Kategorie schon.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Kategorie gespeichert." : "Kategorie hinzugefügt.");
}

export async function deleteMenuCategory(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("menu_categories").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Kategorie löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Kategorie mit allen Gerichten gelöscht.");
}

export async function moveMenuCategory(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const direction = text(formData, "direction") === "up" ? "up" : "down";
  try {
    const supabase = await adminClient();
    const { data, error } = await supabase.from("menu_categories").select("id, sort_order").order("sort_order");
    if (error) throw error;
    const next = reorder(data ?? [], id, direction);
    if (!next) return ok("Unverändert.");
    for (const row of next) {
      const { error: updateError } = await supabase
        .from("menu_categories")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id);
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error("[verwaltung] Kategorie verschieben", error);
    return fail("Das Verschieben hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Reihenfolge geändert.");
}

// --- Gerichte --------------------------------------------------------------

export async function saveMenuItem(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const categoryId = text(formData, "category_id");
  const name = text(formData, "name");
  const price = priceToCents(text(formData, "price"));

  if (!name) return fail("Bitte einen Namen für das Gericht eingeben.");
  if (price === null) return fail("Bitte einen gültigen Preis eingeben, zum Beispiel 18,90.");

  const extraLabel = optionalText(formData, "extra_label");
  const extraPriceRaw = text(formData, "extra_price");
  const extraPrice = extraPriceRaw ? priceToCents(extraPriceRaw) : null;
  if (extraLabel && extraPrice === null) return fail("Bitte einen gültigen Aufpreis eingeben.");

  const values = {
    name,
    description: optionalText(formData, "description"),
    price_cents: price,
    allergens: optionalText(formData, "allergens"),
    tags: TAGS.filter((tag) => formData.get(`tag:${tag}`) === "on"),
    extra_label: extraLabel,
    extra_price_cents: extraLabel ? extraPrice : null,
    is_available: bool(formData, "is_available"),
  };

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("menu_items").update(values).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId);
      const { error } = await supabase
        .from("menu_items")
        .insert({ ...values, category_id: categoryId, sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Gericht", error);
    return fail("Das Speichern hat nicht geklappt. Bitte erneut versuchen.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Gericht gespeichert." : "Gericht hinzugefügt.");
}

export async function deleteMenuItem(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("menu_items").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Gericht löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Gericht gelöscht.");
}

export async function moveMenuItem(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const categoryId = text(formData, "category_id");
  const direction = text(formData, "direction") === "up" ? "up" : "down";

  try {
    const supabase = await adminClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("id, sort_order")
      .eq("category_id", categoryId)
      .order("sort_order");
    if (error) throw error;
    const next = reorder(data ?? [], id, direction);
    if (!next) return ok("Unverändert.");
    for (const row of next) {
      const { error: updateError } = await supabase
        .from("menu_items")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id);
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error("[verwaltung] Gericht verschieben", error);
    return fail("Das Verschieben hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Reihenfolge geändert.");
}

// --- Preisvarianten --------------------------------------------------------

export async function saveMenuVariant(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const itemId = text(formData, "item_id");
  const label = text(formData, "label");
  const price = priceToCents(text(formData, "price"));

  if (!label) return fail("Bitte eine Bezeichnung eingeben, zum Beispiel „als Vorspeise“.");
  if (price === null) return fail("Bitte einen gültigen Preis eingeben.");

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("menu_item_variants").update({ label, price_cents: price }).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase
        .from("menu_item_variants")
        .select("*", { count: "exact", head: true })
        .eq("item_id", itemId);
      const { error } = await supabase
        .from("menu_item_variants")
        .insert({ item_id: itemId, label, price_cents: price, sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Preisvariante", error);
    return fail("Das Speichern hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Variante gespeichert." : "Variante hinzugefügt.");
}

export async function deleteMenuVariant(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("menu_item_variants").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Preisvariante löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Variante gelöscht.");
}

// --- Hinweise unter der Karte ---------------------------------------------

export async function saveMenuNote(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const value = text(formData, "text");
  if (!value) return fail("Bitte einen Hinweis eingeben.");

  try {
    const supabase = await adminClient();
    if (id) {
      const { error } = await supabase.from("menu_notes").update({ text: value }).eq("id", id);
      if (error) throw error;
    } else {
      const { count } = await supabase.from("menu_notes").select("*", { count: "exact", head: true });
      const { error } = await supabase.from("menu_notes").insert({ text: value, sort_order: count ?? 0 });
      if (error) throw error;
    }
  } catch (error) {
    console.error("[verwaltung] Hinweis", error);
    return fail("Das Speichern hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok(id ? "Hinweis gespeichert." : "Hinweis hinzugefügt.");
}

export async function deleteMenuNote(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("menu_notes").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Hinweis löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePublic(...paths);
  return ok("Hinweis gelöscht.");
}
