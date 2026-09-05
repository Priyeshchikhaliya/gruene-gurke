import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminHeading({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl text-forest-900 sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-surface p-5 sm:p-6", className)}>
      {title ? <h2 className="font-display text-xl text-forest-900 sm:text-2xl">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p> : null}
      <div className={cn(title || description ? "mt-5" : undefined)}>{children}</div>
    </section>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
      {children}
    </p>
  );
}

export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-border bg-cream-50 p-4 sm:p-5", className)}>{children}</div>;
}
