import type { Metadata } from "next";
import { FileText, Phone } from "lucide-react";
import { MenuSections } from "@/components/menu/menu-sections";
import { buttonStyles } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Die Speisekarte der Grünen Gurke in Wernigerode: Suppen, Salate, Schnitzelparadies, Fleischgerichte, Kindergerichte und Desserts. Alle Gerichte auch zum Mitnehmen und Abholen.",
  alternates: { canonical: routes.menu },
};

/** Hinweise wortgleich aus der gedruckten Karte, Seite „Das sei noch angemerkt“. */
const notes = [
  "Alle Gerichte gibt es auch zum Mitnehmen.",
  "Beilagenwechsel oder Extrawünsche kosten extra.",
  "Die meisten Gerichte gibt es auch als Seniorenteller. Etwas kleinere Portionen, 1,90 € Preisnachlass.",
  "Alle Preise verstehen sich incl. 19 % Mehrwertsteuer.",
  "Wir haben täglich ab 11.00 Uhr geöffnet, mit Ausnahme von Heiligabend. Am 1. und 2. Weihnachtsfeiertag nur bis 15:00 Uhr.",
];

export default function MenuPage() {
  return (
    <>
      <Section className="pb-8 sm:pb-10 md:pb-12">
        <SectionHeading
          title="Speisekarte"
          intro="Suppen, Vorspeisen, Eiergerichte, Nudelgerichte, Salate, Geflügelgerichte, Fleischgerichte, Pfannengerichte, Schnitzelparadies, Dessert und Eis, Knabberzeug, Kindergerichte und Spargelgerichte."
        />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          <a
            href={siteConfig.menuPdf}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-lg sm:gap-5 sm:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800 sm:h-12 sm:w-12">
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl text-forest-900 sm:text-2xl">
                Aktuelle Speisekarte ansehen ({siteConfig.menuYear})
              </span>
              <span className="mt-1 block text-sm text-muted">Die gedruckte Karte als PDF.</span>
              <span className="mt-3 inline-block text-sm font-medium text-forest-800 underline-offset-4 group-hover:underline">
                PDF öffnen
              </span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-2xl bg-forest-800 p-5 text-cream-50 sm:gap-5 sm:p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-50/10 sm:h-12 sm:w-12">
              <Phone className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl sm:text-2xl">Essen bestellen in Wernigerode</p>
              <p className="mt-1 text-sm text-cream-100/80">
                Alle Gerichte und Getränke auch zum Abholen und Mitnehmen! Aufgrund der aktuellen Situation sind ggf.
                nicht alle Gerichte verfügbar.
              </p>
              <a
                href={siteConfig.phone.href}
                className={buttonStyles({ variant: "light", size: "sm", className: "mt-4 w-full sm:w-fit" })}
              >
                Bestell-Hotline: {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <MenuSections />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
            <h2 className="font-display text-2xl text-forest-900">Das sei noch angemerkt</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-700">
              {notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-cream-100 p-5 sm:p-6 md:p-8">
            <h2 className="font-display text-2xl text-forest-900">Hier steckt unsere Saisonkarte</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              …zur Osterzeit, …zur Spargelzeit, …zur Grünkohlzeit, …zur Weihnachtszeit. Lassen Sie sich überraschen!
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Bestellungen und Reservierungen unter 03943 634256"
        text="Alle Gerichte und Getränke auch zum Abholen und Mitnehmen."
      />
    </>
  );
}
