import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { deleteReservation, updateReservation } from "@/actions/admin/inbox";
import { ActionForm, ConfirmDeleteButton } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox, Label, Select, Textarea } from "@/components/ui/field";
import { adminReservations } from "@/lib/data/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reservierungen" };

const statusLabels = { offen: "Offen", bestaetigt: "Bestätigt", abgesagt: "Abgesagt" } as const;
const statusStyles = {
  offen: "bg-gold-400/25 text-gold-600",
  bestaetigt: "bg-sage-100 text-forest-800",
  abgesagt: "bg-red-50 text-red-800",
} as const;

const dateFormat = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export default async function ReservationsPage() {
  const reservations = await adminReservations();
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
  const upcoming = reservations.filter((r) => r.reserved_date >= today);
  const past = reservations.filter((r) => r.reserved_date < today).reverse();

  const list = (rows: typeof reservations) => (
    <div className="grid gap-4">
      {rows.map((reservation) => (
        <Row key={reservation.id}>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl text-forest-900">
                {dateFormat.format(new Date(`${reservation.reserved_date}T12:00:00`))} ·{" "}
                {reservation.reserved_time.slice(0, 5)} Uhr
              </p>
              <p className="mt-1 text-sm text-ink-700">
                {reservation.name} · {reservation.guests} {reservation.guests === 1 ? "Person" : "Personen"}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                statusStyles[reservation.status],
              )}
            >
              {statusLabels[reservation.status]}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`tel:${reservation.phone}`} className="inline-flex items-center gap-1.5 text-forest-800 hover:underline">
              <Phone className="h-3.5 w-3.5" /> {reservation.phone}
            </a>
            <a href={`mailto:${reservation.email}`} className="inline-flex items-center gap-1.5 text-forest-800 hover:underline">
              <Mail className="h-3.5 w-3.5" /> {reservation.email}
            </a>
          </div>

          {reservation.message ? (
            <p className="mb-4 rounded-lg bg-cream-100 px-4 py-3 text-sm leading-relaxed text-ink-700">
              „{reservation.message}“
            </p>
          ) : null}

          <ActionForm action={updateReservation} hidden={{ id: reservation.id }} className="gap-3">
            <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
              <div>
                <Label htmlFor={`status-${reservation.id}`}>Status</Label>
                <Select id={`status-${reservation.id}`} name="status" defaultValue={reservation.status}>
                  <option value="offen">Offen</option>
                  <option value="bestaetigt">Bestätigt</option>
                  <option value="abgesagt">Abgesagt</option>
                </Select>
              </div>
              <div>
                <Label htmlFor={`note-${reservation.id}`} hint="nur intern">Notiz</Label>
                <Textarea
                  id={`note-${reservation.id}`}
                  name="internal_note"
                  defaultValue={reservation.internal_note ?? ""}
                  rows={2}
                  className="min-h-20"
                />
              </div>
            </div>
            <Checkbox id={`notify-${reservation.id}`} name="notify" defaultChecked>
              Gast per E-Mail benachrichtigen, sobald ich auf „Bestätigt“ oder „Abgesagt“ stelle
            </Checkbox>
          </ActionForm>

          <div className="mt-4 border-t border-border pt-4">
            <ConfirmDeleteButton
              action={deleteReservation}
              hidden={{ id: reservation.id }}
              label="Reservierung löschen"
              question="Reservierung wirklich löschen?"
            />
          </div>
        </Row>
      ))}
    </div>
  );

  return (
    <>
      <AdminHeading
        title="Reservierungen"
        description="Anfragen aus dem Formular auf der Website. Beim Eingang bekommt der Gast automatisch eine Empfangsbestätigung. Stellen Sie den Status auf „Bestätigt“ oder „Abgesagt“, schreiben wir dem Gast auch die Antwort – solange das Kästchen darunter gesetzt ist."
      />

      <Card title={`Kommende Reservierungen (${upcoming.length})`} className="mb-6">
        {upcoming.length === 0 ? <EmptyHint>Zurzeit liegen keine Anfragen vor.</EmptyHint> : list(upcoming)}
      </Card>

      {past.length > 0 ? <Card title={`Vergangene (${past.length})`}>{list(past)}</Card> : null}
    </>
  );
}
