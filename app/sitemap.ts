import type { MetadataRoute } from "next";

const baseUrl = "https://barbaria-morocco.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"];
  const paths = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/cosmetics", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/textile", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/food", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return locales.flatMap((locale) =>
    paths.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );
}
