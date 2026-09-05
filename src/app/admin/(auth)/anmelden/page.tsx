import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/env";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Anmelden",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  const { weiter } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-cream-100 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src={siteConfig.images.logo} alt="" width={400} height={380} className="h-16 w-auto" />
          <h1 className="mt-5 font-display text-3xl text-forest-900">Verwaltung</h1>
          <p className="mt-2 text-sm text-muted">Bitte melden Sie sich an, um Inhalte zu ändern.</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          {configured ? (
            <LoginForm weiter={weiter} />
          ) : (
            <div className="text-sm leading-relaxed text-ink-700">
              <p className="font-medium text-forest-900">Die Datenbank ist noch nicht eingerichtet.</p>
              <p className="mt-2">
                Sobald die Supabase-Zugangsdaten in <code className="rounded bg-cream-100 px-1">.env.local</code>{" "}
                eingetragen sind, können Sie sich hier anmelden. Die Website läuft solange mit den
                mitgelieferten Inhalten.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href={routes.home} className="text-muted underline underline-offset-4 hover:text-forest-800">
            Zurück zur Website
          </Link>
        </p>
      </div>
    </main>
  );
}
