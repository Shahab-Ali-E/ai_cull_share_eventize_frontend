import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.aicullshareeventizebackend.online",
      },
    ],
  },
  webpack(config) {
    // Use Next.js's built-in Webpack version
    config.resolve.alias["webpack"] = require.resolve("next/dist/compiled/webpack/webpack-lib");
    
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);
