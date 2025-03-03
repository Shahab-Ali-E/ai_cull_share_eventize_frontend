"use client";

import React from "react";
import { LuSparkle } from "react-icons/lu";
import Dot from "@/components/animata/background/dot";

interface StarWithTextProps {
  starRef: React.RefObject<HTMLDivElement>;
  title: string;
  description: string;
}

const StarWithText: React.FC<StarWithTextProps> = ({
  starRef,
  title,
  description,
}) => {
  return (
    <div className="flex items-center space-x-7 h-10 -ml-[7px]" ref={starRef}>
      <LuSparkle className="h-4 w-4 text-primary" fill="white" />
      <div className="text-left w-full md:w-1/2 mt-5 relative top-40 md:top-0">
        <h2 className="text-white text-lg font-medium">{title}</h2>
        <p className="text-gray-400 text-sm mt-2">{description}</p>

        {/* Responsive div only visible on sm and md devices, taking full width */}
        <div className="h-64 w-full mt-5 block md:hidden relative">
          {/* Background with Blur and Gradient */}
          <div className="absolute inset-0 h-full w-full rounded-md overflow-hidden bg-gradient-to-tr from-[#2c163f] via-[#28182f] to-[#201e3c] backdrop-blur-md"></div>

          {/* Dot Component */}
          <div className="relative z-10 h-full w-full">
            <Dot
              size={0.7}
              spacing={14}
              color="#474755"
              className="h-full w-full border border-gray-700 rounded-md overflow-hidden flex items-center justify-center bg-transparent"
            >
              <p className="text-white text-lg font-medium relative z-10">
                Hello
              </p>
            </Dot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarWithText;
