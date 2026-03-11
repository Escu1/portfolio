import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "../",
  },
  webpack: (config, { isServer }) => {
    // If client-side, don't polyfill `fs`
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;
