import type { Season } from "@/lib/data/content";
import { cn } from "@/lib/utils";

/** Öffnungszeiten wie auf der bisherigen Website: Tabelle ab sm, gestapelt darunter. */
export function HoursTable({
  seasons,
  activeSlug,
  note,
  className,
}: {
  seasons: Season[];
  activeSlug?: string;
  note?: string;
  className?: string;
}) {
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
          {seasons.map((season) => (
            <tr key={season.slug} className={cn("border-t border-border", season.slug === activeSlug && "bg-sage-100/60")}>
              <th scope="row" className="px-4 py-4 align-top font-medium text-forest-900 md:px-5">
                <span className="flex flex-wrap items-center gap-2">
                  {season.label}
                  {season.slug === activeSlug ? (
                    <span className="rounded-full bg-forest-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-50">
                      aktuell
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted">{season.period}</span>
              </th>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">
                {season.restaurant.opens} – {season.restaurant.closes} Uhr
              </td>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">
                {season.takeaway.opens} – {season.takeaway.closes} Uhr
              </td>
              <td className="px-4 py-4 align-top tabular-nums md:px-5">bis {season.kitchenUntil} Uhr</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-border sm:hidden">
        {seasons.map((season) => (
          <li key={season.slug} className={cn("px-5 py-4", season.slug === activeSlug && "bg-sage-100/60")}>
            <p className="flex flex-wrap items-center gap-2 font-medium text-forest-900">
              {season.label}
              {season.slug === activeSlug ? (
                <span className="rounded-full bg-forest-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cream-50">
                  aktuell
                </span>
              ) : null}
            </p>
            <p className="text-xs text-muted">{season.period}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-muted">Restaurant</dt>
              <dd className="tabular-nums">{season.restaurant.opens} – {season.restaurant.closes} Uhr</dd>
              <dt className="text-muted">Abholservice</dt>
              <dd className="tabular-nums">{season.takeaway.opens} – {season.takeaway.closes} Uhr</dd>
              <dt className="text-muted">Küche</dt>
              <dd className="tabular-nums">bis {season.kitchenUntil} Uhr</dd>
            </dl>
          </li>
        ))}
      </ul>

      {note ? <p className="border-t border-border px-5 py-3 text-xs leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}

/** Kurzfassung für Fußzeile und Randspalten. */
export function HoursCompact({ seasons, className }: { seasons: Season[]; className?: string }) {
  return (
    <dl className={cn("space-y-3 text-sm", className)}>
      {seasons.map((season) => (
        <div key={season.slug}>
          <dt className="font-medium">
            {season.label} <span className="font-normal opacity-70">· {season.period}</span>
          </dt>
          <dd className="tabular-nums opacity-80">
            Restaurant {season.restaurant.opens} – {season.restaurant.closes} Uhr · Küche bis {season.kitchenUntil} Uhr
          </dd>
        </div>
      ))}
    </dl>
  );
}
