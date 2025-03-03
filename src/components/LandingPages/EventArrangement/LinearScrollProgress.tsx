"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import StarWithText from "./StarWithText"; // Import the reusable component

gsap.registerPlugin(ScrollTrigger);

function LinearScrollProgress() {
  const startProgressBarRef = useRef<HTMLDivElement | null>(null);
  const secondProgressBarRef = useRef<HTMLDivElement | null>(null);
  const thirdProgressBarRef = useRef<HTMLDivElement | null>(null);
  const fourthProgressBarRef = useRef<HTMLDivElement | null>(null);
  const fifthProgressBarRef = useRef<HTMLDivElement | null>(null);
  const endProgressBarRef = useRef<HTMLDivElement | null>(null);

  // stars refs
  const starRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  useGSAP(() => {
    // GSAP animations for each progress bar
    const progressBars = [
      startProgressBarRef.current,
      secondProgressBarRef.current,
      thirdProgressBarRef.current,
      fourthProgressBarRef.current,
      fifthProgressBarRef.current,
      endProgressBarRef.current,
    ];

    progressBars.forEach((bar, index) => {
      if (!bar) return;

      gsap.fromTo(
        bar,
        { height: "0%" }, // Start with height: 0%
        {
          height: "100%", // Grow to full height
          ease: "none", // Smoother easing
          delay: index * 0.2, // Add a delay for each bar
          scrollTrigger: {
            trigger: bar.parentElement, // Trigger on the parent container
            start: "top center", // Start when the top of the bar reaches the center of the viewport
            end: "bottom center", // End when the bottom of the bar reaches the center of the viewport
            scrub: true, // Smooth scrolling effect
          },
        }
      );
    });

    starRefs.forEach((starRef) => {
      if (!starRef.current) return;

      gsap.fromTo(
        starRef.current,
        { opacity: "20%" }, // Initial opacity
        {
          opacity: "100%", // Change to full opacity
          scrollTrigger: {
            trigger: starRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true, // Smooth transition
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative flex flex-col items-start p-2 z-0">
      {/* 📌 Start Progress Bar */}
      <div className="relative items-center w-0.5 h-44 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-16 w-7 bg-gradient-to-b from-black via-black/40 z-20"></div>
        <div
          ref={startProgressBarRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-card via-primary via-50% to-primary z-10"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* ⭐ First Star - Dynamic Color */}
      <StarWithText
        starRef={starRefs[0]}
        title="Personal Information"
        description="Enter your Full Name, Email, and Phone Number to get started."
      />

      {/* 📌 Middle Progress Bars */}

      {/* middle first progress bar */}
      <div className="relative items-center w-0.5 h-96 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div
          ref={secondProgressBarRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-primary z-10"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* ⭐ middle first progress bar  Star */}
      <StarWithText
        starRef={starRefs[1]}
        title="Event Details"
        description="Select your Event Type, Date, Number of Guests, and Budget to customize your experience."
      />

      {/* middle second progress bar */}
      <div className="relative items-center w-0.5 h-96 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div
          ref={thirdProgressBarRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-primary z-10"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* ⭐ middle second progress bar Star */}
      <StarWithText
        starRef={starRefs[2]}
        title="Destination Selection"
        description="Select Your Ideal Country as the Event Destination for a Seamless Experience."
      />

      {/* middle third progress bar */}
      <div className="relative items-center w-0.5 h-96 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div
          ref={fourthProgressBarRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-primary z-10"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* ⭐ middle third progress bar Star */}
      <StarWithText
        starRef={starRefs[3]}
        title="Additional Information"
        description="Select a Portfolio and mention any Specific Requirements for customization."
      />

      {/* 📌middle fourth progress bar*/}
      <div className="relative items-center w-0.5 h-96 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div
          ref={fifthProgressBarRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-primary z-10"
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* ⭐ middle fourth progress bar Star */}
      <StarWithText
        starRef={starRefs[4]}
        title="Review & Submit"
        description="Thoroughly review all your details before submitting the form to ensure accuracy and completeness."
      />

      {/* 📌 End Progress Bar with Fade-Out Effect */}
      <div className="relative items-center w-0.5 h-40 bg-muted rounded-lg bg-opacity-20 -z-10">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-primary z-10"
          style={{ transformOrigin: "top" }}
          ref={endProgressBarRef}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-7 bg-gradient-to-t from-black via-black/40 to-transparent z-20"></div>
      </div>
    </div>
  );
}

export default LinearScrollProgress;