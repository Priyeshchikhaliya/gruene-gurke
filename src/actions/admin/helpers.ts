import "server-only";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { routes } from "@/lib/routes";

export type AdminState = { ok?: boolean; message?: string; error?: string };

/** Prüft die Berechtigung und liefert den an die Sitzung gebundenen Client. */
export async function adminClient() {
  await requireAdmin();
  const supabase = await createClient();
  if (!supabase) throw new Error("Die Datenbank ist nicht eingerichtet.");
  return supabase;
}

export function ok(message = "Gespeichert."): AdminState {
  return { ok: true, message };
}

export function fail(error: string): AdminState {
  return { ok: false, error };
}

/** Öffentliche Seiten neu erzeugen, damit Änderungen sofort sichtbar sind. */
export function revalidatePublic(...paths: string[]) {
  const all = new Set<string>([routes.home, ...paths]);
  for (const path of all) revalidatePath(path);
}

export function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function optionalText(formData: FormData, key: string) {
  return text(formData, key) || null;
}

export function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

/** Preis wie "18,90" oder "18.90 €" in Cent. */
export function priceToCents(value: string) {
  const normalised = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalised);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.round(parsed * 100);
}

export function centsToInput(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",");
}

type Sortable = { id: string; sort_order: number };

/** Neue Reihenfolge nach einem Schritt nach oben oder unten. */
export function reorder<T extends Sortable>(rows: T[], id: string, direction: "up" | "down") {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const index = sorted.findIndex((row) => row.id === id);
  if (index === -1) return null;
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= sorted.length) return null;
  [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
  return sorted.map((row, i) => ({ id: row.id, sort_order: i }));
}
