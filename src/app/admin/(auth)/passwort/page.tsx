import type { Metadata } from "next";
import Image from "next/image";
import { PasswordForm } from "@/components/admin/password-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Passwort setzen",
  robots: { index: false, follow: false },
};

export default function PasswordPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-cream-100 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src={siteConfig.images.logo} alt="" width={400} height={380} className="h-16 w-auto" />
          <h1 className="mt-5 font-display text-3xl text-forest-900">Passwort festlegen</h1>
          <p className="mt-2 text-sm text-muted">
            Wählen Sie ein Passwort für den Verwaltungsbereich. Mindestens acht Zeichen.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <PasswordForm />
        </div>
      </div>
    </main>
  );
}
