/** Every public path in one place, so links and the sitemap cannot drift apart. */
export const routes = {
  home: "/",
  menu: "/speisekarte",
  events: "/feiern-catering",
  gallery: "/galerie",
  jobs: "/jobs",
  contact: "/kontakt",
  reservation: "/reservierung",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;

/** Main navigation, in header order. */
export const navLinks = [
  { href: routes.menu, label: "Speisekarte" },
  { href: routes.events, label: "Feiern & Catering" },
  { href: routes.gallery, label: "Galerie" },
  { href: routes.jobs, label: "Jobs" },
  { href: routes.contact, label: "Kontakt" },
] as const;
