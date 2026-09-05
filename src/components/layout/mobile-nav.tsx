"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { navLinks, routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex items-center lg:hidden">
      <a
        href={siteConfig.phone.href}
        aria-label={`Anrufen: ${siteConfig.phone.display}`}
        className="flex h-11 w-11 items-center justify-center rounded-full text-forest-900 sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-forest-900"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto overscroll-contain bg-cream-50 px-5 pb-8 pt-4 sm:top-20"
      >
        <nav aria-label="Hauptnavigation">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block border-b border-border py-4 font-display text-2xl text-forest-900 sm:text-3xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
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
}
