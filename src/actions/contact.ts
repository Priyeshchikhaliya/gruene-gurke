"use server";

import { z } from "zod";
import { routing } from "@/i18n/routing";
import { sendContactEmail } from "@/lib/email/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "./types";
import { firstFieldErrors, isHoneypotTripped } from "./utils";

const schema = z.object({
  name: z.string().trim().min(2, "tooShort").max(80, "tooLong"),
  email: z.email("invalidEmail").max(120, "tooLong"),
  message: z.string().trim().min(10, "tooShort").max(2000, "tooLong"),
  locale: z.enum(routing.locales),
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

  const data = parsed.data;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_messages").insert(data);
    if (error) throw error;
  } catch (err) {
    console.error("[contact] insert failed", err);
    return { status: "error", formError: "genericError" };
  }

  try {
    await sendContactEmail(data);
  } catch (err) {
    console.error("[contact] email failed", err);
  }

  return { status: "success" };
}
