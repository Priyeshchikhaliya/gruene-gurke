import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { getGallery, getSettings, type GalleryPhoto } from "@/lib/data/content";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feiern & Catering",
  description:
    "Feiern Sie doch mal bei uns! Verschiedene Räume für Familien- und Betriebsfeiern sowie Partyservice mit kalten Platten, warmen Speisen, Salatvariationen und Buffets.",
  alternates: { canonical: routes.events },
};

function Collage({ images }: { images: GalleryPhoto[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
        <Image src={images[0].url} alt={images[0].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      {images.slice(1).map((img) => (
        <div key={img.url} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={img.url} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export const revalidate = 600;

export default async function EventsPage() {
  const [photos, settings] = await Promise.all([getGallery(), getSettings()]);
  const rooms = photos.filter((img) => img.category === "restaurant").slice(0, 3);
  const catering = photos.filter((img) => img.category === "catering").slice(0, 3);

  return (
    <>
      <Section className="pb-6 sm:pb-8">
        <SectionHeading
          title="Feiern Sie doch mal bei uns! Oder nutzen Sie unseren Partyservice!"
          intro={settings.events_intro}
        />
      </Section>

      <Section className="pt-6 sm:pt-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <Eyebrow>Bei uns feiern</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl md:text-5xl">
              Restaurant & Sommerterasse
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Verschiedene Räume für Familien- und Betriebsfeiern etc.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>{rooms.length > 0 ? <Collage images={rooms} /> : null}</FadeIn>
        </div>
      </Section>

      <section className="bg-cream-100 py-12 sm:py-16 md:py-24">
        <div className="container-site grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="lg:order-2">
            <Eyebrow>Partyservice</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.1] text-forest-900 sm:text-4xl md:text-5xl">
              Leckeres für Feierlichkeiten & Catering
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Partyservice (kalte Platten, warme Speisen, Salatvariationen, tolle Buffet&rsquo;s). Getränkeangebot auch
              außer Haus.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:order-1">
            {catering.length > 0 ? <Collage images={catering} /> : null}
          </FadeIn>
        </div>
      </section>

      <section className="bg-forest-800 text-cream-50">
        <div className="container-site flex flex-col items-start gap-6 py-12 sm:gap-8 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
              Wir beraten Sie gern
            </h2>
            <p className="mt-3 text-sm text-cream-100/80 sm:text-base">Telefon: {siteConfig.phone.display}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a href={siteConfig.phone.href} className={buttonStyles({ variant: "light", size: "lg" })}>
              <Phone className="h-4 w-4" /> {siteConfig.phone.display}
            </a>
            <Link href={routes.contact} className={buttonStyles({ variant: "outlineLight", size: "lg" })}>
              Kontaktformular
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
