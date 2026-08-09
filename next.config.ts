import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/School-Demo",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
