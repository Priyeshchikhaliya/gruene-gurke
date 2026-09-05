import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Mail, Phone, Users } from "lucide-react";
import { deleteReservation, updateReservation } from "@/actions/admin/inbox";
import { ActionForm, ConfirmDeleteButton } from "@/components/admin/action-form";
import { berlinToday, parseMonth, ReservationCalendar } from "@/components/admin/reservation-calendar";
import { AdminHeading, Card, EmptyHint } from "@/components/admin/ui";
import { Checkbox, Label, Select, Textarea } from "@/components/ui/field";
import { adminReservations } from "@/lib/data/admin";
import type { ReservationRow, ReservationStatus } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reservierungen" };

const statusLabels: Record<ReservationStatus, string> = {
  offen: "Offen",
  bestaetigt: "Bestätigt",
  abgesagt: "Abgesagt",
};

const statusStyles: Record<ReservationStatus, string> = {
  offen: "bg-gold-400/25 text-gold-600",
  bestaetigt: "bg-sage-100 text-forest-800",
  abgesagt: "bg-red-50 text-red-800",
};

const shortDate = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  timeZone: "Europe/Berlin",
});

const longDate = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

const asDate = (isoDate: string) => new Date(`${isoDate}T12:00:00`);

/** Wie voll ist der Abend? Abgesagte zählen nicht mit. */
function dayLoad(all: ReservationRow[], date: string, exceptId: string) {
  const others = all.filter((r) => r.reserved_date === date && r.status !== "abgesagt" && r.id !== exceptId);
  return { count: others.length, guests: others.reduce((sum, r) => sum + r.guests, 0) };
}

/**
 * Eine Zeile je Anfrage. Zugeklappt steht nur das Nötigste da; offene
 * Anfragen sind von sich aus aufgeklappt, weil sie eine Antwort brauchen.
 */
function ReservationItem({
  reservation,
  all,
  expanded = false,
}: {
  reservation: ReservationRow;
  all: ReservationRow[];
  expanded?: boolean;
}) {
  const load = dayLoad(all, reservation.reserved_date, reservation.id);

  return (
    <details
      open={expanded && reservation.status === "offen"}
      className="group rounded-xl border border-border bg-cream-50 open:bg-surface"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 p-3 sm:gap-4 sm:p-4">
        <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" />

        {/* Schmale Schirme: Datum und Name untereinander, sonst nebeneinander. */}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
          <span className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-forest-900 sm:w-32">
            {shortDate.format(asDate(reservation.reserved_date))}
            <span className="ml-1 font-normal text-muted">{reservation.reserved_time.slice(0, 5)}</span>
          </span>
          <span className="truncate text-sm text-ink-700">{reservation.name}</span>
        </span>

        <span className="flex shrink-0 items-center gap-1 text-sm tabular-nums text-muted">
          <Users className="h-3.5 w-3.5" />
          {reservation.guests}
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-1 text-[11px] font-medium sm:px-3 sm:text-xs",
            statusStyles[reservation.status],
          )}
        >
          {statusLabels[reservation.status]}
        </span>
      </summary>

      <div className="border-t border-border px-3 pb-4 pt-4 sm:px-4">
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
                maxLength={1000}
                className="min-h-20"
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`reason-${reservation.id}`} hint="optional">Grund für eine Absage</Label>
            <Textarea
              id={`reason-${reservation.id}`}
              name="reason"
              rows={2}
              maxLength={500}
              className="min-h-20"
              placeholder="Zum Beispiel: An diesem Abend ist eine geschlossene Gesellschaft bei uns."
            />
            <p className="mt-2 text-xs text-muted">
              Wird nur mitgeschickt, wenn Sie auf „Abgesagt“ stellen.
            </p>
          </div>

          <Checkbox id={`notify-${reservation.id}`} name="notify" defaultChecked>
            Gast per E-Mail benachrichtigen
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
      </div>
    </details>
  );
}

const FILTERS = [
  { key: "offen", label: "Offen" },
  { key: "bestaetigt", label: "Bestätigt" },
  { key: "abgesagt", label: "Abgesagt" },
] as const;

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ monat?: string; tag?: string; status?: string }>;
}) {
  const { monat, tag, status } = await searchParams;
  const reservations = await adminReservations();
  const { year, month } = parseMonth(monat ?? tag?.slice(0, 7));
  const today = berlinToday();

  const selectedDay = tag && /^\d{4}-\d{2}-\d{2}$/.test(tag) ? tag : undefined;
  const activeStatus = FILTERS.some((f) => f.key === status) ? (status as ReservationStatus) : undefined;

  const base = selectedDay
    ? reservations.filter((r) => r.reserved_date === selectedDay)
    : reservations.filter((r) => r.reserved_date >= today);
  const shown = activeStatus ? base.filter((r) => r.status === activeStatus) : base;

  const past = selectedDay ? [] : reservations.filter((r) => r.reserved_date < today).reverse();
  const counts = {
    alle: base.length,
    offen: base.filter((r) => r.status === "offen").length,
    bestaetigt: base.filter((r) => r.status === "bestaetigt").length,
    abgesagt: base.filter((r) => r.status === "abgesagt").length,
  };

  const guests = shown.filter((r) => r.status !== "abgesagt").reduce((sum, r) => sum + r.guests, 0);

  const filterHref = (key?: string) => {
    const search = new URLSearchParams();
    if (monat) search.set("monat", monat);
    if (selectedDay) search.set("tag", selectedDay);
    if (key) search.set("status", key);
    const query = search.toString();
    return query ? `/admin/reservierungen?${query}` : "/admin/reservierungen";
  };

  const title = selectedDay ? longDate.format(asDate(selectedDay)) : "Kommende Anfragen";

  return (
    <>
      <AdminHeading
        title="Reservierungen"
        description="Anfragen aus dem Formular auf der Website. Offene Anfragen stehen aufgeklappt, alles andere klappen Sie bei Bedarf auf."
      />

      <div className="mb-6">
        <ReservationCalendar reservations={reservations} year={year} month={month} selectedDay={selectedDay} />
      </div>

      <Card
        title={title}
        description={
          shown.length
            ? `${shown.length} ${shown.length === 1 ? "Anfrage" : "Anfragen"} · ${guests} ${guests === 1 ? "Person" : "Personen"}`
            : undefined
        }
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <Link
            href={filterHref()}
            aria-current={!activeStatus ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition-colors",
              !activeStatus ? "bg-forest-800 text-cream-50" : "border border-border text-ink-700 hover:bg-cream-100",
            )}
          >
            Alle ({counts.alle})
          </Link>
          {FILTERS.map((filter) => (
            <Link
              key={filter.key}
              href={filterHref(filter.key)}
              aria-current={activeStatus === filter.key ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                activeStatus === filter.key
                  ? "bg-forest-800 text-cream-50"
                  : "border border-border text-ink-700 hover:bg-cream-100",
              )}
            >
              {filter.label} ({counts[filter.key]})
            </Link>
          ))}
        </div>

        {shown.length === 0 ? (
          <EmptyHint>
            {activeStatus ? "In dieser Ansicht liegt nichts vor." : "Zurzeit liegen keine Anfragen vor."}
          </EmptyHint>
        ) : (
          <div className="grid gap-2">
            {shown.map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} all={reservations} expanded />
            ))}
          </div>
        )}
      </Card>

      {past.length > 0 ? (
        <Card title={`Vergangene (${past.length})`} className="mt-6">
          <div className="grid gap-2">
            {past.map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} all={reservations} />
            ))}
          </div>
        </Card>
      ) : null}
    </>
  );
}
