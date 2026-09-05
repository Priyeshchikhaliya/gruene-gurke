/**
 * Erzeugt supabase/seed.sql aus den statischen Inhalten in src/lib.
 * Aufruf: node scripts/generate-seed.mjs
 * Node 24 kann TypeScript direkt lesen, deshalb genügt ein Import.
 */
import { writeFileSync } from "node:fs";
import { menuCategories, allergenLegend } from "../src/lib/menu.ts";
import { galleryImages } from "../src/lib/gallery.ts";
import { seasons } from "../src/lib/hours.ts";
import { jobPostings, jobBenefits, menuNotes, siteSettings } from "../src/lib/seed-content.ts";

const q = (v) => (v === null || v === undefined || v === "" ? "null" : `'${String(v).replaceAll("'", "''")}'`);
const arr = (list) => (list?.length ? `array[${list.map((v) => q(v)).join(", ")}]` : "'{}'");
const n = (v) => (v === null || v === undefined ? "null" : String(v));

const out = [];
out.push(`-- Grüne Gurke · Startinhalte
-- Erzeugt von scripts/generate-seed.mjs – nicht von Hand ändern.
-- Einmalig nach 0001_init.sql ausführen. Ein zweiter Lauf ersetzt die Inhalte
-- und verwirft damit alle Änderungen aus dem Verwaltungsbereich.

begin;

truncate table
  public.menu_item_variants,
  public.menu_items,
  public.menu_categories,
  public.allergens,
  public.menu_notes,
  public.gallery_images,
  public.job_postings,
  public.job_benefits,
  public.opening_seasons,
  public.site_settings
  restart identity cascade;
`);

// -- Öffnungszeiten ---------------------------------------------------------
const seasonLabels = { summer: ["sommer", "Sommer", "1. Mai – 31. Oktober"], winter: ["winter", "Winter", "1. November – 30. April"] };
out.push("\n-- Öffnungszeiten");
seasons.forEach((s, i) => {
  const [slug, label, period] = seasonLabels[s.id];
  out.push(
    `insert into public.opening_seasons (slug, label, period, start_month, end_month, restaurant_opens, restaurant_closes, takeaway_opens, takeaway_closes, kitchen_until, sort_order) values (${q(slug)}, ${q(label)}, ${q(period)}, ${n(s.from.month)}, ${n(s.to.month)}, ${q(s.restaurant.opens)}, ${q(s.restaurant.closes)}, ${q(s.takeaway.opens)}, ${q(s.takeaway.closes)}, ${q(s.kitchenUntil)}, ${i});`,
  );
});

// -- Speisekarte ------------------------------------------------------------
out.push("\n-- Speisekarte");
menuCategories.forEach((cat, ci) => {
  out.push(
    `insert into public.menu_categories (slug, title, intro, note, sort_order) values (${q(cat.id)}, ${q(cat.title)}, ${q(cat.intro)}, ${q(cat.note)}, ${ci});`,
  );
  cat.items.forEach((item, ii) => {
    const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
    out.push(
      `insert into public.menu_items (category_id, name, description, price_cents, allergens, tags, extra_label, extra_price_cents, sort_order) select id, ${q(item.name)}, ${q(item.desc)}, ${n(item.price)}, ${q(item.allergens)}, ${arr(item.tags)}, ${q(item.extra?.label)}, ${n(item.extra?.price)}, ${ii} from public.menu_categories where slug = ${q(cat.id)};`,
    );
    if (hasVariants) {
      item.variants.forEach((v, vi) => {
        out.push(
          `insert into public.menu_item_variants (item_id, label, price_cents, sort_order) select i.id, ${q(v.label)}, ${n(v.price)}, ${vi} from public.menu_items i join public.menu_categories c on c.id = i.category_id where c.slug = ${q(cat.id)} and i.name = ${q(item.name)};`,
        );
      });
    }
  });
});

out.push("\n-- Zusatzstoffe und Allergene");
allergenLegend.forEach((a, i) => {
  out.push(`insert into public.allergens (code, label, sort_order) values (${q(a.code)}, ${q(a.label)}, ${i});`);
});

out.push("\n-- Hinweise unter der Karte");
menuNotes.forEach((text, i) => {
  out.push(`insert into public.menu_notes (text, sort_order) values (${q(text)}, ${i});`);
});

// -- Galerie ----------------------------------------------------------------
out.push("\n-- Galerie");
galleryImages.forEach((img, i) => {
  out.push(
    `insert into public.gallery_images (url, alt, category, width, height, sort_order) values (${q(img.src)}, ${q(img.alt)}, ${q(img.category)}, ${n(img.width)}, ${n(img.height)}, ${i});`,
  );
});

// -- Jobs -------------------------------------------------------------------
out.push("\n-- Jobs");
jobPostings.forEach((job, i) => {
  out.push(`insert into public.job_postings (title, terms, sort_order) values (${q(job.title)}, ${q(job.terms)}, ${i});`);
});
jobBenefits.forEach((label, i) => {
  out.push(`insert into public.job_benefits (label, sort_order) values (${q(label)}, ${i});`);
});

// -- Einstellungen ----------------------------------------------------------
out.push("\n-- Einstellungen");
siteSettings.forEach((s, i) => {
  out.push(
    `insert into public.site_settings (key, value, label, hint, multiline, sort_order) values (${q(s.key)}, ${q(s.value)}, ${q(s.label)}, ${q(s.hint)}, ${s.multiline ? "true" : "false"}, ${i});`,
  );
});

out.push("\ncommit;\n");
writeFileSync(new URL("../supabase/seed.sql", import.meta.url), out.join("\n"));
console.log(`seed.sql geschrieben: ${out.length} Zeilen`);
