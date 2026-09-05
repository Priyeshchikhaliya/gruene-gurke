import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { ReservationForm } from "@/components/forms/reservation-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSeasons } from "@/lib/data/content";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tisch reservieren",
  description:
    "Reservieren Sie Ihren Tisch in der Grünen Gurke in Wernigerode – online oder telefonisch unter 03943 634256.",
  alternates: { canonical: routes.reservation },
};

export const revalidate = 600;

export default async function ReservationPage() {
  const seasons = await getSeasons();
  const openingInfo = seasons.map((season) => ({
    slug: season.slug,
    label: season.label,
    startMonth: season.startMonth,
    endMonth: season.endMonth,
    opens: season.restaurant.opens,
    kitchenUntil: season.kitchenUntil,
  }));

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHeading
            title="Tisch reservieren"
            intro="Senden Sie uns Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen."
          />
          <p className="mt-6 text-sm text-muted">
            Lieber telefonisch?{" "}
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center gap-1.5 font-medium text-forest-800 underline underline-offset-4 hover:text-forest-700"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phone.display}
            </a>
          </p>
          <div className="mt-8 rounded-2xl bg-cream-100 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-forest-700">Gut zu wissen</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-700">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                Täglich ab {seasons[0]?.restaurant.opens ?? "11:00"} Uhr geöffnet.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                Auch größere Gesellschaften können Sie hier anfragen.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                Ihre Anfrage ist erst mit unserer Bestätigung verbindlich.
              </li>
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <ReservationForm seasons={openingInfo} />
        </div>
      </div>
    </Section>
  );
}
