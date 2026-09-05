"use client";

import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { Button, buttonStyles } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Die Karte wird erst nach Einwilligung geladen: Der Aufruf überträgt die
 * IP-Adresse an Google und ist damit nach § 25 TDDDG einwilligungspflichtig.
 * Bewusst nicht gespeichert – die Einwilligung gilt pro Besuch.
 */
export function ConsentMap({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}>
      {loaded ? (
        <iframe
          title="Google Maps: Veckenstedter Weg 63, 38855 Wernigerode"
          src={siteConfig.mapsEmbedUrl}
          className="h-full min-h-[20rem] w-full border-0 sm:min-h-[26rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-full min-h-[20rem] flex-col justify-between gap-6 bg-sage-100 p-6 sm:min-h-[26rem] sm:gap-8 sm:p-8">
          <div>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-cream-50">
              <MapPin className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl leading-tight text-forest-900">
              Datenschutzhinweis zur Darstellung der Karte
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-700">
              Google verwendet ggf. Cookies zur Darstellung der Karte. Klicken Sie hier, wenn Sie diese Erklärung
              gelesen und verstanden haben.
            </p>
          </div>

          <address className="select-text text-base not-italic leading-relaxed text-forest-900">
            <span className="block font-medium">{siteConfig.name}</span>
            <span className="block text-muted">{siteConfig.address.street}</span>
            <span className="block text-muted">
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </span>
          </address>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button onClick={() => setLoaded(true)}>Karte laden</Button>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className={buttonStyles({ variant: "outline" })}>
              Route planen <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href={routes.privacy}
              className="-my-1 py-1 text-sm text-muted underline underline-offset-4 hover:text-forest-800"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
