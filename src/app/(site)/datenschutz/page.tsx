import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";
import { Section, SectionHeading } from "@/components/ui/section";
import { datenschutz } from "@/lib/legal";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: routes.privacy },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading title="Datenschutzerklärung" />
      <div className="mt-8 sm:mt-10">
        <LegalContent blocks={datenschutz} />
      </div>
    </Section>
  );
}
