"use client";

import React from "react";
import SlideInFromBottom from "../SlideInFromBottom";
import {
  useScroll,
  motion,
  useTransform,
  MotionValue,
  easeIn,
} from "framer-motion";

function About({ words }: { words: string }) {
  const wordsArray = words.split(" ");
  const animateTextRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: animateTextRef,
    offset: ["start 0.9", "start 0.25"], // Adjust for a more gradual trigger
  });

  return (
    <div className="flex flex-col w-full text-start gap-2 max-w-5xl font-inter sticky top-10">
      <p className="text-[#81b1ff]">About</p>
      <div
        className="flex flex-wrap gap-2 w-full line-clamp-3 text-6xl"
        ref={animateTextRef}
      >
        {wordsArray.map((word, index) => {
          const start = index / wordsArray.length;
          const end = start + 0.5 / wordsArray.length; // Smooth start-end distribution
          return (
            <Words key={index} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Words>
          );
        })}
      </div>
      <div className="w-full max-w-xl mt-7">
        <SlideInFromBottom delay={0}>
          <p className="text-start font-inter text-muted-foreground">
            We aim to{" "}
            <span className="font-semibold text-primary">streamline</span> event
            planning,{" "}
            <span className="font-semibold text-primary">minimize hassle</span>,
            and help users create{" "}
            <span className="font-semibold text-primary">
              memorable experiences
            </span>{" "}
            with ease.
          </p>
        </SlideInFromBottom>
      </div>
    </div>
  );
}

const Words = ({
  children,
  range,
  progress,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.1, 1], { ease: easeIn });

  return (
    <span className="relative">
      <motion.span
        style={{ opacity }}
        className="transition-opacity duration-700"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default About;
