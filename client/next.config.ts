import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "snlbd.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
