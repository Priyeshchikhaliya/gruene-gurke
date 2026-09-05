import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";
import { Section, SectionHeading } from "@/components/ui/section";
import { impressum } from "@/lib/legal";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: routes.imprint },
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <Section>
      <SectionHeading title="Impressum" />
      <div className="mt-8 sm:mt-10">
        <LegalContent blocks={impressum} />
      </div>
    </Section>
  );
}
