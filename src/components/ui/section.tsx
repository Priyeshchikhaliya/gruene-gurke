import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("container-site py-20 md:py-28", className)}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-forest-700">{eyebrow}</p>
      ) : null}
      <h1 className="font-display text-5xl leading-[1.05] text-forest-900 md:text-6xl">{title}</h1>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}
