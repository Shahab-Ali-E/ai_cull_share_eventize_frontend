"use client";

import React from "react";
import SlideInFromBottom from "../SlideInFromBottom";
import BookEventButton from "./FlyingArrowLinkButton";
import { BackgroundLines } from "@/components/ui/background-lines";


function EventArrangementHeroSection() {
  return (
    <section
      className="relative flex w-full h-screen items-center justify-center"
    >
      <BackgroundLines className="flex items-center justify-center w-full">
        <div className="font-inter w-full h-full flex flex-col items-center justify-center text-center z-30">
          {/* text section */}
          <SlideInFromBottom duration={0.4} delay={0}>
            <h1 className="text-4xl md:text-7xl w-full font-semibold">
              Seamless Event <br /> Planning Memorable <br /> Experiences
            </h1>
          </SlideInFromBottom>
          <SlideInFromBottom duration={0.5} delay={0.3}>
            <p className="mt-4 md:mt-9 font-inter text-base md:text-2xl">
              Plan, manage, and execute events effortlessly <br /> with our
              all-in-one platform.
            </p>
          </SlideInFromBottom>

          {/* buttons here get started */}
          <div className="mt-6 md:mt-9 w-fit">
            <SlideInFromBottom duration={0.4} delay={0.5}>
              <BookEventButton href="/book-event/step1" label="Book Event" />
            </SlideInFromBottom>
          </div>
        </div>
      </BackgroundLines>

      {/* Animated stars */}
      {/* <div className="relative w-full h-2/3 md:w-3/12">
        <div className="absolute w-fit top-0 right-0">
          <SlideInFromTop>
            <Image
              src={star1}
              alt="stars-image"
              height={100}
              width={100}
              className="h-32 md:h-40 w-32 md:w-40 animate-float"
              unoptimized
            />
          </SlideInFromTop>
        </div>
        <div className="absolute w-fit left-0 top-1/4  ">
          <SlideInFromTop>
            <Image
              src={star2}
              alt="stars-image"
              height={100}
              width={100}
              className="h-52 md:h-60 w-52 md:w-60 animate-float"
              unoptimized
            />
          </SlideInFromTop>
        </div>
      </div> */}
    </section>
  );
}

export default EventArrangementHeroSection;
