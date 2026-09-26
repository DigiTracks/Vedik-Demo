import type { MetadataRoute } from "next";
import { ROUTE_KEYS, routeMeta, siteUrl } from "@/lib/site";

/**
 * Generated at build time into `out/sitemap.xml`.
 *
 * Metadata route handlers are cached by default, so this is a static file and
 * works under `output: "export"`.
 *
 * `lastModified` is pinned to the build time rather than `new Date()` per entry
 * so repeated builds of unchanged content do not churn the sitemap.
 *
 * `force-static` is required for every route handler under `output: "export"`.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTE_KEYS.filter((key) => routeMeta(key).inSitemap !== false).map(
    (key) => {
      const route = routeMeta(key);
      return {
        url: siteUrl(route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    },
  );
}
