import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

/**
 * Admin area placeholder. Will be protected by Supabase Auth (see
 * supabase/migrations/0001_init.sql → admin_users) and host CRUD for
 * reservations, menu, opening hours and gallery.
 */
export default async function AdminPage() {
  const t = await getTranslations("admin");
  return (
    <main className="container-site flex flex-1 flex-col items-center justify-center py-32 text-center">
      <h1 className="font-display text-5xl text-forest-900">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("comingSoon")}</p>
    </main>
  );
}
