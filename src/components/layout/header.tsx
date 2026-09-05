import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { navLinks, routes } from "@/lib/routes";
import { getSettings } from "@/lib/data/content";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

export async function Header() {
  const settings = await getSettings();
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream-50/90 backdrop-blur-md">
      {/* Schmale Leiste: online reservieren steht vorn, die Nummer bleibt
          für Bestellungen erreichbar. */}
      <div className="bg-forest-800 text-cream-50">
        <p className="container-site flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[11px] tracking-wide sm:text-xs">
          <Link href={routes.reservation} className="font-medium underline underline-offset-2 hover:text-gold-400">
            Tisch online reservieren
          </Link>
          <span aria-hidden="true" className="hidden text-cream-200/40 sm:inline">
            ·
          </span>
          <span className="text-cream-100/75">
            {settings.banner_text}{" "}
            <a href={siteConfig.phone.href} className="underline underline-offset-2 hover:text-gold-400">
              {siteConfig.phone.display}
            </a>
          </span>
        </p>
      </div>

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
          <Link href={routes.reservation} className={buttonStyles({ size: "md" })}>
            Tisch reservieren
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
