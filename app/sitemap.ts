import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/productos", priority: 0.9 },
    { path: "/pedido", priority: 0.9 },
    { path: "/origen", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
