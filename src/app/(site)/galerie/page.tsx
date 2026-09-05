import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaBand } from "@/components/ui/cta-band";
import { Section, SectionHeading } from "@/components/ui/section";
import { getGallery, getSettings } from "@/lib/data/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Bilder aus der Grünen Gurke Wernigerode: Restaurant, Sommerterasse und Buffets vom Partyservice für Feierlichkeiten und Catering.",
  alternates: { canonical: routes.gallery },
};

export const revalidate = 600;

export default async function GalleryPage() {
  const [photos, settings] = await Promise.all([getGallery(), getSettings()]);

  const toGrid = (category: "restaurant" | "catering") =>
    photos
      .filter((img) => img.category === category)
      .map((img) => ({ src: img.url, width: img.width ?? 1200, height: img.height ?? 900, alt: img.alt }));

  return (
    <>
      <Section className="pb-4 sm:pb-6">
        <SectionHeading
          title="Galerie – Grüne Gurke"
          intro={`Feiern Sie doch mal bei uns! Oder nutzen Sie unseren Partyservice! ${settings.events_intro}`}
        />
      </Section>

      <Section id="restaurant" className="pt-6 sm:pt-8">
        <SectionHeading
          as="h2"
          size="md"
          title="Restaurant & Sommerterasse"
          intro="Verschiedene Räume für Familien- und Betriebsfeiern etc."
        />
        <GalleryGrid images={toGrid("restaurant")} className="mt-8 sm:mt-10" />
      </Section>

      <Section id="catering" className="border-t border-border">
        <SectionHeading
          as="h2"
          size="md"
          title="Leckeres für Feierlichkeiten & Catering"
          intro="Partyservice (kalte Platten, warme Speisen, Salatvariationen, tolle Buffet’s)."
        />
        <GalleryGrid images={toGrid("catering")} className="mt-8 sm:mt-10" />
      </Section>

      <CtaBand
        title="Reservieren Sie Ihren Tisch"
        text="Ob Familienfeier oder Abendessen zu zweit: Reservieren Sie bequem online."
      />
    </>
  );
}
