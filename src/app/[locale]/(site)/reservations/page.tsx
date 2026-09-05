import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReservationForm } from "@/components/forms/reservation-form";
import { Section, SectionHeading } from "@/components/ui/section";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservations" });
  return { title: t("title"), description: t("intro") };
}

export default async function ReservationsPage() {
  const t = await getTranslations("reservations");
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading title={t("title")} intro={t("intro")} />
        <ReservationForm />
      </div>
    </Section>
  );
}
