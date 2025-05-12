import { Metadata } from "next";
import React from "react";
import { ReactLenis } from "@/utils/lenis";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how AI Cull helps photographers save time by automatically removing blurry, duplicate, and closed-eye shots using advanced AI.",
  keywords: [
    "AI Cull",
    "automatic photo culling",
    "AI for photographers",
    "blurry image remover",
    "duplicate photo remover",
    "event photo sorting",
  ],
  openGraph: {
    title: "About Us",
    description:
      "AI Cull uses smart algorithms to help photographers quickly clean and organize their event photos by removing low-quality shots.",
    url: "https://yourdomain.com/about",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/culling-preview.jpg",
        width: 1200,
        height: 630,
        alt: "AI Cull Feature Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description:
      "Discover how AI Cull transforms photo workflows by filtering out poor-quality images for event photographers.",
    images: ["https://yourdomain.com/images/culling-preview.jpg"],
  },
};

function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <ReactLenis root>{children}</ReactLenis>
    </div>
  );
}

export default AboutUsLayout;
