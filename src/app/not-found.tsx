import { Metadata } from "next";
import Custom404 from "@/components/custom-404";
import Navbar from "@/components/navbar";
import React from "react";
import { ReactLenis } from "@/utils/lenis";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Oops! The page you are looking for doesn't exist. Explore AI Cull's smart photo culling features.",
  keywords: [
    "404",
    "page not found",
    "AI Cull",
    "photo culling",
    "lost page"
  ],
  openGraph: {
    title: "404 - Page Not Found",
    description: "Looks like you took a wrong turn. Discover AI Cull for seamless photo organization and culling.",
    url: "https://yourdomain.com/404",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/404-culling.jpg",
        width: 1200,
        height: 630,
        alt: "404 Not Found - AI Cull"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Page Not Found",
    description: "Oops! The page you seek isn't here. Check out AI Cull for automated image culling.",
    images: ["https://yourdomain.com/images/404-culling.jpg"]
  }
};

export default function NotFound() {
  return (
    <section className="flex flex-col bg-card min-h-screen">
      <ReactLenis root>
        <section className="flex justify-center">
          <Navbar />
        </section>
        <section className="flex">
          <Custom404 />
        </section>
      </ReactLenis>
    </section>
  );
}