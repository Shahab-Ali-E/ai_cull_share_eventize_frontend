"use client";

import React from "react";
import { LuSparkle } from "react-icons/lu";
import Dot from "@/components/animata/background/dot";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  return (
    <div className="flex items-center space-x-7 h-10 -ml-[7px] opacity-50" ref={starRef}>
      <LuSparkle
        className="h-4 w-4 text-primary"
        fill={theme === "dark" ? "white" : "black"}
      />
      <div className="text-left w-full md:w-1/2 mt-5 relative top-40 md:top-0">
        <h2 className="text-primary text-lg font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm mt-2">{description}</p>

        {/* Responsive div only visible on sm and md devices, taking full width */}
        <div className="h-64 w-full mt-5 block md:hidden relative">
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
              className="h-full w-full border border-gray-700 rounded-md overflow-hidden flex items-center justify-center bg-transparent"
            >
              <div>
                <video width="320" height="240" controls={false}>
                  <source src="/videos/video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Dot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarWithText;
