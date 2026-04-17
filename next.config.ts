import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://siyxjltxztzadthkhlpq.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "siyxjltxztzadthkhlpq.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
