import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HoursCompact } from "@/components/ui/hours-table";
import { getSeasons } from "@/lib/data/content";
import { navLinks, routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const year = new Date().getFullYear();
  const seasons = await getSeasons();

  return (
    <footer className="mt-auto bg-forest-950 text-cream-100">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.2fr_1fr_1.2fr_0.8fr] lg:py-16">
        <div>
          <div className="inline-block rounded-2xl bg-cream-50 p-2">
            <Image src={siteConfig.images.logo} alt={siteConfig.name} width={400} height={380} className="h-14 w-auto sm:h-16" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-200/70">
            Vereinsheim und gutbürgerliche Gaststätte für jedermann.
          </p>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-cream-200/80 hover:text-cream-50"
          >
            Facebook <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-400">Kontakt</p>
          <address className="text-sm not-italic leading-relaxed text-cream-200/80">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-cream-50">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </a>
            <br />
            <a href={siteConfig.phone.href} className="mt-3 inline-block hover:text-cream-50">
              {siteConfig.phone.display}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-cream-50">
              {siteConfig.email}
            </a>
          </address>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-400">Öffnungszeiten</p>
          <p className="mb-3 text-sm text-cream-200/80">Täglich ab 11 Uhr geöffnet</p>
          <HoursCompact seasons={seasons} className="text-cream-200/80" />
        </div>

        <nav aria-label="Fußzeile">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-400">Seiten</p>
          <ul className="flex flex-col gap-2 text-sm text-cream-200/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cream-50">{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href={routes.reservation} className="hover:text-cream-50">Tisch reservieren</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-cream-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Grüne Gurke / {siteConfig.legalName}</p>
          <p className="flex gap-5">
            <Link href={routes.imprint} className="hover:text-cream-50">Impressum</Link>
            <Link href={routes.privacy} className="hover:text-cream-50">Datenschutz</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
