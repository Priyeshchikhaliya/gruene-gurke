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

/** Bots fill hidden fields; humans don't. */
export function isHoneypotTripped(formData: FormData) {
  const value = formData.get("website");
  return typeof value === "string" && value.length > 0;
}
