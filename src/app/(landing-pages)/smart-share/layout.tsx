import { Metadata } from "next";
import React from "react";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Smart Share",
  description:
    "Simplify event photo delivery: Smart Share uses facial recognition and QR codes to give clients instant, secure access to their images.",
  keywords: [
    "Smart Share",
    "event photo sharing",
    "facial recognition",
    "QR code image access",
    "photo delivery platform",
    "AI photo sharing"
  ],
  openGraph: {
    title: "Smart Share",
    description:
      "Experience seamless photo sharing: clients scan a QR code to instantly view and download their event images powered by AI and facial recognition.",
    url: "https://yourdomain.com/smart-share",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/smart-share-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Share Module Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Share",
    description:
      "Clients get instant event photo access via QR codes and AI-based facial recognition with our Smart Share module.",
    images: ["https://yourdomain.com/images/smart-share-preview.jpg"]
  }
};

function SmartShareHomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <ReactLenis root>
        {children}
        <Footer />
      </ReactLenis>
    </div>
  );
}

export default SmartShareHomeLayout;
