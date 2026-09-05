/**
 * Static site facts from the current website and the 2025 menu.
 * Opening hours live in `hours.ts`, menu in `menu.ts`, photos in `gallery.ts`.
 */
export const siteConfig = {
  name: "Grüne Gurke",
  slogan: "…da schmeckt's!",
  legalName: "GastRoland UG (haftungsbeschränkt)",
  altName: "Gaststätte Harzblick",
  owner: "Bernd Roland",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "Veckenstedter Weg 63",
    postalCode: "38855",
    city: "Wernigerode",
    region: "Sachsen-Anhalt",
    country: "DE",
  },
  /** Display form and tel: form of the one number used for orders + reservations. */
  phone: { display: "03943 634256", href: "tel:+493943634256" },
  email: "info@gruene-gurke.com",
  social: {
    facebook: "https://www.facebook.com/gruenegurke.wr/",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Veckenstedter+Weg+63%2C+38855+Wernigerode",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Veckenstedter+Weg+63,+38855+Wernigerode&output=embed&z=15",
  menuPdf: "/speisekarte.pdf",
  menuYear: "2025",
  images: {
    logo: "/images/logo.png",
    hero: "/images/restaurant/terrace.jpg",
    exterior: "/images/restaurant/exterior.jpg",
    schnitzel: "/images/food/schnitzel.jpg",
    jobs: "/images/jobs/team.jpg",
  },
} as const;
