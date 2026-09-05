import { openingHoursSpecification } from "@/lib/hours";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    alternateName: siteConfig.altName,
    url: siteConfig.url,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    email: siteConfig.email,
    image: [`${siteConfig.url}${siteConfig.images.hero}`, `${siteConfig.url}${siteConfig.images.exterior}`],
    logo: `${siteConfig.url}${siteConfig.images.logo}`,
    servesCuisine: "Deutsch",
    priceRange: "€€",
    acceptsReservations: "True",
    hasMenu: `${siteConfig.url}${routes.menu}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification,
    sameAs: [siteConfig.social.facebook],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
