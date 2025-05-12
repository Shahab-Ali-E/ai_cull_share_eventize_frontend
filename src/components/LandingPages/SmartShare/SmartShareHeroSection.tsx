"use client";

import React from "react";
import SlideInFromBottom from "@/components/LandingPages/SlideInFromBottom";
import GetStartedButton from "../GetStartedButton";
import { cn } from "@/lib/utils";

function SmartShareHeroSection() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row w-full h-screen pt-0 px-10 rounded-b-[30px] overflow-hidden bg-primary-foreground dark:bg-card z-30">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="font-inter w-full h-full flex flex-col justify-center items-center text-center z-20">
        <SlideInFromBottom duration={0.4} delay={0}>
          <p className="text-[#66a0fe] dark:text-[#81b1ff] text-sm ml-4">
            Smart Share
          </p>
        </SlideInFromBottom>
        {/* text section */}
        <SlideInFromBottom duration={0.4} delay={0}>
          <h1 className="text-4xl md:text-7xl text-primary w-full font-semibold z-10 mt-4">
            Event Photo Sharing
          </h1>
        </SlideInFromBottom>
        <SlideInFromBottom duration={0.5} delay={0.3}>
          <p className="mt-5 md:mt-10 font-inter text-base md:text-2xl max-w-xl text-primary z-10">
            Create events, upload images, and let guests access them securely
            via QR code and facial recognition.
          </p>
        </SlideInFromBottom>

        {/* buttons here get started */}
        <div className="mt-10 md:mt-12 w-fit">
          <SlideInFromBottom duration={0.6} delay={0.6}>
            <GetStartedButton href="/smart-share-dashboard" />
          </SlideInFromBottom>
        </div>
      </div>
    </section>
  );
}

export default SmartShareHeroSection;
