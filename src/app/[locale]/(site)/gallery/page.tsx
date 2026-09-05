import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("title"), description: t("intro") };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  return (
    <Section>
      <SectionHeading title={t("title")} intro={t("intro")} />
      <p className="mt-16 rounded-xl border border-dashed border-border p-10 text-center text-muted">{t("comingSoon")}</p>
    </Section>
  );
}
