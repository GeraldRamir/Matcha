import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/productos", priority: 0.9 },
    { path: "/coleccion", priority: 0.9 },
    { path: "/pedido", priority: 0.9 },
    { path: "/como-pedir", priority: 0.8 },
    { path: "/origen", priority: 0.7 },
    { path: "/contacto", priority: 0.8 },
    { path: "/terminos", priority: 0.3 },
    { path: "/condiciones", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
