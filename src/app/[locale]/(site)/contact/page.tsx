import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/forms/contact-form";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("intro") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading title={t("title")} intro={t("intro")} />
          <dl className="mt-12 grid gap-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">{t("details.address")}</dt>
              <dd className="mt-1 text-base text-foreground">
                <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">{t("details.phone")}</dt>
              <dd className="mt-1 text-base">
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:underline">{siteConfig.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-forest-700">{t("details.email")}</dt>
              <dd className="mt-1 text-base">
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
