import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export function CtaBand({ title, text }: { title: string; text?: string }) {
  return (
    <section className="bg-forest-800 text-cream-50">
      <div className="container-site flex flex-col items-start gap-6 py-12 sm:gap-8 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">{title}</h2>
          {text ? <p className="mt-3 text-sm text-cream-100/80 sm:text-base">{text}</p> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link href={routes.reservation} className={buttonStyles({ variant: "light", size: "lg" })}>
            Tisch reservieren
          </Link>
          <a href={siteConfig.phone.href} className={buttonStyles({ variant: "outlineLight", size: "lg" })}>
            <Phone className="h-4 w-4" />
            {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
