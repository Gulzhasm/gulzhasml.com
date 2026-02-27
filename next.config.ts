import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ai-gap-forecaster",
        destination: "https://ai-gap-forecaster.onrender.com/",
      },
      {
        source: "/ai-gap-forecaster/:path*",
        destination: "https://ai-gap-forecaster.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
