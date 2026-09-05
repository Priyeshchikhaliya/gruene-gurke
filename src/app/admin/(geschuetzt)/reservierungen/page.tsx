import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { deleteReservation, updateReservation } from "@/actions/admin/inbox";
import { ActionForm, ConfirmDeleteButton } from "@/components/admin/action-form";
import { berlinToday, parseMonth, ReservationCalendar } from "@/components/admin/reservation-calendar";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox, Label, Select, Textarea } from "@/components/ui/field";
import { adminReservations } from "@/lib/data/admin";
import type { ReservationRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reservierungen" };

const statusLabels = { offen: "Offen", bestaetigt: "Bestätigt", abgesagt: "Abgesagt" } as const;
const statusStyles = {
  offen: "bg-gold-400/25 text-gold-600",
  bestaetigt: "bg-sage-100 text-forest-800",
  abgesagt: "bg-red-50 text-red-800",
} as const;

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

function formatDay(isoDate: string) {
  return dateFormat.format(new Date(`${isoDate}T12:00:00`));
}

/** Wie voll ist der Abend? Abgesagte zählen nicht mit. */
function dayLoad(all: ReservationRow[], date: string, exceptId?: string) {
  const others = all.filter(
    (r) => r.reserved_date === date && r.status !== "abgesagt" && r.id !== exceptId,
  );
  return {
    count: others.length,
    guests: others.reduce((sum, r) => sum + r.guests, 0),
  };
}

function ReservationCard({
  reservation,
  all,
}: {
  reservation: ReservationRow;
  all: ReservationRow[];
}) {
  const load = dayLoad(all, reservation.reserved_date, reservation.id);

  return (
    <Row>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl text-forest-900">
            {formatDay(reservation.reserved_date)} · {reservation.reserved_time.slice(0, 5)} Uhr
          </p>
          <p className="mt-1 text-sm text-ink-700">
            {reservation.name} · {reservation.guests} {reservation.guests === 1 ? "Person" : "Personen"}
          </p>
        </div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", statusStyles[reservation.status])}>
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

      {load.count > 0 ? (
        <p className="mb-4 rounded-lg border border-gold-400/50 bg-gold-400/10 px-4 py-3 text-sm leading-relaxed text-forest-900">
          An diesem Abend sind außerdem {load.count} {load.count === 1 ? "Reservierung" : "Reservierungen"} mit{" "}
          {load.guests} {load.guests === 1 ? "Person" : "Personen"} vorgemerkt. Zusammen mit dieser Anfrage sind es{" "}
          <strong>{load.guests + reservation.guests} Personen</strong>.
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

        <div>
          <Label htmlFor={`reason-${reservation.id}`} hint="optional">
            Grund für eine Absage
          </Label>
          <Textarea
            id={`reason-${reservation.id}`}
            name="reason"
            rows={2}
            className="min-h-20"
            placeholder="Zum Beispiel: An diesem Abend ist eine geschlossene Gesellschaft bei uns."
          />
          <p className="mt-2 text-xs text-muted">
            Wird nur mitgeschickt, wenn Sie auf „Abgesagt“ stellen. Bleibt das Feld leer, geht die Absage ohne
            Begründung raus.
          </p>
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
  );
}

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ monat?: string; tag?: string }>;
}) {
  const { monat, tag } = await searchParams;
  const reservations = await adminReservations();
  const { year, month } = parseMonth(monat ?? tag?.slice(0, 7));
  const today = berlinToday();

  const selectedDay = tag && /^\d{4}-\d{2}-\d{2}$/.test(tag) ? tag : undefined;
  const forDay = selectedDay ? reservations.filter((r) => r.reserved_date === selectedDay) : [];
  const upcoming = reservations.filter((r) => r.reserved_date >= today);
  const past = reservations.filter((r) => r.reserved_date < today).reverse();
  const openCount = upcoming.filter((r) => r.status === "offen").length;

  return (
    <>
      <AdminHeading
        title="Reservierungen"
        description="Anfragen aus dem Formular auf der Website. Beim Eingang bekommt der Gast automatisch eine Empfangsbestätigung. Stellen Sie den Status auf „Bestätigt“ oder „Abgesagt“, schreiben wir dem Gast auch die Antwort."
      />

      <div className="mb-6">
        <ReservationCalendar
          reservations={reservations}
          year={year}
          month={month}
          selectedDay={selectedDay}
        />
      </div>

      {selectedDay ? (
        <Card
          title={`${formatDay(selectedDay)} · ${forDay.length} ${forDay.length === 1 ? "Reservierung" : "Reservierungen"}`}
          description={(() => {
            const active = forDay.filter((r) => r.status !== "abgesagt");
            const guests = active.reduce((sum, r) => sum + r.guests, 0);
            return active.length
              ? `Zusammen ${guests} ${guests === 1 ? "Person" : "Personen"} an diesem Tag.`
              : undefined;
          })()}
        >
          {forDay.length === 0 ? (
            <EmptyHint>An diesem Tag liegt keine Reservierung vor.</EmptyHint>
          ) : (
            <div className="grid gap-4">
              {forDay.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} all={reservations} />
              ))}
            </div>
          )}
        </Card>
      ) : (
        <>
          <Card
            title={`Kommende Reservierungen (${upcoming.length})`}
            description={openCount > 0 ? `${openCount} davon warten noch auf eine Antwort.` : undefined}
            className="mb-6"
          >
            {upcoming.length === 0 ? (
              <EmptyHint>Zurzeit liegen keine Anfragen vor.</EmptyHint>
            ) : (
              <div className="grid gap-4">
                {upcoming.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} all={reservations} />
                ))}
              </div>
            )}
          </Card>

          {past.length > 0 ? (
            <Card title={`Vergangene (${past.length})`}>
              <div className="grid gap-4">
                {past.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} all={reservations} />
                ))}
              </div>
            </Card>
          ) : null}
        </>
      )}
    </>
  );
}
