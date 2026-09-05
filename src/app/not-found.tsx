import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <main className="container-site flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-32">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-forest-700">404</p>
      <h1 className="font-display text-4xl text-forest-900 sm:text-5xl">Seite nicht gefunden</h1>
      <p className="mt-4 text-muted">Diese Seite gibt es nicht – oder nicht mehr.</p>
      <Link href={routes.home} className={buttonStyles({ variant: "outline", className: "mt-10" })}>
        Zur Startseite
      </Link>
    </main>
  );
}
