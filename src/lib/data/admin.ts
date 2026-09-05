import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  JobBenefitRow,
  JobPostingRow,
  MenuCategoryRow,
  MenuItemRow,
  MenuItemVariantRow,
  MenuNoteRow,
  OpeningSeasonRow,
  ReservationRow,
} from "@/lib/supabase/database.types";

/**
 * Lesezugriffe für den Verwaltungsbereich. Anders als auf der Website sind
 * hier auch ausgeblendete Einträge sichtbar; RLS lässt das nur für Admins zu.
 */
async function client() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Die Datenbank ist nicht eingerichtet.");
  return supabase;
}

export async function adminSeasons(): Promise<OpeningSeasonRow[]> {
  const supabase = await client();
  const { data } = await supabase.from("opening_seasons").select("*").order("sort_order");
  return data ?? [];
}

export async function adminJobs(): Promise<{ postings: JobPostingRow[]; benefits: JobBenefitRow[] }> {
  const supabase = await client();
  const [postings, benefits] = await Promise.all([
    supabase.from("job_postings").select("*").order("sort_order"),
    supabase.from("job_benefits").select("*").order("sort_order"),
  ]);
  return { postings: postings.data ?? [], benefits: benefits.data ?? [] };
}

export async function adminMenuCategories(): Promise<Array<MenuCategoryRow & { itemCount: number }>> {
  const supabase = await client();
  const [categories, items] = await Promise.all([
    supabase.from("menu_categories").select("*").order("sort_order"),
    supabase.from("menu_items").select("id, category_id"),
  ]);
  return (categories.data ?? []).map((category) => ({
    ...category,
    itemCount: (items.data ?? []).filter((item) => item.category_id === category.id).length,
  }));
}

export type AdminMenuItem = MenuItemRow & { variants: MenuItemVariantRow[] };

export async function adminMenuCategory(slug: string): Promise<{
  category: MenuCategoryRow;
  items: AdminMenuItem[];
} | null> {
  const supabase = await client();
  const { data: category } = await supabase.from("menu_categories").select("*").eq("slug", slug).maybeSingle();
  if (!category) return null;

  const [items, variants] = await Promise.all([
    supabase.from("menu_items").select("*").eq("category_id", category.id).order("sort_order"),
    supabase.from("menu_item_variants").select("*").order("sort_order"),
  ]);

  return {
    category,
    items: (items.data ?? []).map((item) => ({
      ...item,
      variants: (variants.data ?? []).filter((v) => v.item_id === item.id),
    })),
  };
}

export async function adminMenuNotes(): Promise<MenuNoteRow[]> {
  const supabase = await client();
  const { data } = await supabase.from("menu_notes").select("*").order("sort_order");
  return data ?? [];
}

export async function adminReservations(): Promise<ReservationRow[]> {
  const supabase = await client();
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .order("reserved_date", { ascending: true })
    .order("reserved_time", { ascending: true });
  return data ?? [];
}

export async function adminCounts() {
  const supabase = await client();
  const [openReservations, dishes, jobs] = await Promise.all([
    supabase.from("reservations").select("*", { count: "exact", head: true }).eq("status", "offen"),
    supabase.from("menu_items").select("*", { count: "exact", head: true }),
    supabase.from("job_postings").select("*", { count: "exact", head: true }).eq("is_active", true),
  ]);
  return {
    openReservations: openReservations.count ?? 0,
    dishes: dishes.count ?? 0,
    jobs: jobs.count ?? 0,
  };
}
