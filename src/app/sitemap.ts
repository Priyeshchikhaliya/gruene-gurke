import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

const entries: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.menu, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.reservation, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.events, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.gallery, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.jobs, priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
