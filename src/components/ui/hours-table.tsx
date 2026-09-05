import { currentSeason, seasons } from "@/lib/hours";
import { cn } from "@/lib/utils";

const label = { summer: "Sommer", winter: "Winter" } as const;
const range = { summer: "1. Mai – 31. Oktober", winter: "1. November – 30. April" } as const;

/** Öffnungszeiten wie auf der bisherigen Website: Tabelle ab sm, gestapelt darunter. */
export function HoursTable({ className }: { className?: string }) {
  const active = currentSeason().id;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}>
      <table className="hidden w-full text-left text-sm sm:table">
        <caption className="sr-only">Allgemeine Öffnungszeiten</caption>
        <thead className="bg-forest-800 text-cream-50">
          <tr>
            <th scope="col" className="px-4 py-4 font-medium md:px-5" />
            <th scope="col" className="px-4 py-4 font-medium md:px-5">Restaurant</th>
            <th scope="col" className="px-4 py-4 font-medium md:px-5">Abholservice</th>
            <th scope="col" className="px-4 py-4 font-medium md:px-5">Küche / Bestellannahme</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s) => (
            <tr key={s.id} className={cn("border-t border-border", s.id === active && "bg-sage-100/60")}>
              <th scope="row" className="px-4 py-4 align-top font-medium text-forest-900 md:px-5">
                <span className="flex flex-wrap items-center gap-2">
                  {label[s.id]}
                  {s.id === active ? (
                    <span className="rounded-full bg-forest-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-50">
                      aktuell
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted">{range[s.id]}</span>
              </th>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">{s.restaurant.opens} – {s.restaurant.closes} Uhr</td>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">{s.takeaway.opens} – {s.takeaway.closes} Uhr</td>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">bis {s.kitchenUntil} Uhr</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-border sm:hidden">
        {seasons.map((s) => (
          <li key={s.id} className={cn("px-5 py-4", s.id === active && "bg-sage-100/60")}>
            <p className="flex flex-wrap items-center gap-2 font-medium text-forest-900">
              {label[s.id]}
              {s.id === active ? (
                <span className="rounded-full bg-forest-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-50">
                  aktuell
                </span>
              ) : null}
            </p>
            <p className="text-xs text-muted">{range[s.id]}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-muted">Restaurant</dt>
              <dd className="tabular-nums">{s.restaurant.opens} – {s.restaurant.closes} Uhr</dd>
              <dt className="text-muted">Abholservice</dt>
              <dd className="tabular-nums">{s.takeaway.opens} – {s.takeaway.closes} Uhr</dd>
              <dt className="text-muted">Küche</dt>
              <dd className="tabular-nums">bis {s.kitchenUntil} Uhr</dd>
            </dl>
          </li>
        ))}
      </ul>

      <p className="border-t border-border px-5 py-3 text-xs leading-relaxed text-muted">
        Täglich ab 11 Uhr geöffnet, mit Ausnahme von Heiligabend. Am 1. und 2. Weihnachtsfeiertag nur bis 15:00 Uhr.
      </p>
    </div>
  );
}

/** Kurzfassung für Fußzeile und Randspalten. */
export function HoursCompact({ className }: { className?: string }) {
  return (
    <dl className={cn("space-y-3 text-sm", className)}>
      {seasons.map((s) => (
        <div key={s.id}>
          <dt className="font-medium">
            {label[s.id]} <span className="font-normal opacity-70">· {range[s.id]}</span>
          </dt>
          <dd className="tabular-nums opacity-80">
            Restaurant {s.restaurant.opens} – {s.restaurant.closes} Uhr · Küche bis {s.kitchenUntil} Uhr
          </dd>
        </div>
      ))}
    </dl>
  );
}
