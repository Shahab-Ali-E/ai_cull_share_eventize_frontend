import React from "react";
import RevealYAxis from "./slide-in-y-axis";
import { Label } from "./ui/label";
import ShiningButton from "./animata/button/shining-button";
import { TopSectionProps } from "@/@types/Types";

const TopSection: React.FC<TopSectionProps> = ({
    title,
    subtitle,
    buttonText,
    buttonHref,
    rightSideComp,
    className = "",
    revelPlaceHolderColor = "",
    gradientColorLeft ,
    gradientColorRight ,
  }) => {
    return (
      <section className={`flex flex-col sm:flex-row ${className}`}>
        {/* Text and button */}
        <div className="flex flex-col justify-center w-full text-center sm:text-left sm:w-1/2">
          <RevealYAxis className="max-w-md mb-3" placeHolderColor={revelPlaceHolderColor}>
            <Label className="font-bold text-3xl sm:text-4xl uppercase">{title}</Label>
          </RevealYAxis>
          <RevealYAxis className="max-w-md" placeHolderColor={revelPlaceHolderColor}>
            <Label className="text-lg sm:text-xl">{subtitle}</Label>
          </RevealYAxis>
  
          <div className="mt-2 sm:mt-0 flex justify-center sm:justify-start">
            <ShiningButton label={buttonText} href={buttonHref} gradientColorLeft={gradientColorLeft} gradientColorRight={gradientColorRight}/>
          </div>
        </div>
  
        {/* Video or media */}
        <div className="w-full sm:w-1/2 flex justify-center items-center sm:visible invisible">
          {rightSideComp}
        </div>
      </section>
    );
  };
  
export default TopSection;
