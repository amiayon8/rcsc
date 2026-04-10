import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://10.1.1.10:3000'],
};

export default nextConfig;
