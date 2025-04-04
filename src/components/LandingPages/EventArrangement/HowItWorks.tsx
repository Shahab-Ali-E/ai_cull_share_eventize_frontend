import React from "react";
import LinearScrollProgress from "./LinearScrollProgress";
import backgroundImage from "@/images/EventArrangment/LandingPage/how_it_work_bg.png";
import Image from "next/image";

function HowItWorks() {
  return (
    <div className="flex w-full justify-center relative">
      <Image
        src={backgroundImage}
        alt="bg-image"
        height={200}
        width={200}
        className="absolute h-full w-full opacity-60 hidden dark:block"
      />
      <div className="flex w-full">
        {/* animated progress */}
        <LinearScrollProgress />
      </div>
    </div>
  );
}

export default HowItWorks;
