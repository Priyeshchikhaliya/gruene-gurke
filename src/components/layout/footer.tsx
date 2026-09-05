import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-forest-950 text-cream-100">
      <div className="container-site grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-cream-200/70">{t("footer.tagline")}</p>
        </div>

        <address className="text-sm not-italic leading-relaxed text-cream-200/80">
          <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-cream-50">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.city}
          </a>
          <br />
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="mt-3 inline-block hover:text-cream-50">
            {siteConfig.phone}
          </a>
          <br />
          <a href={`mailto:${siteConfig.email}`} className="hover:text-cream-50">
            {siteConfig.email}
          </a>
        </address>

        <nav className="flex flex-col gap-2 text-sm text-cream-200/80" aria-label="Footer">
          <Link href="/menu" className="hover:text-cream-50">{t("nav.menu")}</Link>
          <Link href="/gallery" className="hover:text-cream-50">{t("nav.gallery")}</Link>
          <Link href="/reservations" className="hover:text-cream-50">{t("nav.reserve")}</Link>
          <Link href="/contact" className="hover:text-cream-50">{t("nav.contact")}</Link>
        </nav>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-cream-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t("footer.rights")}
          </p>
          <p className="flex gap-4">
            <span>{t("footer.imprint")}</span>
            <span>{t("footer.privacy")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
