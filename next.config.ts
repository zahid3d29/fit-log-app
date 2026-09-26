import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // https://api.abcz.workers.dev/api/fitlog
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
