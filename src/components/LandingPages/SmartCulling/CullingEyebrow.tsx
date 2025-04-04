import { cn } from "@/lib/utils";
import React from "react";

function CullingEyebrow({
  heading,
  description,
  className,
  descriptionClassName,
  headingClassName,
}: {
  heading: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  headingClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center font-inter text-center gap-2",
        className
      )}
    >
      <h1
        className={cn(
          "text-3xl md:text-5xl mt-1 max-w-3xl font-semibold text-primary",
          headingClassName
        )}
      >
        {heading}
      </h1>
      <p className={cn("text-muted-foreground text-base md:text-lg", descriptionClassName)}>
        {description}
      </p>
    </div>
  );
}

export default CullingEyebrow;
