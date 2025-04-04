import { Metadata } from "next";
import React from "react";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Smart Culling",
  description:
    "Discover AI-powered image culling that removes closed-eye, duplicate, and blurry images, leaving you with a high-quality photo collection.",
  keywords: [
    "AI image culling",
    "photo organization",
    "remove blurry images",
    "duplicate photo detection",
    "automated photo selection",
  ],
  openGraph: {
    title: "Smart Culling Home",
    description:
      "Discover AI-powered image culling that removes closed-eye, duplicate, and blurry images, leaving you with a high-quality photo collection.",
    url: "http://localhost/culling-home",
    type: "website",
    images: [
      {
        url: "http://localhost/images/contenetalFood.jpg",
        width: 1200,
        height: 630,
        alt: "AI Culling Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Culling Home",
    description:
      "Discover AI-powered image culling that removes closed-eye, duplicate, and blurry images, leaving you with a high-quality photo collection.",
    images: ["https://yourwebsite.com/images/culling-preview.jpg"],
  },
};

function CullingHomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <ReactLenis root>
        {children}
        <Footer />
      </ReactLenis>
    </div>
  );
}

export default CullingHomeLayout;
