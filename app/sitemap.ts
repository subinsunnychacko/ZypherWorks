import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

/**
 * Next.js generates /sitemap.xml from this file at build time.
 * Every deployment rebuilds it, so lastModified always reflects
 * the actual publish date automatically — no manual updates needed.
 *
 * To extend: add blog posts or product slugs by fetching them here
 * and spreading additional entries into the returned array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/company`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /*
   * Dynamic routes — uncomment and adapt when you add them:
   *
   * Blog posts:
   *   const posts = await fetch("https://your-cms.io/api/posts").then(r => r.json());
   *   const blogRoutes = posts.map(post => ({
   *     url: `${BASE}/blog/${post.slug}`,
   *     lastModified: new Date(post.updatedAt),
   *     changeFrequency: "weekly" as const,
   *     priority: 0.6,
   *   }));
   *
   * Individual product pages (if you add /products/[slug]):
   *   import { PRODUCTS } from "@/components/products/page/data";
   *   const productRoutes = PRODUCTS.map(p => ({
   *     url: `${BASE}/products/${p.id}`,
   *     lastModified: now,
   *     changeFrequency: "monthly" as const,
   *     priority: 0.75,
   *   }));
   *
   * return [...staticRoutes, ...blogRoutes, ...productRoutes];
   */

  return staticRoutes;
}
