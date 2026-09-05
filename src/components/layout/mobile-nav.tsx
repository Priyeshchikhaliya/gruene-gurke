"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";

export type NavLink = { href: string; label: string };

export function MobileNav({
  links,
  reserveLabel,
  openLabel,
  closeLabel,
}: {
  links: NavLink[];
  reserveLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-forest-900"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col bg-cream-50 px-5 pb-8 pt-6"
      >
        <nav className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="border-b border-border py-4 font-display text-3xl text-forest-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between gap-4">
          <LocaleSwitcher />
          <Link href="/reservations" onClick={close} className={buttonStyles({ size: "md" })}>
            {reserveLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
