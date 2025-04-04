import React from "react";
import FlyingArrowLinkButton from "./FlyingArrowLinkButton";
import Image from "next/image";
import star1 from "@/images/EventArrangment/LandingPage/start_tilt_left.png";
import star2 from "@/images/EventArrangment/LandingPage/start_tilt_right.png";
import SlideInFromBottom from "../SlideInFromBottom";
import backgroundImage from "@/images/EventArrangment/LandingPage/feel_free_to_ask_bg.jpeg";
import SlideInFromTop from "../SlideInFromTop";

function AskAnyQuestion() {
  return (
    <div className="relative flex flex-col items-center justify-center h-96 md:h-screen w-full px-6 space-y-4 md:space-y-6 text-center z-0">
      <Image
        src={backgroundImage}
        alt="bg-image"
        height={200}
        width={200}
        className="absolute h-full w-full -z-10 opacity-70 hidden dark:block"
      />
      {/* Floating Stars */}
      <div className="absolute top-1/2 left-0 md:left-36 animate-float">
        <SlideInFromTop>
          <Image
            src={star1}
            alt="stars"
            width={60}
            height={60}
            className="w-16 h-16 md:w-32 md:h-32"
          />
        </SlideInFromTop>
      </div>
      <div className="absolute top-1/4 right-0 md:right-36 animate-float">
        <SlideInFromTop>
          <Image
            src={star2}
            alt="stars"
            width={60}
            height={60}
            className="w-16 h-16 md:w-32 md:h-32"
          />
        </SlideInFromTop>
      </div>

      {/* Main Content */}
      <SlideInFromBottom delay={0}>
        <h1 className="text-primary font-inter text-2xl md:text-5xl z-10">
          Feel free to ask any question
        </h1>
      </SlideInFromBottom>
      <SlideInFromBottom delay={0.2}>
        <FlyingArrowLinkButton href="/contact-us" label="Contact Us" />
      </SlideInFromBottom>
    </div>
  );
}

export default AskAnyQuestion;
