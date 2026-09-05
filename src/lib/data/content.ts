import "server-only";

import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { galleryImages as fallbackGallery, type GalleryCategory } from "@/lib/gallery";
import { seasons as fallbackSeasons } from "@/lib/hours";
import { allergenLegend as fallbackAllergens, menuCategories as fallbackMenu, type MenuCategory } from "@/lib/menu";
import {
  jobBenefits as fallbackBenefits,
  jobPostings as fallbackJobs,
  menuNotes as fallbackNotes,
  siteSettings as fallbackSettings,
  type JobPosting,
} from "@/lib/seed-content";

/**
 * Inhalte kommen aus Supabase, sobald es eingerichtet ist. Andernfalls – und
 * wenn eine Abfrage fehlschlägt – greifen die mitgelieferten Inhalte aus
 * `src/lib`. Die Website bleibt dadurch immer sichtbar.
 */

export type Season = {
  slug: string;
  label: string;
  period: string;
  startMonth: number;
  endMonth: number;
  restaurant: { opens: string; closes: string };
  takeaway: { opens: string; closes: string };
  kitchenUntil: string;
};

export type GalleryPhoto = {
  url: string;
  alt: string;
  category: GalleryCategory;
  width: number | null;
  height: number | null;
};

const seasonFallback: Season[] = fallbackSeasons.map((s) => ({
  slug: s.id === "summer" ? "sommer" : "winter",
  label: s.id === "summer" ? "Sommer" : "Winter",
  period: s.id === "summer" ? "1. Mai – 31. Oktober" : "1. November – 30. April",
  startMonth: s.from.month,
  endMonth: s.to.month,
  restaurant: s.restaurant,
  takeaway: s.takeaway,
  kitchenUntil: s.kitchenUntil,
}));

function warn(what: string, error: unknown) {
  console.warn(`[inhalte] ${what} konnte nicht geladen werden, nutze Standardinhalte.`, error);
}

export const getSeasons = cache(async (): Promise<Season[]> => {
  const supabase = createPublicClient();
  if (!supabase) return seasonFallback;
  const { data, error } = await supabase.from("opening_seasons").select("*").order("sort_order");
  if (error || !data?.length) {
    if (error) warn("Öffnungszeiten", error);
    return seasonFallback;
  }
  return data.map((row) => ({
    slug: row.slug,
    label: row.label,
    period: row.period,
    startMonth: row.start_month,
    endMonth: row.end_month,
    restaurant: { opens: row.restaurant_opens, closes: row.restaurant_closes },
    takeaway: { opens: row.takeaway_opens, closes: row.takeaway_closes },
    kitchenUntil: row.kitchen_until,
  }));
});

/** Aktuelle Saison anhand des Monats in Europe/Berlin. */
export function currentSeasonSlug(list: Season[], date = new Date()) {
  const month = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", month: "numeric" }).format(date),
  );
  const match = list.find((s) =>
    s.startMonth <= s.endMonth
      ? month >= s.startMonth && month <= s.endMonth
      : month >= s.startMonth || month <= s.endMonth,
  );
  return match?.slug ?? list[0]?.slug;
}

export const getMenu = cache(async (): Promise<MenuCategory[]> => {
  const supabase = createPublicClient();
  if (!supabase) return fallbackMenu;

  const [categories, items, variants] = await Promise.all([
    supabase.from("menu_categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("menu_items").select("*").eq("is_available", true).order("sort_order"),
    supabase.from("menu_item_variants").select("*").order("sort_order"),
  ]);

  if (categories.error || items.error || variants.error || !categories.data?.length) {
    if (categories.error || items.error || variants.error) {
      warn("Speisekarte", categories.error ?? items.error ?? variants.error);
    }
    return fallbackMenu;
  }

  return categories.data.map((category) => ({
    id: category.slug,
    title: category.title,
    intro: category.intro ?? undefined,
    note: category.note ?? undefined,
    items: (items.data ?? [])
      .filter((item) => item.category_id === category.id)
      .map((item) => {
        const itemVariants = (variants.data ?? []).filter((v) => v.item_id === item.id);
        return {
          name: item.name,
          desc: item.description ?? undefined,
          price: item.price_cents,
          allergens: item.allergens ?? undefined,
          tags: (item.tags ?? []) as MenuCategory["items"][number]["tags"],
          variants: itemVariants.length
            ? itemVariants.map((v) => ({ label: v.label, price: v.price_cents }))
            : undefined,
          extra:
            item.extra_label && item.extra_price_cents !== null
              ? { label: item.extra_label, price: item.extra_price_cents }
              : undefined,
        };
      }),
  }));
});

export const getAllergens = cache(async (): Promise<Array<{ code: string; label: string }>> => {
  const supabase = createPublicClient();
  if (!supabase) return fallbackAllergens;
  const { data, error } = await supabase.from("allergens").select("*").order("sort_order");
  if (error || !data?.length) {
    if (error) warn("Allergene", error);
    return fallbackAllergens;
  }
  return data.map(({ code, label }) => ({ code, label }));
});

export const getMenuNotes = cache(async (): Promise<string[]> => {
  const supabase = createPublicClient();
  if (!supabase) return fallbackNotes;
  const { data, error } = await supabase.from("menu_notes").select("*").order("sort_order");
  if (error || !data?.length) {
    if (error) warn("Hinweise zur Karte", error);
    return fallbackNotes;
  }
  return data.map((row) => row.text);
});

export const getGallery = cache(async (): Promise<GalleryPhoto[]> => {
  const supabase = createPublicClient();
  if (!supabase) {
    return fallbackGallery.map((img) => ({
      url: img.src,
      alt: img.alt,
      category: img.category,
      width: img.width,
      height: img.height,
    }));
  }
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error || !data?.length) {
    if (error) warn("Galerie", error);
    return fallbackGallery.map((img) => ({
      url: img.src,
      alt: img.alt,
      category: img.category,
      width: img.width,
      height: img.height,
    }));
  }
  return data.map((row) => ({
    url: row.url,
    alt: row.alt,
    category: row.category,
    width: row.width,
    height: row.height,
  }));
});

export const getJobs = cache(async (): Promise<{ postings: JobPosting[]; benefits: string[] }> => {
  const supabase = createPublicClient();
  const fallback = { postings: fallbackJobs, benefits: fallbackBenefits };
  if (!supabase) return fallback;

  const [postings, benefits] = await Promise.all([
    supabase.from("job_postings").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("job_benefits").select("*").order("sort_order"),
  ]);
  if (postings.error || benefits.error) {
    warn("Jobs", postings.error ?? benefits.error);
    return fallback;
  }
  return {
    postings: (postings.data ?? []).map((row) => ({ title: row.title, terms: row.terms ?? "" })),
    benefits: (benefits.data ?? []).map((row) => row.label),
  };
});

export type Settings = Record<string, string>;

const settingsFallback: Settings = Object.fromEntries(fallbackSettings.map((s) => [s.key, s.value]));

export const getSettings = cache(async (): Promise<Settings> => {
  const supabase = createPublicClient();
  if (!supabase) return settingsFallback;
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data?.length) {
    if (error) warn("Texte", error);
    return settingsFallback;
  }
  return { ...settingsFallback, ...Object.fromEntries(data.map((row) => [row.key, row.value])) };
});
