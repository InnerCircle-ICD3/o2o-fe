import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: ".next",
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://store-owner.eatngo.org/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
