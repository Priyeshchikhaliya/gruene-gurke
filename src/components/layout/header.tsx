import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { navLinks, routes } from "@/lib/routes";
import { getSettings } from "@/lib/data/content";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

export async function Header() {
  const settings = await getSettings();
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream-50/90 backdrop-blur-md">
      {/* The running order line from the current site, kept as a thin banner. */}
      <p className="bg-forest-800 px-4 py-2 text-center text-[11px] font-medium tracking-wide text-cream-50 sm:text-xs">
        {settings.banner_text}{" "}
        <a href={siteConfig.phone.href} className="underline underline-offset-2 hover:text-gold-400">
          {siteConfig.phone.display}
        </a>
      </p>

      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
        <Link href={routes.home} className="flex shrink-0 items-center" aria-label={`${siteConfig.name} – Startseite`}>
          <Image
            src={siteConfig.images.logo}
            alt=""
            width={400}
            height={380}
            priority
            className="h-10 w-auto sm:h-12 md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-ink-700 transition-colors hover:text-forest-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 sm:flex xl:gap-5">
          <a
            href={siteConfig.phone.href}
            className="hidden items-center gap-2 text-sm font-medium text-forest-900 hover:text-forest-700 xl:flex"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone.display}
          </a>
          <Link href={routes.reservation} className={buttonStyles({ size: "md" })}>
            Reservieren
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
