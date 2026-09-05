"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Clock, LayoutDashboard, type LucideIcon, UtensilsCrossed, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/reservierungen", label: "Reservierungen", icon: CalendarCheck },
  { href: "/admin/oeffnungszeiten", label: "Öffnungszeiten", icon: Clock },
  { href: "/admin/speisekarte", label: "Speisekarte", icon: UtensilsCrossed },
  { href: "/admin/jobs", label: "Jobs", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Verwaltung" className="lg:sticky lg:top-6">
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors lg:rounded-lg",
                  active
                    ? "bg-forest-800 text-cream-50"
                    : "border border-border bg-surface text-ink-700 hover:text-forest-900 lg:border-transparent lg:bg-transparent lg:hover:bg-cream-200/60",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
