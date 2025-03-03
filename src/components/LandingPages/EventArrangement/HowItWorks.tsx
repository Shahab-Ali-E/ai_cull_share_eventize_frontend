import Dot from "@/components/animata/background/dot";
import React from "react";
import LinearScrollProgress from "./LinearScrollProgress";

function HowItWorks() {
  return (
    <div className="flex gap-10 w-full justify-center relative">
      <div className="min-h-screen w-1/2 relative hidden md:block">
        {/* Sticky container */}
        <div className="h-80 w-full sticky top-[30%]">
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
      <div className="flex gap-7">
        {/* animated progress */}
        <LinearScrollProgress />
      </div>
    </div>
  );
}

export default HowItWorks;
