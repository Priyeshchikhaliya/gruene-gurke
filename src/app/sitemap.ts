import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const routes = ["", "/menu", "/gallery", "/reservations", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}${route}`])),
      },
    })),
  );
}
