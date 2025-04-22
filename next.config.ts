import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
    ],
  },
};



export default nextConfig;
