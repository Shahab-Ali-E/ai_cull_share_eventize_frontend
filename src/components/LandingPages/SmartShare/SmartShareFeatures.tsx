import Image from "next/image";
import React from "react";
import GrainBackground from "@/images/EventArrangment/LandingPage/grain.jpg";
import {
  Calendar,
  Upload,
  QrCode,
  UserRound,
  Download,
  BarChart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Create Event",
    description: "Set up your photo event in seconds.",
    icon: Calendar,
    color: "text-cyan",
    bgColor: "bg-cyan/5",
    badgeColor: "border-cyan-200 bg-cyan-100 text-cyan-600",
    delay: "0s",
  },
  {
    title: "Upload & Organize",
    description: "Drag & drop images and let AI tag faces.",
    icon: Upload,
    color: "text-gold",
    bgColor: "bg-gold/5",
    badgeColor: "border-amber-200 bg-amber-100 text-amber-600",
    delay: "0.1s",
  },
  {
    title: "Publish with QR",
    description: "Generate unique QR codes per event.",
    icon: QrCode,
    color: "text-magenta",
    bgColor: "bg-magenta/5",
    badgeColor: "border-fuchsia-200 bg-fuchsia-100 text-fuchsia-600",
    delay: "0.2s",
  },
  {
    title: "Secure Facial Access",
    description: "Clients scan and verify via facial recognition.",
    icon: UserRound,
    color: "text-cyan",
    bgColor: "bg-cyan/5",
    badgeColor: "border-cyan-200 bg-cyan-100 text-cyan-600",
    delay: "0.3s",
  },
  {
    title: "Instant Downloads",
    description: "Guest downloads from any device.",
    icon: Download,
    color: "text-gold",
    bgColor: "bg-gold/5",
    badgeColor: "border-amber-200 bg-amber-100 text-amber-600",
    delay: "0.4s",
  },
  {
    title: "Analytics Dashboard",
    description: "Track views and downloads in real time.",
    icon: BarChart,
    color: "text-magenta",
    bgColor: "bg-magenta/5",
    badgeColor: "border-fuchsia-200 bg-fuchsia-100 text-fuchsia-600",
    delay: "0.5s",
  },
];

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  badgeColor: string;
  delay: string;
}

const FeatureCard = ({
  title,
  description,
  Icon,
  delay,
  badgeColor,
}: FeatureCardProps) => {
  return (
    <Card
      className="relative group flex flex-col h-full w-full rounded-md 
      dark:bg-[#141414] bg-white/80
      shadow-md hover:shadow-lg transition-shadow duration-300
      dark:outline dark:outline-1 dark:outline-gray-300/20 
      border border-gray-200/80 dark:border-transparent
      overflow-hidden z-10"
      style={{ animationDelay: delay }}
    >
      {/* Grain Texture Overlay */}
      <Image
        src={GrainBackground}
        alt="grain-Background"
        height={100}
        width={100}
        className="absolute object-cover top-0 left-0 w-full h-full z-10 opacity-5 pointer-events-none"
        unoptimized
      />
      <CardContent className="p-8 flex flex-col">
        <Badge variant="outline" className={`w-fit mb-4 ${badgeColor}`}>
          <Icon size={14} className="mr-1" />
          {title}
        </Badge>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

function SmartShareFeatures() {
  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      {features.map((feature, index) => (
        <div key={index} className={`col-span-12 md:col-span-6 lg:col-span-4`}>
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            Icon={feature.icon}
            badgeColor={feature.badgeColor}
            delay={feature.delay}
          />
        </div>
      ))}
    </div>
  );
}

export default SmartShareFeatures;
