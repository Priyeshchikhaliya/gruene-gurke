import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="container-site flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-forest-700">404</p>
      <h1 className="font-display text-5xl text-forest-900">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("description")}</p>
      <Link href="/" className={buttonStyles({ variant: "outline", className: "mt-10" })}>
        {t("backHome")}
      </Link>
    </main>
  );
}
