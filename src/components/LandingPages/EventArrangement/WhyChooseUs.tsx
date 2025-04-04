import Image from "next/image";
import React from "react";
import GrainBackground from "@/images/EventArrangment/LandingPage/grain.jpg";

function WhyChooseUs({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div
      className="relative group flex flex-col h-full w-full rounded-md 
      dark:bg-[#14121C] bg-white/80
      shadow-md hover:shadow-lg transition-shadow duration-300
      dark:outline dark:outline-1 dark:outline-gray-300/20 
      border border-gray-200/80 dark:border-transparent
      overflow-hidden z-10"
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

      {/* Icon and glowing effect */}
      <div className="flex w-full justify-between relative z-10">
        <div className="p-7">{icon}</div>

        {/* Hover Glow Effect */}
        <div className="relative h-40 w-40 z-10 group">
          <div
            className="absolute top-0 right-0 h-40 w-56 scale-100 opacity-0 
            transition-opacity duration-700 ease-in-out 
            group-hover:opacity-100
            bg-[linear-gradient(to_bottom_left,#ffffff_10%,#C2DBFF_20%,#A57BDE_50%,transparent_75%)] 
            dark:bg-[linear-gradient(to_bottom_left,white_20%,#81b1ff_10%,#4512A1_50%,transparent_75%)] 
            blur-2xl transform origin-top-right"
          ></div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="flex flex-col space-y-2 font-inter max-w-96 p-7 relative z-10">
        <h3 className="text-2xl text-primary">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
    </div>
  );
}

export default WhyChooseUs;
