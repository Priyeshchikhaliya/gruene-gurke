import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReservationRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const monthFormat = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric", timeZone: "Europe/Berlin" });

/** YYYY-MM-DD in Europe/Berlin, ohne Zeitzonenüberraschungen. */
export function berlinToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

/** "2026-09" zerlegen; ungültige Angaben fallen auf den laufenden Monat zurück. */
export function parseMonth(value: string | undefined) {
  const today = berlinToday();
  const fallback = { year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) };
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return fallback;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  if (month < 1 || month > 12 || year < 2000 || year > 2100) return fallback;
  return { year, month };
}

const pad = (value: number) => String(value).padStart(2, "0");
const monthKey = (year: number, month: number) => `${year}-${pad(month)}`;

function shiftMonth(year: number, month: number, delta: number) {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

/**
 * Monatsübersicht der Reservierungen. Ein Klick auf einen Tag filtert die
 * Liste darunter; ohne Auswahl stehen dort die kommenden Anfragen.
 */
export function ReservationCalendar({
  reservations,
  year,
  month,
  selectedDay,
}: {
  reservations: ReservationRow[];
  year: number;
  month: number;
  selectedDay?: string;
}) {
  const today = berlinToday();
  const first = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  // getUTCDay: 0 = Sonntag. Wir beginnen die Woche am Montag.
  const leading = (first.getUTCDay() + 6) % 7;

  const byDay = new Map<string, ReservationRow[]>();
  for (const reservation of reservations) {
    const list = byDay.get(reservation.reserved_date) ?? [];
    list.push(reservation);
    byDay.set(reservation.reserved_date, list);
  }

  const previous = shiftMonth(year, month, -1);
  const next = shiftMonth(year, month, 1);
  const href = (params: { monat?: string; tag?: string }) => {
    const search = new URLSearchParams();
    if (params.monat) search.set("monat", params.monat);
    if (params.tag) search.set("tag", params.tag);
    const query = search.toString();
    return query ? `/admin/reservierungen?${query}` : "/admin/reservierungen";
  };

  const cells: Array<{ date: string; day: number } | null> = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      date: `${year}-${pad(month)}-${pad(i + 1)}`,
      day: i + 1,
    })),
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          href={href({ monat: monthKey(previous.year, previous.month) })}
          aria-label="Vorheriger Monat"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-forest-800 hover:bg-cream-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <p className="font-display text-xl text-forest-900 sm:text-2xl">
          {monthFormat.format(new Date(Date.UTC(year, month - 1, 15)))}
        </p>
        <Link
          href={href({ monat: monthKey(next.year, next.month) })}
          aria-label="Nächster Monat"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-forest-800 hover:bg-cream-100"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="pb-1 text-center text-[11px] font-medium uppercase tracking-wider text-muted">
            {weekday}
          </div>
        ))}

        {cells.map((cell, index) => {
          if (!cell) return <div key={`leer-${index}`} />;

          const list = byDay.get(cell.date) ?? [];
          // Abgesagte zählen nicht mit: sonst sieht ein freier Abend voll aus.
          const active = list.filter((r) => r.status !== "abgesagt");
          const open = list.filter((r) => r.status === "offen").length;
          const guests = active.reduce((sum, r) => sum + r.guests, 0);
          const isToday = cell.date === today;
          const isSelected = cell.date === selectedDay;

          return (
            <Link
              key={cell.date}
              href={href({ monat: monthKey(year, month), tag: isSelected ? undefined : cell.date })}
              aria-current={isSelected ? "date" : undefined}
              title={
                active.length
                  ? `${active.length} ${active.length === 1 ? "Reservierung" : "Reservierungen"}, ${guests} ${guests === 1 ? "Person" : "Personen"}`
                  : list.length
                    ? `${list.length} abgesagt`
                    : "Keine Reservierung"
              }
              className={cn(
                "flex min-h-14 flex-col rounded-lg border p-1.5 transition-colors sm:min-h-20 sm:p-2",
                isSelected
                  ? "border-forest-800 bg-forest-800 text-cream-50"
                  : active.length
                    ? "border-sage-300 bg-sage-100 hover:border-forest-700"
                    : "border-border hover:bg-cream-100",
              )}
            >
              <span
                className={cn(
                  "text-xs font-medium tabular-nums sm:text-sm",
                  isSelected ? "text-cream-50" : isToday ? "text-forest-800" : "text-ink-700",
                  isToday && !isSelected && "underline underline-offset-2",
                )}
              >
                {cell.day}
              </span>

              {list.length > 0 ? (
                <span className="mt-auto">
                  <span
                    className={cn(
                      "block text-[11px] font-medium leading-tight sm:text-xs",
                      isSelected ? "text-cream-50" : active.length ? "text-forest-900" : "text-ink-400 line-through",
                    )}
                  >
                    {active.length > 0 ? `${active.length} × · ${guests} P.` : `${list.length} ×`}
                  </span>
                  {open > 0 ? (
                    <span
                      className={cn(
                        "mt-0.5 inline-block rounded-full px-1.5 text-[10px] font-medium",
                        isSelected ? "bg-cream-50/20 text-cream-50" : "bg-gold-400/40 text-gold-600",
                      )}
                    >
                      {open} offen
                    </span>
                  ) : null}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-sage-300 bg-sage-100" aria-hidden="true" />
          Tag mit Reservierungen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="rounded-full bg-gold-400/40 px-1.5 text-[10px] font-medium text-gold-600">offen</span>
          noch nicht beantwortet
        </span>
        {selectedDay ? (
          <Link href={href({ monat: monthKey(year, month) })} className="ml-auto underline underline-offset-4 hover:text-forest-800">
            Auswahl aufheben
          </Link>
        ) : null}
      </div>
    </div>
  );
}
