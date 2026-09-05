import { z } from "zod";

/** First error message per field, for a flat object schema. */
export function firstFieldErrors<T extends string>(error: z.ZodError): Partial<Record<T, string>> {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
  const out: Partial<Record<T, string>> = {};
  for (const [field, messages] of Object.entries(flat)) {
    if (messages?.[0]) out[field as T] = messages[0];
  }
  return out;
}

/** Today's date as YYYY-MM-DD in the restaurant's timezone. */
export function todayInBerlin() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

/**
 * Bots füllen versteckte Felder aus, Menschen nicht. Ein Treffer wird
 * protokolliert: Sollte doch einmal eine echte Einsendung hängen bleiben,
 * ist das im Server-Log sichtbar statt spurlos zu verschwinden.
 */
export function isHoneypotTripped(formData: FormData) {
  const value = formData.get("zusatzangabe");
  const tripped = typeof value === "string" && value.trim().length > 0;
  if (tripped) console.warn("[falle] Einsendung verworfen, verstecktes Feld war ausgefüllt.");
  return tripped;
}

/** Abgeschickte Werte zurückgeben, damit das Formular sie behalten kann. */
export function submittedValues<T extends string>(formData: FormData, fields: readonly T[]) {
  const values: Partial<Record<T, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}
