// components/LandingPages/Home/Features.tsx
"use client";

import React, { ReactNode } from "react";
import GradientCard from "./GradientCard";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";
import { featuresData } from "@/utils/featuresData";
import SlideInFromBottom from "../SlideInFromBottom";

export interface FeaturesProps {
  index: number;
  title: ReactNode;
  Icon?: LucideIcon;
  description: string;
}

const Features: React.FC<FeaturesProps> = ({
  index,
  title,
  Icon,
  description,
}) => {
  const isReversed = index < 0;
  const { theme } = useTheme();
  return (
    <div
      className={`
        min-h-screen text-primary flex flex-col 
        md:flex-row items-center justify-center p-4 md:p-8 gap-8 md:gap-28
        ${isReversed ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* TEXT COLUMN */}
      <div className="w-full max-w-lg space-y-3">
        {Icon && (
          <SlideInFromBottom delay={0.2}>
            <div className="flex items-center p-1 md:p-2 rounded-[6px] bg-primary max-w-fit">
              <Icon
                color={theme === "dark" ? "black" : "white"}
                className="size-6 md:size-7"
              />
            </div>
          </SlideInFromBottom>
        )}

        <div className="space-y-4">
          <h1 className="text-xl md:text-4xl font-bold leading-tight">
            <SlideInFromBottom delay={0.2}>{title}</SlideInFromBottom>
          </h1>
          <p className="text-gray-400 max-w-md text-md">
            <SlideInFromBottom delay={0.2}>{description}</SlideInFromBottom>
          </p>
        </div>
      </div>

      {/* MEDIA COLUMN */}
      <div className="w-full max-w-lg">
        <SlideInFromBottom delay={0.2}>
          <GradientCard />
        </SlideInFromBottom>
      </div>
    </div>
  );
};

export default function FeaturesList() {
  return (
    <div className="flex flex-col items-center w-full px-5 md:px-0">
      <div className="flex flex-col items-center justify-center py-10 w-full">
        <SlideInFromBottom delay={0.2}>
          <h1 className="text-4xl font-bold mb-2 text-primary">Features</h1>
        </SlideInFromBottom>

        <p className="text-muted-foreground max-w-md text-center text-lg">
          <SlideInFromBottom delay={0.3}>
            Explore our features and see how they can benefit you.
          </SlideInFromBottom>
        </p>
      </div>

      <div className="space-y-16">
        {featuresData.map((feat) => (
          <Features key={feat.index} {...feat} />
        ))}
      </div>
    </div>
  );
}
