"use server";

import { adminClient, fail, ok, reorder, revalidatePublic, text, type AdminState } from "./helpers";
import { imageSize } from "@/lib/image-size";
import { routes } from "@/lib/routes";

const paths = [routes.gallery, routes.events];
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 10 * 1024 * 1024;

function safeName(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${Date.now()}-${cleaned || "bild.jpg"}`;
}

/** Neues Bild hochladen und in der Galerie anlegen. */
export async function uploadGalleryImage(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const file = formData.get("file");
  const alt = text(formData, "alt");
  const category = text(formData, "category");

  if (!(file instanceof File) || file.size === 0) return fail("Bitte ein Bild auswählen.");
  if (!ALLOWED.includes(file.type)) return fail("Bitte ein Bild im Format JPG, PNG, WebP oder AVIF wählen.");
  if (file.size > MAX_BYTES) return fail("Das Bild ist größer als 10 MB. Bitte ein kleineres wählen.");
  if (!alt) return fail("Bitte eine kurze Bildbeschreibung eingeben.");
  if (category !== "restaurant" && category !== "catering") return fail("Bitte einen Bereich wählen.");

  try {
    const supabase = await adminClient();
    const buffer = Buffer.from(await file.arrayBuffer());
    const size = imageSize(buffer);
    const path = `${category}/${safeName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("galerie")
      .upload(path, buffer, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("galerie").getPublicUrl(path);

    const { count } = await supabase
      .from("gallery_images")
      .select("*", { count: "exact", head: true })
      .eq("category", category);

    const { error } = await supabase.from("gallery_images").insert({
      url: publicUrl,
      alt,
      category,
      width: size?.width ?? null,
      height: size?.height ?? null,
      sort_order: count ?? 0,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Bild hochladen", error);
    return fail("Das Hochladen hat nicht geklappt. Bitte erneut versuchen.");
  }

  revalidatePublic(...paths);
  return ok("Bild hinzugefügt.");
}

export async function saveGalleryImage(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const alt = text(formData, "alt");
  const category = text(formData, "category");
  const isActive = formData.get("is_active") === "on";
  if (!alt) return fail("Bitte eine kurze Bildbeschreibung eingeben.");
  if (category !== "restaurant" && category !== "catering") return fail("Bitte einen Bereich wählen.");

  try {
    const supabase = await adminClient();
    const { error } = await supabase
      .from("gallery_images")
      .update({ alt, category, is_active: isActive })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Bild speichern", error);
    return fail("Das Speichern hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Bild gespeichert.");
}

export async function deleteGalleryImage(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  try {
    const supabase = await adminClient();
    const { data: row } = await supabase.from("gallery_images").select("url").eq("id", id).maybeSingle();

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) throw error;

    // Nur selbst hochgeladene Dateien aus dem Speicher entfernen.
    const marker = "/storage/v1/object/public/galerie/";
    if (row?.url?.includes(marker)) {
      const path = row.url.split(marker)[1];
      if (path) await supabase.storage.from("galerie").remove([decodeURIComponent(path)]);
    }
  } catch (error) {
    console.error("[verwaltung] Bild löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Bild gelöscht.");
}

export async function moveGalleryImage(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const category = text(formData, "category");
  const direction = text(formData, "direction") === "up" ? "up" : "down";
  if (category !== "restaurant" && category !== "catering") return fail("Unbekannter Bereich.");

  try {
    const supabase = await adminClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("id, sort_order")
      .eq("category", category)
      .order("sort_order");
    if (error) throw error;
    const next = reorder(data ?? [], id, direction);
    if (!next) return ok("Unverändert.");
    for (const row of next) {
      const { error: updateError } = await supabase
        .from("gallery_images")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id);
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error("[verwaltung] Bild verschieben", error);
    return fail("Das Verschieben hat nicht geklappt.");
  }

  revalidatePublic(...paths);
  return ok("Reihenfolge geändert.");
}
