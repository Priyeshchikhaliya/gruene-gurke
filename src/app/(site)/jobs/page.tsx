import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mail } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/section";
import { getJobs, getSettings } from "@/lib/data/content";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Die Grüne Gurke in Wernigerode sucht Koch (w/m/d) und Beikoch (w/m/d) – ab sofort in Vollzeit, Teilzeit oder Pauschal.",
  alternates: { canonical: routes.jobs },
};

export const revalidate = 600;

export default async function JobsPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSettings()]);
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow>Aktuelle Jobangebote</Eyebrow>
          <h1 className="font-display text-4xl leading-[1.05] text-forest-900 text-balance sm:text-5xl md:text-6xl">
            {settings.jobs_intro}
          </h1>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {jobs.postings.map((role) => (
              <li key={role.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="font-display text-2xl text-forest-900 sm:text-3xl">{role.title}</span>
                <span className="text-sm text-muted">{role.terms}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-forest-700">Wir bieten</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {jobs.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-forest-900">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                  <Check className="h-4 w-4" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-cream-100 p-5 sm:p-6 md:p-8">
            <h2 className="font-display text-2xl text-forest-900">Bewerbung</h2>
            <p className="mt-2 text-sm text-muted">
              Bewerbungen bitte an{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-forest-800 underline underline-offset-4">
                {siteConfig.email}
              </a>{" "}
              oder an:
            </p>
            <address className="mt-3 whitespace-pre-line text-sm not-italic leading-relaxed text-ink-700">
              {settings.jobs_application_address}
            </address>
            <a href={`mailto:${siteConfig.email}`} className={buttonStyles({ className: "mt-6 w-full sm:w-fit" })}>
              <Mail className="h-4 w-4" /> Per E-Mail bewerben
            </a>
          </div>
        </div>

        <div className="relative order-first aspect-[16/10] overflow-hidden rounded-3xl lg:order-last lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src={siteConfig.images.jobs}
            alt="Besteck mit rot-weißem Band und Logo der Grünen Gurke"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
