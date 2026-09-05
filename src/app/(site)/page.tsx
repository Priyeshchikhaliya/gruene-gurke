import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { RestaurantJsonLd } from "@/components/seo/json-ld";
import { buttonStyles } from "@/components/ui/button";
import { ConsentMap } from "@/components/ui/consent-map";
import { CtaBand } from "@/components/ui/cta-band";
import { FadeIn } from "@/components/ui/fade-in";
import { HoursTable } from "@/components/ui/hours-table";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { currentSeasonSlug, getGallery, getJobs, getSeasons, getSettings } from "@/lib/data/content";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

/** Nur Angaben von der bisherigen Website und aus der Speisekarte (Seite 1). */
const facts = [
  "Alle Gerichte auch zum Mitnehmen und Abholen",
  "Partyservice (kalte Platten, warme Speisen, hausgemachte Salate, tolle Buffets)",
  "Verschiedene Räume für Familien- und Betriebsfeiern etc.",
  "Getränkeangebot auch außer Haus",
  "Täglich ab 11 Uhr geöffnet",
];

const teaserSrcs = [
  "/images/restaurant/terrace.jpg",
  "/images/restaurant/room-42.jpg",
  "/images/catering/catering-20.jpg",
  "/images/restaurant/room-36.jpg",
  "/images/catering/catering-17.jpg",
  "/images/catering/catering-1.jpg",
];

export const revalidate = 600;

