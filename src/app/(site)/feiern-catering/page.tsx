import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { galleryImages } from "@/lib/gallery";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feiern & Catering",
  description:
    "Feiern Sie doch mal bei uns! Verschiedene Räume für Familien- und Betriebsfeiern sowie Partyservice mit kalten Platten, warmen Speisen, Salatvariationen und Buffets.",
  alternates: { canonical: routes.events },
};

const pick = (srcs: string[]) => srcs.map((s) => galleryImages.find((i) => i.src === s)!);

function Collage({ images }: { images: ReturnType<typeof pick> }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
        <Image src={images[0].src} alt={images[0].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      {images.slice(1).map((img) => (
        <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export default function EventsPage() {
  const rooms = pick(["/images/restaurant/room-31.jpg", "/images/restaurant/room-36.jpg", "/images/restaurant/terrace.jpg"]);
  const catering = pick(["/images/catering/catering-22.jpg", "/images/catering/catering-20.jpg", "/images/catering/catering-32.jpg"]);

  return (
    <>
      <Section className="pb-6 sm:pb-8">
        <SectionHeading
          title="Feiern Sie doch mal bei uns! Oder nutzen Sie unseren Partyservice!"
          intro="Wir beraten Sie gern und können Ihnen aus einem reichhaltigen Sortiment ein maßgeschneidertes Angebot erstellen. Sie brauchen sich nur zu entscheiden und die Feier kann starten, um den Rest kümmern wir uns!"
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
          <FadeIn delay={0.1}>
            <Collage images={rooms} />
          </FadeIn>
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
            <Collage images={catering} />
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
