/**
 * Inhalte, die im Verwaltungsbereich gepflegt werden. Diese Datei ist die
 * Startbefüllung der Datenbank (siehe scripts/generate-seed.mjs) und
 * gleichzeitig die Rückfallebene, solange keine Datenbank verbunden ist.
 * Alle Texte stammen von gruene-gurke.com bzw. aus der gedruckten Karte.
 */
export type JobPosting = { title: string; terms: string };

export const jobPostings: JobPosting[] = [
  { title: "Koch (w/m/d)", terms: "ab sofort in Vollzeit / Teilzeit / Pauschal" },
  { title: "Beikoch (w/m/d)", terms: "ab sofort in Vollzeit / Teilzeit / Pauschal" },
];

export const jobBenefits: string[] = [
  "5-Tage-Woche",
  "Gutes Grundgehalt",
  "Jahresurlaubsplanung",
  "Feiertagszuschläge",
  "Überstundenvergütung",
];

/** „Das sei noch angemerkt“ aus der gedruckten Karte. */
export const menuNotes: string[] = [
  "Alle Gerichte gibt es auch zum Mitnehmen.",
  "Beilagenwechsel oder Extrawünsche kosten extra.",
  "Die meisten Gerichte gibt es auch als Seniorenteller. Etwas kleinere Portionen, 1,90 € Preisnachlass.",
  "Alle Preise verstehen sich incl. 19 % Mehrwertsteuer.",
  "Wir haben täglich ab 11.00 Uhr geöffnet, mit Ausnahme von Heiligabend. Am 1. und 2. Weihnachtsfeiertag nur bis 15:00 Uhr.",
];

export type SiteSetting = {
  key: string;
  value: string;
  /** Beschriftung im Verwaltungsbereich */
  label: string;
  /** Erklärung, wo der Text auf der Website erscheint */
  hint: string;
  multiline: boolean;
};

export const siteSettings: SiteSetting[] = [
  {
    key: "banner_text",
    value: "Bestellungen und Abholung unter",
    label: "Hinweisleiste oben",
    hint: "Steht ganz oben auf jeder Seite, direkt vor der Telefonnummer. Der Link zur Reservierung davor steht fest.",
    multiline: false,
  },
  {
    key: "hours_note",
    value:
      "Täglich ab 11 Uhr geöffnet, mit Ausnahme von Heiligabend. Am 1. und 2. Weihnachtsfeiertag nur bis 15:00 Uhr.",
    label: "Hinweis unter den Öffnungszeiten",
    hint: "Erscheint unter der Tabelle mit den Öffnungszeiten, zum Beispiel für Feiertage.",
    multiline: true,
  },
  {
    key: "order_note",
    value:
      "Alle Gerichte und Getränke auch zum Abholen und Mitnehmen! Aufgrund der aktuellen Situation sind ggf. nicht alle Gerichte verfügbar.",
    label: "Hinweis zum Bestellen",
    hint: "Steht auf der Startseite und über der Speisekarte im grünen Kasten.",
    multiline: true,
  },
  {
    key: "menu_intro",
    value:
      "Suppen, Vorspeisen, Eiergerichte, Nudelgerichte, Salate, Geflügelgerichte, Fleischgerichte, Pfannengerichte, Schnitzelparadies, Dessert und Eis, Knabberzeug, Kindergerichte und Spargelgerichte.",
    label: "Einleitung der Speisekarte",
    hint: "Die Aufzählung der Kategorien oben auf der Seite „Speisekarte“.",
    multiline: true,
  },
  {
    key: "seasonal_menu_note",
    value:
      "…zur Osterzeit, …zur Spargelzeit, …zur Grünkohlzeit, …zur Weihnachtszeit. Lassen Sie sich überraschen!",
    label: "Saisonkarte",
    hint: "Der Kasten „Hier steckt unsere Saisonkarte“ unter der Speisekarte.",
    multiline: true,
  },
  {
    key: "jobs_intro",
    value: "Wir suchen Verstärkung für unser Team!",
    label: "Überschrift auf der Jobseite",
    hint: "Die große Zeile auf der Seite „Jobs“ und im Kasten auf der Startseite.",
    multiline: false,
  },
  {
    key: "jobs_application_address",
    value: "GastRoland UG (haftungsbeschränkt)\nFriedrich-August-Str. 1, 38889 Blankenburg",
    label: "Anschrift für Bewerbungen",
    hint: "Steht auf der Jobseite im Kasten „Bewerbung“.",
    multiline: true,
  },
  {
    key: "events_intro",
    value:
      "Wir beraten Sie gern und können Ihnen aus einem reichhaltigen Sortiment ein maßgeschneidertes Angebot erstellen. Sie brauchen sich nur zu entscheiden und die Feier kann starten, um den Rest kümmern wir uns!",
    label: "Text zu Feiern & Catering",
    hint: "Erscheint auf den Seiten „Feiern & Catering“, „Galerie“ und „Kontakt“.",
    multiline: true,
  },
];
