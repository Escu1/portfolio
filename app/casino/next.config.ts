import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname), // forces Turbopack to treat casino-royale as root
  },
};

export default nextConfig;
