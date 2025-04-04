import { cn } from "@/lib/utils";
import React from "react";

function Eyebrow({heading, description, className, descriptionClassName}: {heading: string, description: string; className?: string; descriptionClassName?: string}) {
  return (
    <div className={cn("flex flex-col items-center font-inter text-center", className)}>
      <p className="text-[#66a0fe] dark:text-[#81b1ff] text-sm">{heading}</p>
      <h1 className={cn("text-3xl md:text-4xl mt-1 max-w-3xl font-inter font-medium", descriptionClassName)}>
        {description}
      </h1>
    </div>
  );
}

export default Eyebrow;
