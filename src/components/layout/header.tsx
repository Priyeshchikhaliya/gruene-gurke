import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav, type NavLink } from "./mobile-nav";

export async function Header() {
  const t = await getTranslations("nav");

  const links: NavLink[] = [
    { href: "/menu", label: t("menu") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream-50/85 backdrop-blur-md">
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight text-forest-900">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-ink-700 transition-colors hover:text-forest-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <Link href="/reservations" className={buttonStyles({ size: "md" })}>
            {t("reserve")}
          </Link>
        </div>

        <MobileNav
          links={links}
          reserveLabel={t("reserve")}
          openLabel={t("openMenu")}
          closeLabel={t("closeMenu")}
        />
      </div>
    </header>
  );
}
