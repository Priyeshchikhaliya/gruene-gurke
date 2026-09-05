"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div role="group" aria-label={t("language")} className={cn("flex items-center gap-1 text-xs tracking-widest", className)}>
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 ? <span className="mx-1 text-ink-400">/</span> : null}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={code === locale ? "true" : undefined}
            className={cn(
              "rounded px-1 py-0.5 uppercase transition-colors",
              code === locale ? "text-forest-900" : "text-ink-400 hover:text-forest-900",
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