export default async function HomePage() {
  const [settings, seasons, gallery, jobs] = await Promise.all([
    getSettings(),
    getSeasons(),
    getGallery(),
    getJobs(),
  ]);

  // Teaser-Bilder: bevorzugt die gewünschten Motive, sonst einfach die ersten.
  const preferred = teaserSrcs.map((src) => gallery.find((img) => img.url === src)).filter((img) => img !== undefined);
  const teaser = (preferred.length >= 6 ? preferred : gallery).slice(0, 6);
  const activeSeason = currentSeasonSlug(seasons);

  return (
    <>
      <RestaurantJsonLd />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-cream-50">
        <Image
          src={siteConfig.images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/65 to-forest-950/30" />
        <div className="container-site relative flex min-h-[34rem] flex-col justify-end py-16 sm:min-h-[38rem] sm:py-20 lg:min-h-[calc(100svh-7.5rem)] lg:py-24">
          <FadeIn>
            <Eyebrow className="text-gold-400">Gaststätte & Vereinsheim · Wernigerode</Eyebrow>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl xl:text-[8.5rem]">
              Grüne Gurke
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-3 font-display text-2xl italic text-cream-200 sm:mt-4 sm:text-3xl md:text-4xl">
              …da schmeckt&rsquo;s!
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/85 sm:mt-6 sm:text-lg md:text-xl">
              Die „Grüne Gurke“ ist ein Vereinsheim und eine gutbürgerliche Gaststätte für jedermann.
            </p>
          </FadeIn>
          <FadeIn delay={0.32}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Link href={routes.reservation} className={buttonStyles({ variant: "light", size: "lg" })}>
                Tisch reservieren
              </Link>
              <Link href={routes.menu} className={buttonStyles({ variant: "outlineLight", size: "lg" })}>
                Zur Speisekarte
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Auf einen Blick */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <FadeIn>
            <Eyebrow>Grüne Gurke – Wernigerode</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 text-balance sm:text-4xl md:text-5xl">
              Ein Vereinsheim und eine gutbürgerliche Gaststätte für jedermann.
            </h2>
            <ul className="mt-8 space-y-3">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-xl italic text-forest-800 sm:text-2xl">
              Wir wünschen unseren Gästen einen angenehmen Aufenthalt!
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl bg-sage-100 sm:-left-4 sm:-top-4" aria-hidden="true" />
            <Image
              src={siteConfig.images.exterior}
              alt="Eingang der Gaststätte Grüne Gurke"
              width={600}
              height={360}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="relative w-full rounded-2xl object-cover shadow-sm"
            />
          </FadeIn>
        </div>
      </Section>

      {/* Speisekarte & Bestellen */}
      <section className="bg-cream-100 py-12 sm:py-16 md:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-display text-3xl text-forest-900 sm:text-4xl">Speisekarte</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{settings.menu_intro}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Die meisten Gerichte gibt es auch als Seniorenteller. Etwas kleinere Portionen, 1,90 € Preisnachlass.
                Alle Preise verstehen sich incl. Mehrwertsteuer.
              </p>
              <Link href={routes.menu} className={buttonStyles({ className: "mt-8 w-full sm:w-fit" })}>
                Zur Speisekarte <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl bg-forest-800 p-6 text-cream-50 sm:p-8">
              <h2 className="font-display text-3xl sm:text-4xl">Essen bestellen in Wernigerode</h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-100/85 sm:text-base">{settings.order_note}</p>
              <a
                href={siteConfig.phone.href}
                className={buttonStyles({ variant: "light", className: "mt-8 w-full sm:w-fit" })}
              >
                <Phone className="h-4 w-4" />
                Bestell-Hotline: {siteConfig.phone.display}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Öffnungszeiten */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <FadeIn>
            <Eyebrow>Öffnungszeiten</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl md:text-5xl">
              Allgemeine Öffnungszeiten
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <HoursTable seasons={seasons} activeSlug={activeSeason} note={settings.hours_note} />
          </FadeIn>
        </div>
      </Section>

      {/* Feiern & Galerie */}
      <section className="bg-forest-950 py-12 text-cream-50 sm:py-16 md:py-24">
        <div className="container-site">
          <FadeIn>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                as="h2"
                size="md"
                tone="light"
                eyebrow="Galerie"
                title="Feiern Sie doch mal bei uns! Oder nutzen Sie unseren Partyservice!"
              />
              <Link href={routes.gallery} className={buttonStyles({ variant: "outlineLight" })}>
                Zur Galerie <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 md:grid-cols-3 md:gap-5">
            {teaser.map((img, i) => (
              <li key={img.url} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <FadeIn delay={i * 0.05} className="h-full">
                  <Link href={routes.gallery} className="group relative block h-full min-h-32 overflow-hidden rounded-xl sm:min-h-40">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Jobs */}
      <Section>
        <FadeIn>
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-cream-100 lg:grid-cols-2 lg:gap-10">
            <div className="p-6 sm:p-8 md:p-12">
              <Eyebrow>Aktuelle Jobangebote</Eyebrow>
              <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl">{settings.jobs_intro}</h2>
              {jobs.postings.length > 0 ? (
                <p className="mt-4 text-muted">
                  {jobs.postings.map((job) => job.title).join(" und ")} – {jobs.postings[0].terms}.
                </p>
              ) : null}
              <Link href={routes.jobs} className={buttonStyles({ className: "mt-8 w-full sm:w-fit" })}>
                Zu den Jobangeboten <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative order-first aspect-[16/10] lg:order-last lg:h-full">
              <Image
                src={siteConfig.images.jobs}
                alt="Besteck mit rot-weißem Band und Logo der Grünen Gurke"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Anfahrt */}
      <section className="bg-cream-100 py-12 sm:py-16 md:py-24">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <FadeIn>
            <Eyebrow>Anfahrt & Parken</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl">So finden Sie uns</h2>
            <p className="mt-4 text-muted">
              Unser Restaurant „Grüne Gurke“ finden Sie im Veckenstedter Weg 63, 38855 Wernigerode. Vielzählige
              Parkplätze sind vorhanden.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ConsentMap />
          </FadeIn>
        </div>
      </section>

      <CtaBand
        title="Reservieren Sie Ihren Tisch"
        text="In wenigen Schritten online. Wir bestätigen Ihre Anfrage persönlich per E-Mail."
      />
    </>
  );
}
