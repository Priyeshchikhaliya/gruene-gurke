import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { ConsentMap } from "@/components/ui/consent-map";
import { HoursCompact } from "@/components/ui/hours-table";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { getSeasons, getSettings } from "@/lib/data/content";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zur Grünen Gurke in Wernigerode: Telefon 03943 634256, info@gruene-gurke.com, Veckenstedter Weg 63. Anfahrt, Parken und Kontaktformular.",
  alternates: { canonical: routes.contact },
};

export const revalidate = 600;

export default async function ContactPage() {
  const [seasons, settings] = await Promise.all([getSeasons(), getSettings()]);

  return (
    <>
      <Section className="pb-6 sm:pb-8">
        <SectionHeading title="Kontakt" intro={settings.events_intro} />
      </Section>

      <Section className="pt-6 sm:pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl text-forest-900 sm:text-3xl">So erreichen Sie uns</h2>
            <dl className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">Adresse</dt>
                  <dd className="mt-1">
                    <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="text-forest-900 hover:underline">
                      {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">Telefon</dt>
                  <dd className="mt-1">
                    <a href={siteConfig.phone.href} className="text-forest-900 hover:underline">{siteConfig.phone.display}</a>
                    <span className="block text-sm text-muted">Bestellungen und Reservierungen</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">E-Mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${siteConfig.email}`} className="break-all text-forest-900 hover:underline">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <ExternalLink className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">Facebook</dt>
                  <dd className="mt-1">
                    <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="text-forest-900 hover:underline">
                      Grüne Gurke auf Facebook
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 rounded-2xl bg-cream-100 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-forest-700">Öffnungszeiten</p>
              <p className="mt-2 text-sm text-forest-900">Täglich ab 11 Uhr geöffnet</p>
              <HoursCompact seasons={seasons} className="mt-3 text-ink-700" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
            <h2 className="mb-6 font-display text-2xl text-forest-900 sm:text-3xl">Nachricht schreiben</h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      <section className="bg-cream-100 py-12 sm:py-16 md:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Anfahrt & Parken</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl">So finden Sie uns</h2>
            <p className="mt-4 text-muted">
              Unser Restaurant „Grüne Gurke“ finden Sie im Veckenstedter Weg 63, 38855 Wernigerode. Vielzählige
              Parkplätze sind vorhanden.
            </p>
          </div>
          <ConsentMap />
        </div>
      </section>
    </>
  );
}
