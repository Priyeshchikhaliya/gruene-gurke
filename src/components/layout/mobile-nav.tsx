"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { navLinks, routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  /**
   * Wichtig: Der Kopfbereich darf keinen backdrop-filter tragen. Der macht
   * ihn zum Bezugsrahmen für alles mit position: fixed, und dieses Menü wäre
   * dann nur so hoch wie der Kopf selbst.
   *
   * Ein- und Ausblenden läuft über CSS statt über eine Animationsbibliothek:
   * Der Kopf steckt auf jeder Seite, eine Bibliothek dafür zu laden wäre auf
   * jeder Seite bezahlte Ladezeit für ein einziges Menü.
   */
  const panel = (
    <div
      id="mobile-nav"
      // Geschlossen ist das kein Dialog, sondern nur ein verstecktes Stück
      // Markup. Sonst meldet es sich bei Screenreadern dauerhaft als Fenster.
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label="Menü"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-cream-50 lg:hidden",
        "transition-[opacity,transform,visibility] duration-300 ease-out-expo motion-reduce:transition-none",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5 sm:h-20">
        <Link href={routes.home} onClick={close} aria-label={`${siteConfig.name} – Startseite`}>
          <Image src={siteConfig.images.logo} alt="" width={400} height={380} className="h-10 w-auto sm:h-12" />
        </Link>
        <button
          ref={closeButton}
          type="button"
          onClick={close}
          aria-label="Menü schließen"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-forest-900 hover:bg-cream-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav aria-label="Hauptnavigation" className="flex-1 overflow-y-auto overscroll-contain px-5 py-2">
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="block border-b border-border py-4 font-display text-2xl text-forest-900 transition-colors hover:text-forest-700 sm:text-3xl"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-border px-5 py-5">
        <div className="flex flex-col gap-3">
          <Link href={routes.reservation} onClick={close} className={buttonStyles({ size: "lg" })}>
            Tisch reservieren
          </Link>
          <a href={siteConfig.phone.href} className={buttonStyles({ variant: "outline", size: "lg" })}>
            <Phone className="h-4 w-4" />
            {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center lg:hidden">
      <a
        href={siteConfig.phone.href}
        aria-label={`Anrufen: ${siteConfig.phone.display}`}
        className="flex h-11 w-11 items-center justify-center rounded-full text-forest-900 hover:bg-cream-100 sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Menü öffnen"
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-forest-900 hover:bg-cream-100"
      >
        <Menu className="h-5 w-5" />
      </button>

      {panel}
    </div>
  );
}
