"use server";

import { revalidatePath } from "next/cache";
import { adminClient, fail, ok, optionalText, text, type AdminState } from "./helpers";

const STATUS = ["offen", "bestaetigt", "abgesagt"] as const;
type Status = (typeof STATUS)[number];

export async function updateReservation(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const id = text(formData, "id");
  const status = text(formData, "status") as Status;
  if (!STATUS.includes(status)) return fail("Unbekannter Status.");

  try {
    const supabase = await adminClient();
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
  return ok("Reservierung aktualisiert.");
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

export async function toggleMessageRead(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: formData.get("is_read") === "on" })
      .eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Nachricht", error);
    return fail("Das Speichern hat nicht geklappt.");
  }
  revalidatePath("/admin/nachrichten");
  revalidatePath("/admin");
  return ok("Aktualisiert.");
}

export async function deleteMessage(_prev: AdminState, formData: FormData): Promise<AdminState> {
  try {
    const supabase = await adminClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", text(formData, "id"));
    if (error) throw error;
  } catch (error) {
    console.error("[verwaltung] Nachricht löschen", error);
    return fail("Das Löschen hat nicht geklappt.");
  }
  revalidatePath("/admin/nachrichten");
  revalidatePath("/admin");
  return ok("Nachricht gelöscht.");
}
