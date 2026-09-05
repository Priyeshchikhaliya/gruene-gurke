import Link from "next/link";
import { CalendarCheck, Clock, Images, Mail, Type, UtensilsCrossed, Users } from "lucide-react";
import { AdminHeading, Card } from "@/components/admin/ui";
import { adminCounts } from "@/lib/data/admin";

export default async function AdminHome() {
  const counts = await adminCounts();

  const tiles = [
    {
      href: "/admin/reservierungen",
      icon: CalendarCheck,
      title: "Reservierungen",
      value: `${counts.openReservations} offen`,
      text: "Anfragen ansehen, bestätigen oder absagen.",
    },
    {
      href: "/admin/nachrichten",
      icon: Mail,
      title: "Nachrichten",
      value: `${counts.unreadMessages} ungelesen`,
      text: "Nachrichten aus dem Kontaktformular.",
    },
    {
      href: "/admin/oeffnungszeiten",
      icon: Clock,
      title: "Öffnungszeiten",
      value: "Sommer & Winter",
      text: "Zeiten für Restaurant, Abholung und Küche.",
    },
    {
      href: "/admin/speisekarte",
      icon: UtensilsCrossed,
      title: "Speisekarte",
      value: `${counts.dishes} Gerichte`,
      text: "Gerichte, Preise und Kategorien pflegen.",
    },
    {
      href: "/admin/galerie",
      icon: Images,
      title: "Galerie",
      value: `${counts.photos} Bilder`,
      text: "Bilder hochladen, beschriften und sortieren.",
    },
    {
      href: "/admin/jobs",
      icon: Users,
      title: "Jobs",
      value: `${counts.jobs} Stellen`,
      text: "Offene Stellen und Vorteile bearbeiten.",
    },
    {
      href: "/admin/texte",
      icon: Type,
      title: "Texte",
      value: "Hinweise & Einleitungen",
      text: "Kurze Texte, die an mehreren Stellen erscheinen.",
    },
  ];

  return (
    <>
      <AdminHeading
        title="Übersicht"
        description="Hier ändern Sie die Inhalte der Website. Alles, was Sie speichern, ist sofort öffentlich sichtbar."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="group rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-800">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl text-forest-900">{tile.title}</h2>
              <p className="mt-1 text-sm font-medium text-forest-700">{tile.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tile.text}</p>
            </Link>
          );
        })}
      </div>

      <Card className="mt-6" title="Kurz erklärt">
        <ul className="space-y-2 text-sm leading-relaxed text-ink-700">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            Jede Änderung wird erst mit einem Klick auf <strong>Speichern</strong> übernommen.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            Mit den Pfeilen ▲ ▼ ändern Sie die Reihenfolge auf der Website.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            <span>
              Gelöschtes lässt sich nicht zurückholen. Wollen Sie etwas nur vorübergehend verstecken, nehmen Sie den
              Haken bei <strong>Auf der Website zeigen</strong> heraus.
            </span>
          </li>
        </ul>
      </Card>
    </>
  );
}
