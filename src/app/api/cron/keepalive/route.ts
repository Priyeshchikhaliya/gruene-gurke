import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { cronSecret } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Täglicher Aufruf durch Vercel Cron (siehe vercel.json).
 *
 * Kostenlose Supabase-Projekte werden nach etwa sieben Tagen ohne Aktivität
 * pausiert; dann scheitern Reservierungen, Kontaktformular und Anmeldung. Eine
 * echte Schreiboperation pro Tag hält das Projekt wach. Ein bloßes Lesen reicht
 * womöglich nicht, was Supabase als Aktivität zählt, ist nicht verlässlich
 * dokumentiert.
 *
 * Vercel schickt das Geheimnis als "Authorization: Bearer <CRON_SECRET>". Der
 * Proxy läuft nur unter /admin; dieser Pfad prüft die Berechtigung selbst.
 */

/** Vergleich in konstanter Zeit, auch wenn die Längen verschieden sind. */
function matches(received: string, expected: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(received), digest(expected));
}

function describe(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) return String(error.message);
  return "Unbekannter Fehler";
}

export async function GET(request: Request) {
  const secret = cronSecret();
  if (!secret) {
    // Ohne Geheimnis lieber gar nichts tun, als den Endpunkt offen zu lassen.
    return NextResponse.json({ ok: false, error: "Keepalive ist nicht eingerichtet." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization")?.trim() ?? "";
  if (!matches(authorization, `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false, error: "Nicht berechtigt." }, { status: 401 });
  }

  const beatAt = new Date().toISOString();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("heartbeat")
      .upsert({ id: 1, beat_at: beatAt, source: "vercel-cron" }, { onConflict: "id" });
    if (error) throw error;
  } catch (error) {
    console.error("[keepalive] Schreiben fehlgeschlagen", error);
    return NextResponse.json({ ok: false, error: describe(error) }, { status: 500 });
  }

  return NextResponse.json({ ok: true, beat_at: beatAt });
}
