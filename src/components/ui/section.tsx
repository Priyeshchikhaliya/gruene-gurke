import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={cn("container-site py-12 sm:py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mb-3 text-xs font-medium uppercase tracking-[0.25em] text-forest-700 sm:mb-4", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h1",
  size = "lg",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "lg" | "md";
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow className={cn(light && "text-gold-400")}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "font-display leading-[1.05] tracking-tight text-balance [overflow-wrap:break-word] hyphens-auto",
          size === "lg" ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl md:text-5xl",
          light ? "text-cream-50" : "text-forest-900",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg", light ? "text-cream-100/80" : "text-muted")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
