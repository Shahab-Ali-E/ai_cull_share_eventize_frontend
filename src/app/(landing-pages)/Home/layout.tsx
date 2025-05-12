import { Metadata } from "next";
import React from "react";
import { ReactLenis } from "@/utils/lenis";

export const metadata: Metadata = {
  title: "Home",
  description:
    "AI Cull, Share, and Eventize is an intelligent media management platform that automates culling, organizes shared content, and enhances event-based media workflows with AI-powered insights.",
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <ReactLenis root>{children}</ReactLenis>
    </div>
  );
}

export default HomeLayout;
