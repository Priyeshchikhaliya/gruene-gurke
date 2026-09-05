/**
 * Static site facts. Placeholder values until the real ones come from the
 * client / current website. Opening hours and menu live in Supabase.
 */
export const siteConfig = {
  name: "Grüne Gurke",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "Musterstraße 1",
    postalCode: "10115",
    city: "Berlin",
    country: "DE",
  },
  phone: "+49 30 000000",
  email: "hallo@gruene-gurke.example",
  social: {
    instagram: "https://instagram.com/",
  },
  /** Google Maps share link, used in the footer and contact page. */
  mapsUrl: "https://maps.google.com/?q=Musterstra%C3%9Fe+1+10115+Berlin",
} as const;
