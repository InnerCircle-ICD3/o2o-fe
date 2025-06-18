import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  distDir: ".next",
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/stores/:id/products",
        destination: "https://store-owner.eatngo.org/api/v1/stores/:id/products",
      },
      {
        source: "/api/:path*",
        destination: "https://customer.eatngo.org/api/v1/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "eatngo-app.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
