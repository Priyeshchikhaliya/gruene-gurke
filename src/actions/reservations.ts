"use server";

import { z } from "zod";
import { routing } from "@/i18n/routing";
import { sendReservationEmails } from "@/lib/email/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "./types";
import { firstFieldErrors, isHoneypotTripped, todayInBerlin } from "./utils";

const schema = z
  .object({
    name: z.string().trim().min(2, "tooShort").max(80, "tooLong"),
    email: z.email("invalidEmail").max(120, "tooLong"),
    phone: z.string().trim().min(6, "invalidPhone").max(30, "invalidPhone"),
    guests: z.coerce.number({ error: "required" }).int("guestsRange").min(1, "guestsRange").max(12, "guestsRange"),
    date: z.iso.date("invalidDate"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "invalidTime"),
    message: z.string().trim().max(1000, "tooLong").optional(),
    locale: z.enum(routing.locales),
  })
  .refine((v) => v.date >= todayInBerlin(), { error: "pastDate", path: ["date"] });

export type ReservationField = keyof z.infer<typeof schema>;
export type ReservationState = FormState<ReservationField>;

export async function createReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  if (isHoneypotTripped(formData)) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", fieldErrors: firstFieldErrors<ReservationField>(parsed.error) };
  }

  const data = parsed.data;

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
      locale: data.locale,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[reservations] insert failed", err);
    return { status: "error", formError: "genericError" };
  }

  // The request is stored; a failed notification must not fail the user.
  try {
    await sendReservationEmails({
      name: data.name,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      date: data.date,
      time: data.time,
      message: data.message,
      locale: data.locale,
    });
  } catch (err) {
    console.error("[reservations] email failed", err);
  }

  return { status: "success" };
}
