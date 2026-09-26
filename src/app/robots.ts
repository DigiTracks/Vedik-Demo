import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Generated at build time into `out/robots.txt`.
 *
 * Every route in this demo is intended to be discoverable, so nothing is
 * disallowed. Build artefacts are excluded because they are not content and
 * `/_next/` in particular is a crawl budget trap.
 *
 * `force-static` is required for every route handler under `output: "export"`.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    // Origin only: robots directives take bare URLs, never page paths with a
    // trailing slash, so SITE_URL is used rather than the siteUrl() helper.
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
