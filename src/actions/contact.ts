"use server";

import { z } from "zod";
import { anredeOptions } from "@/lib/anrede";
import { sendContactEmail } from "@/lib/email/resend";
import { isSupabaseConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "./types";
import { firstFieldErrors, isHoneypotTripped, isPhone, submittedValues } from "./utils";

const schema = z.object({
  anrede: z.enum(anredeOptions, "Bitte wählen Sie eine Anrede."),
  vorname: z.string().trim().min(2, "Bitte den Vornamen angeben.").max(80, "Bitte kürzer fassen, höchstens 80 Zeichen."),
  name: z.string().trim().min(2, "Bitte den Namen angeben.").max(80, "Bitte kürzer fassen, höchstens 80 Zeichen."),
  telefon: z
    .string()
    .trim()
    .min(6, "Bitte eine gültige Telefonnummer angeben.")
    .max(30, "Bitte eine gültige Telefonnummer angeben.")
    .refine(isPhone, "Bitte eine gültige Telefonnummer angeben, zum Beispiel 03943 634256."),
  email: z.email("Bitte eine gültige E-Mail-Adresse angeben.").max(120, "Bitte kürzer fassen, höchstens 120 Zeichen."),
  message: z
    .string()
    .trim()
    .min(10, "Bitte etwas ausführlicher, mindestens 10 Zeichen.")
    .max(2000, "Bitte kürzer fassen, höchstens 2000 Zeichen."),
  consent: z.literal("on", "Bitte stimmen Sie der Speicherung Ihrer Angaben zu."),
});

export type ContactField = keyof z.infer<typeof schema>;
export type ContactState = FormState<ContactField>;

const FIELDS = ["anrede", "vorname", "name", "telefon", "email", "message", "consent"] as const;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (isHoneypotTripped(formData)) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: firstFieldErrors<ContactField>(parsed.error),
      values: submittedValues(formData, FIELDS),
    };
  }

  const { anrede, vorname, name, telefon, email, message } = parsed.data;
  const fullName = `${anrede} ${vorname} ${name}`;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("contact_messages")
        .insert({ name: fullName, email, phone: telefon, message });
      if (error) throw error;
    } catch (err) {
      console.error("[kontakt] Speichern fehlgeschlagen", err);
      return {
        status: "error",
        formError: "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        values: submittedValues(formData, FIELDS),
      };
    }
  }

  try {
    await sendContactEmail({ name: fullName, email, phone: telefon, message });
  } catch (err) {
    console.error("[kontakt] E-Mail fehlgeschlagen", err);
  }

  return { status: "success" };
}
