"use server";

import { z } from "zod";
import { anredeOptions } from "@/lib/anrede";
import { sendContactEmail } from "@/lib/email/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "./types";
import { firstFieldErrors, isHoneypotTripped } from "./utils";

const schema = z.object({
  anrede: z.enum(anredeOptions, "Bitte wählen Sie eine Anrede."),
  vorname: z.string().trim().min(2, "Bitte ausfüllen.").max(80, "Bitte kürzer fassen."),
  name: z.string().trim().min(2, "Bitte ausfüllen.").max(80, "Bitte kürzer fassen."),
  telefon: z.string().trim().min(6, "Bitte eine gültige Telefonnummer angeben.").max(30, "Bitte eine gültige Telefonnummer angeben."),
  email: z.email("Bitte eine gültige E-Mail-Adresse angeben.").max(120, "Bitte kürzer fassen."),
  message: z.string().trim().min(10, "Bitte etwas ausführlicher.").max(2000, "Bitte kürzer fassen."),
  consent: z.literal("on", "Bitte stimmen Sie der Speicherung Ihrer Angaben zu."),
});

export type ContactField = keyof z.infer<typeof schema>;
export type ContactState = FormState<ContactField>;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (isHoneypotTripped(formData)) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", fieldErrors: firstFieldErrors<ContactField>(parsed.error) };
  }

  const { anrede, vorname, name, telefon, email, message } = parsed.data;
  const fullName = `${anrede} ${vorname} ${name}`;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name: fullName, email, phone: telefon, message, locale: "de" });
    if (error) throw error;
  } catch (err) {
    console.error("[contact] insert failed", err);
    return {
      status: "error",
      formError: "Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
    };
  }

  try {
    await sendContactEmail({ name: fullName, email, phone: telefon, message });
  } catch (err) {
    console.error("[contact] email failed", err);
  }

  return { status: "success" };
}
