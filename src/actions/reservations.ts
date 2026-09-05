"use server";

import { z } from "zod";
import { sendReservationEmails } from "@/lib/email/resend";
import { isSupabaseConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "./types";
import { firstFieldErrors, isHoneypotTripped, submittedValues, todayInBerlin } from "./utils";

const schema = z
  .object({
    name: z.string().trim().min(2, "Bitte ausfüllen.").max(80, "Bitte kürzer fassen."),
    email: z.email("Bitte eine gültige E-Mail-Adresse angeben.").max(120, "Bitte kürzer fassen."),
    phone: z.string().trim().min(6, "Bitte eine gültige Telefonnummer angeben.").max(30, "Bitte eine gültige Telefonnummer angeben."),
    guests: z.coerce
      .number({ error: "Bitte die Anzahl der Personen angeben." })
      .int("Bitte eine ganze Zahl angeben.")
      .min(1, "Bitte mindestens eine Person angeben.")
      .max(50, "Für mehr als 50 Personen sprechen wir das gern persönlich ab. Rufen Sie uns bitte an."),
    date: z.iso.date("Bitte ein gültiges Datum wählen."),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Bitte eine gültige Uhrzeit wählen."),
    message: z.string().trim().max(1000, "Bitte kürzer fassen.").optional(),
    consent: z.literal("on", "Bitte stimmen Sie der Speicherung Ihrer Angaben zu."),
  })
  .refine((v) => v.date >= todayInBerlin(), { error: "Das Datum liegt in der Vergangenheit.", path: ["date"] });

export type ReservationField = keyof z.infer<typeof schema>;
export type ReservationState = FormState<ReservationField>;

const FIELDS = ["name", "email", "phone", "guests", "date", "time", "message", "consent"] as const;

export async function createReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  if (isHoneypotTripped(formData)) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: firstFieldErrors<ReservationField>(parsed.error),
      values: submittedValues(formData, FIELDS),
    };
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("reservations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        reserved_date: data.date,
        reserved_time: data.time,
        message: data.message || null,
      });
      if (error) throw error;
    } catch (err) {
      console.error("[reservierung] Speichern fehlgeschlagen", err);
      return {
        status: "error",
        formError: "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        values: submittedValues(formData, FIELDS),
      };
    }
  }

  // Anfrage ist gespeichert; eine fehlgeschlagene Benachrichtigung darf den Gast nicht scheitern lassen.
  try {
    await sendReservationEmails({
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      date: data.date,
      time: data.time,
      message: data.message,
    });
  } catch (err) {
    console.error("[reservierung] E-Mail fehlgeschlagen", err);
  }

  return { status: "success" };
}
