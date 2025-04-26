"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import StarWithText from "./StarWithText";
import Dot from "@/components/animata/background/dot";

gsap.registerPlugin(ScrollTrigger);

function LinearScrollProgress() {
  const startProgressBarRef = useRef<HTMLDivElement | null>(null);
  const secondProgressBarRef = useRef<HTMLDivElement | null>(null);
  const thirdProgressBarRef = useRef<HTMLDivElement | null>(null);
  const fourthProgressBarRef = useRef<HTMLDivElement | null>(null);
  const fifthProgressBarRef = useRef<HTMLDivElement | null>(null);
  const endProgressBarRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  const [currentVideo, setCurrentVideo] = useState("/videos/video1.mp4");

  // stars refs
  const starRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const videoSources = useMemo(() => [
    "/videos/1st.mp4",
    "/videos/2nd.mp4",
    "/videos/3rd.mp4",
    "/videos/4th.mp4",
    "/videos/5th.mp4",
  ], []);

  // Preload videos when component mounts
  useEffect(() => {
    const videos: HTMLVideoElement[] = [];
    
    videoSources.forEach((source) => {
      const video = document.createElement("video");
      video.src = source;
      video.preload = "auto";
      video.muted = true;
      video.load();
      videos.push(video);
    });
    
    // Clean up preloaded videos when component unmounts
    return () => {
      videos.forEach(video => {
        video.src = "";
        video.load();
      });
    };
  }, [videoSources]);

  // Function to change video with fade effect
  const changeVideo = (videoIndex: number) => {
    if (videoWrapperRef.current) {
      gsap.to(videoWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentVideo(videoSources[videoIndex]);
          gsap.to(videoWrapperRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        }
      });
    }
  };

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

    starRefs.forEach((starRef, index) => {
      if (!starRef.current) return;

      ScrollTrigger.create({
        trigger: starRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Highlight current star
          gsap.to(starRef.current, {
            opacity: 1,
          });
          
          // Update active star index and change video
          changeVideo(index);
        },
        onLeaveBack: () => {
          // Dim current star when scrolling back up
          gsap.to(starRef.current, {
            opacity: 0.2,
          });
        },
        onLeave: () => {
          // When leaving a star going down, no need to change video
          // as the next star's onEnter will handle it
        },
        onEnterBack: () => {
          // When scrolling back up and re-entering a star
          gsap.to(starRef.current, {
            opacity: 1,
          });
          
          // Update active star index and change video when scrolling back up
          changeVideo(index);
        }
      });
    });
  }, [videoSources]);

  return (
    <div className="flex w-full gap-7">
      {/* ---- Video Component ---- */}
      <div className="min-h-screen w-1/2 relative hidden md:block">
        {/* Sticky container */}
        <div className="h-80 w-full sticky top-[30%]">
          {/* Background with Blur and Gradient */}
          <div
            className="absolute inset-0 h-full w-full rounded-md overflow-hidden 
            bg-gradient-to-tr dark:from-[#2c163f] dark:via-[#28182f] dark:to-[#201e3c]
            from-[#F2E6FF] via-[#E6D9FF] to-[#D1C9FF]
            backdrop-blur-md"
          ></div>

          {/* Dot Component */}
          <div className="relative z-10 h-full w-full">
            <Dot
              size={0.7}
              spacing={14}
              color="#474755"
              className="h-full w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden flex items-end justify-center bg-transparent"
            >
              <div ref={videoWrapperRef} className="h-[94%] w-11/12">
                <video
                  ref={videoRef}
                  width="400"
                  height="270"
                  autoPlay
                  loop
                  muted
                  key={currentVideo}
                  style={{ transform: "scaleX(1) rotateY(0deg)" }}
                  className="h-full w-full object-cover rounded-tr-md rounded-tl-md shadow-sm shadow-card backdrop-blur-md"
                >
                  <source src={currentVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Dot>
          </div>
        </div>
      </div>
      {/* --- Linear Progress Bar --- */}
      <div className="relative flex flex-col items-start p-2 z-0">
        {/* 📌 Start Progress Bar */}
        <div className="relative items-center w-0.5 h-44 bg-muted rounded-lg bg-opacity-20 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-16 w-7 bg-gradient-to-b from-card via-card/40 z-20"></div>
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
        <div className="relative items-center w-0.5 h-[520px] bg-muted rounded-lg bg-opacity-20 -z-10">
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
        <div className="relative items-center w-0.5 h-[520px] bg-muted rounded-lg bg-opacity-20 -z-10">
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
        <div className="relative items-center w-0.5 h-[520px] bg-muted rounded-lg bg-opacity-20 -z-10">
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
        <div className="relative items-center w-0.5 h-[520px] bg-muted rounded-lg bg-opacity-20 -z-10">
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-7 bg-gradient-to-t from-card via-card/40 to-transparent z-20"></div>
        </div>
      </div>
    </div>
  );
}

export default LinearScrollProgress;
