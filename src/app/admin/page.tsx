import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verwaltung",
  robots: { index: false, follow: false },
};

/**
 * Platzhalter. Der Verwaltungsbereich wird über Supabase Auth abgesichert
 * (siehe supabase/migrations/0001_init.sql → admin_users) und bekommt
 * Reservierungen, Speisekarte, Öffnungszeiten und Galerie.
 */
export default function AdminPage() {
  return (
    <main className="container-site flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-32">
      <h1 className="font-display text-4xl text-forest-900 sm:text-5xl">Verwaltung</h1>
      <p className="mt-4 text-muted">Der Verwaltungsbereich wird gerade eingerichtet.</p>
    </main>
  );
}
