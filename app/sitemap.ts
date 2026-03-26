import type { MetadataRoute } from "next";

const baseUrl = "https://barbaria-morocco.vercel.app"; // TODO: update with final domain

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"];
  const paths = ["/", "/products", "/about", "/contact"];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    }))
  );
}
