import type { NextConfig } from "next";

/**
 * Deploys as a fully static export to Netlify.
 *
 * `NEXT_PUBLIC_SITE_URL` is not read here -- it is consumed by src/lib/site.ts,
 * which uses it for metadataBase, canonical URLs, the sitemap and JSON-LD.
 * Set it in Netlify (Site settings > Environment variables) when deploying to a
 * preview or custom domain. See .env.example and netlify.toml.
 *
 * `NEXT_PUBLIC_BASE_PATH` should stay empty for a domain-root deploy. If the
 * demo is ever served from a sub-path, set both it and NEXT_PUBLIC_SITE_URL to
 * the same sub-path so canonicals stay correct.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  // The default image optimiser needs a server, which a static export has not
  // got. Ship pre-sized images in /public instead.
  images: {
    unoptimized: true,
  },
  // Emits out/<route>/index.html so the static host serves real files without
  // rewrite rules. Sitemap and canonical URLs use matching trailing slashes.
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
