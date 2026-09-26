import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Generated at build time into `out/manifest.webmanifest`.
 *
 * The demo is a static export, so `start_url` points at the marketing landing
 * page rather than the dashboard.
 *
 * `force-static` is required for every route handler under `output: "export"`.
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.shortName,
    description: SITE.description,
    lang: SITE.lang,
    dir: "ltr",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    categories: ["education", "productivity", "business"],
    icons: [
      { src: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "Live Demo", url: "/login" },
      { name: "Pricing", url: "/license" },
      { name: "Dashboard", url: "/dashboard" },
    ],
  };
}
