/**
 * Füllt die Datenbank mit den Inhalten aus src/lib.
 * Aufruf: npm run seed
 *
 * Vorsicht: Die Inhaltstabellen werden vorher geleert. Änderungen aus dem
 * Verwaltungsbereich gehen dabei verloren. Reservierungen und Nachrichten
 * bleiben unangetastet.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { menuCategories, allergenLegend } from "../src/lib/menu.ts";
import { galleryImages } from "../src/lib/gallery.ts";
import { seasons } from "../src/lib/hours.ts";
import { jobPostings, jobBenefits, menuNotes, siteSettings } from "../src/lib/seed-content.ts";

function readEnv() {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  return Object.fromEntries(
    raw
      .split("\n")
      .filter((line) => line.includes("=") && !line.trim().startsWith("#"))
      .map((line) => {
        const i = line.indexOf("=");
        return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^"|"$/g, "")];
      }),
  );
}

const env = readEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key || url.includes("YOUR-PROJECT")) {
  console.error("Bitte zuerst NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY in .env.local eintragen.");
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

function check(step, { error }) {
  if (error) {
    console.error(`\nFehler bei "${step}": ${error.message}`);
    process.exit(1);
  }
}

/** Alle Zeilen löschen, ohne eine bestimmte ID zu kennen. */
async function clearAll(table, column, sentinel) {
  check(`${table} leeren`, await db.from(table).delete().neq(column, sentinel));
}

console.log("Leere Inhaltstabellen ...");
await clearAll("menu_item_variants", "label", "__keine__");
await clearAll("menu_items", "name", "__keine__");
await clearAll("menu_categories", "slug", "__keine__");
await clearAll("menu_notes", "text", "__keine__");
await clearAll("gallery_images", "url", "__keine__");
await clearAll("job_postings", "title", "__keine__");
await clearAll("job_benefits", "label", "__keine__");
await clearAll("opening_seasons", "slug", "__keine__");
await clearAll("allergens", "code", "__keine__");
await clearAll("site_settings", "key", "__keine__");

// --- Öffnungszeiten --------------------------------------------------------
const seasonMeta = {
  summer: { slug: "sommer", label: "Sommer", period: "1. Mai – 31. Oktober" },
  winter: { slug: "winter", label: "Winter", period: "1. November – 30. April" },
};

check(
  "Öffnungszeiten",
  await db.from("opening_seasons").insert(
    seasons.map((season, index) => ({
      ...seasonMeta[season.id],
      start_month: season.from.month,
      end_month: season.to.month,
      restaurant_opens: season.restaurant.opens,
      restaurant_closes: season.restaurant.closes,
      takeaway_opens: season.takeaway.opens,
      takeaway_closes: season.takeaway.closes,
      kitchen_until: season.kitchenUntil,
      sort_order: index,
    })),
  ),
);
console.log(`Öffnungszeiten: ${seasons.length}`);

// --- Speisekarte -----------------------------------------------------------
const { data: categoryRows, error: categoryError } = await db
  .from("menu_categories")
  .insert(
    menuCategories.map((category, index) => ({
      slug: category.id,
      title: category.title,
      intro: category.intro ?? null,
      note: category.note ?? null,
      sort_order: index,
    })),
  )
  .select("id, slug");
check("Kategorien", { error: categoryError });

const categoryId = new Map(categoryRows.map((row) => [row.slug, row.id]));

const itemPayload = menuCategories.flatMap((category) =>
  category.items.map((item, index) => ({
    category_id: categoryId.get(category.id),
    name: item.name,
    description: item.desc ?? null,
    price_cents: item.price,
    allergens: item.allergens ?? null,
    tags: item.tags ?? [],
    extra_label: item.extra?.label ?? null,
    extra_price_cents: item.extra?.price ?? null,
    sort_order: index,
  })),
);

const { data: itemRows, error: itemError } = await db
  .from("menu_items")
  .insert(itemPayload)
  .select("id, name, category_id");
check("Gerichte", { error: itemError });

const itemId = new Map(itemRows.map((row) => [`${row.category_id}::${row.name}`, row.id]));

const variantPayload = menuCategories.flatMap((category) =>
  category.items.flatMap((item) =>
    (item.variants ?? []).map((variant, index) => ({
      item_id: itemId.get(`${categoryId.get(category.id)}::${item.name}`),
      label: variant.label,
      price_cents: variant.price,
      sort_order: index,
    })),
  ),
);

if (variantPayload.length) {
  check("Preisvarianten", await db.from("menu_item_variants").insert(variantPayload));
}

check(
  "Allergene",
  await db
    .from("allergens")
    .insert(allergenLegend.map((a, index) => ({ code: a.code, label: a.label, sort_order: index }))),
);

check(
  "Hinweise",
  await db.from("menu_notes").insert(menuNotes.map((noteText, index) => ({ text: noteText, sort_order: index }))),
);

console.log(
  `Speisekarte: ${categoryRows.length} Kategorien, ${itemRows.length} Gerichte, ${variantPayload.length} Preisvarianten`,
);
console.log(`Allergene: ${allergenLegend.length} - Hinweise: ${menuNotes.length}`);

// --- Galerie ---------------------------------------------------------------
check(
  "Galerie",
  await db.from("gallery_images").insert(
    galleryImages.map((image, index) => ({
      url: image.src,
      alt: image.alt,
      category: image.category,
      width: image.width,
      height: image.height,
      sort_order: index,
    })),
  ),
);
console.log(`Galerie: ${galleryImages.length} Bilder`);

// --- Jobs ------------------------------------------------------------------
check("Stellen", await db.from("job_postings").insert(jobPostings.map((job, index) => ({ ...job, sort_order: index }))));
check(
  "Vorteile",
  await db.from("job_benefits").insert(jobBenefits.map((label, index) => ({ label, sort_order: index }))),
);
console.log(`Jobs: ${jobPostings.length} Stellen, ${jobBenefits.length} Vorteile`);

// --- Texte -----------------------------------------------------------------
check(
  "Texte",
  await db.from("site_settings").insert(siteSettings.map((setting, index) => ({ ...setting, sort_order: index }))),
);
console.log(`Texte: ${siteSettings.length}`);

console.log("\nFertig. Die Website zeigt jetzt die Inhalte aus der Datenbank.");
