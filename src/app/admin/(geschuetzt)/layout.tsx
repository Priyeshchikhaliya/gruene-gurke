import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { signOut } from "@/actions/admin/session";
import { AdminNav } from "@/components/admin/nav";
import { requireAdmin } from "@/lib/auth";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

/** Der Verwaltungsbereich hängt an der Sitzung und wird nie vorgerendert. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Verwaltung", template: "%s · Verwaltung" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-svh flex-col bg-cream-100">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={siteConfig.images.logo} alt="" width={400} height={380} className="h-9 w-auto" />
            <span className="font-display text-xl text-forest-900">Verwaltung</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="hidden text-muted sm:inline">
              Angemeldet als <span className="text-forest-900">{user.name ?? user.email}</span>
            </span>
            <Link
              href={routes.home}
              className="inline-flex items-center gap-1.5 text-muted hover:text-forest-800"
              target="_blank"
            >
              Website ansehen <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-forest-900 hover:bg-cream-100"
              >
                <LogOut className="h-3.5 w-3.5" /> Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <AdminNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
