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
        <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:items-end">
          <Link href={routes.reservation} className={buttonStyles({ variant: "light", size: "lg" })}>
            Tisch reservieren
          </Link>
          <p className="text-sm text-cream-100/70">
            Lieber telefonisch?{" "}
            <a href={siteConfig.phone.href} className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-cream-50">
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
