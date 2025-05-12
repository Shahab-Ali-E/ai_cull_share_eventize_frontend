// utils/featuresData.ts
import { CalendarDays, Zap, Share2 } from "lucide-react";
import { FeaturesProps } from "@/components/LandingPages/Home/Features";

export const featuresData: FeaturesProps[] = [
  {
    index: 1,
    title: "Seamless Event Planning Experiences",
    Icon: CalendarDays,
    description:
      "Plan, manage, and execute events effortlessly with our all-in-one platform.",
  },
  {
    index: -2,
    title: "AI-Powered Smart Culling",
    Icon: Zap,
    description:
      "Enhance efficiency, save time, and focus on what truly matters with AI-powered precision.",
  },
  {
    index: 3,
    title: "Secure & Instant Smart Sharing",
    Icon: Share2,
    description:
      "Deliver client-specific images via QR codes and face recognition in seconds.",
  },
];
