import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <section className="container-site flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24">
        <FadeIn>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-forest-700">{t("eyebrow")}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display text-7xl leading-[0.95] tracking-tight text-forest-900 sm:text-8xl lg:text-[9rem]">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{t("subtitle")}</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/reservations" className={buttonStyles({ size: "lg" })}>
              {t("ctaReserve")}
            </Link>
            <Link href="/menu" className={buttonStyles({ variant: "outline", size: "lg" })}>
              {t("ctaMenu")}
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-border bg-cream-100">
        <div className="container-site grid gap-10 py-16 md:grid-cols-2">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-forest-700">{t("addressTitle")}</p>
            <p className="mt-3 font-display text-2xl text-forest-900">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xs uppercase tracking-[0.25em] text-forest-700">{t("hoursTitle")}</p>
            {/* Opening hours will be read from Supabase once the admin area lands. */}
            <p className="mt-3 font-display text-2xl text-forest-900">Di – So · 17:00 – 23:00</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
