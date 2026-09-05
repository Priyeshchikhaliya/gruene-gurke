"use server";

import { revalidatePath } from "next/cache";
import { sendReservationDecision } from "@/lib/email/resend";
import { adminClient, fail, ok, optionalText, text, type AdminState } from "./helpers";

const STATUS = ["offen", "bestaetigt", "abgesagt"] as const;
type Status = (typeof STATUS)[number];

export async function updateReservation(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const status = text(formData, "status") as Status;
  if (!STATUS.includes(status)) return fail("Unbekannter Status.");

  const notifyGuest = formData.get("notify") === "on";
  const reason = text(formData, "reason");
  let reservation: {
    name: string;
    email: string;
    reserved_date: string;
    reserved_time: string;
    guests: number;
    status: Status;
  } | null = null;

  try {
    const supabase = await adminClient();

    const { data: current } = await supabase
      .from("reservations")
      .select("name, email, reserved_date, reserved_time, guests, status")
      .eq("id", id)
      .maybeSingle();
    reservation = current;

    const { error } = await supabase
      .from("reservations")
      .update({ status, internal_note: optionalText(formData, "internal_note") })
      .eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Reservierung", error);
    return fail("Das Speichern hat nicht geklappt.");
  }

  revalidatePath("/admin/reservierungen");
  revalidatePath("/admin");

  // Nur bei einer echten Entscheidung schreiben, und nur einmal.
  const decided = status === "bestaetigt" || status === "abgesagt";
  const changed = reservation !== null && reservation.status !== status;

  if (!notifyGuest || !decided || !changed || !reservation) {
    return ok("Reservierung aktualisiert.");
  }

  try {
    await sendReservationDecision({
      status,
      name: reservation.name,
      email: reservation.email,
      date: reservation.reserved_date,
      time: reservation.reserved_time,
      guests: reservation.guests,
      reason: reason || undefined,
    });
  } catch (error) {
    console.error("[verwaltung] Antwort an den Gast", error);
    return ok("Gespeichert, aber die E-Mail an den Gast ging nicht raus. Bitte telefonisch melden.");
  }

  return ok(status === "bestaetigt" ? "Bestätigt und dem Gast geschrieben." : "Abgesagt und dem Gast geschrieben.");
}

export async function deleteReservation(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("reservations").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Reservierung löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePath("/admin/reservierungen");
  revalidatePath("/admin");
  return ok("Reservierung gelöscht.");
}
