"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

function ShrinkingVideoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const div = divRef.current;
    if (!card || !div) return;

    // Set initial styles
    gsap.set(div, { position: "absolute", width: "100vw" });
    gsap.set(card, { width: "100vw" });

    // Scroll-triggered animation for shrinking width
    gsap.to(card, {
      width: "70vw", // Final width when fully scrolled
      ease: "power1.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: card,
        start: "top 85%", // Start animation when top reaches 95% of viewport
        end: "center center", // End animation when card is at the center
        scrub: true, // Smoothly interpolate values based on scroll
      },
    });

    // Scroll-triggered animation for moving div downward
    gsap.to(div, {
      top: "50%", // Move downward as user scrolls
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: div,
        start: "top 65%", // Trigger when div is about to enter viewport
        end: "top 20%", // Stop when div reaches center
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className="flex items-center justify-center w-full absolute top-[38%]" ref={divRef}>
      <Card
        ref={cardRef}
        className="relative rounded-xl bg-transparent border border-muted-foreground/15 shadow-lg overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-transparent blur-3xl"></div>
        <CardContent className="text-center p-3">
          <video
            width="400"
            height="270"
            autoPlay
            loop
            muted
            className="h-full w-full object-cover rounded-tr-md rounded-tl-md"
          >
            <source src={"/videos/video1.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShrinkingVideoCard;
