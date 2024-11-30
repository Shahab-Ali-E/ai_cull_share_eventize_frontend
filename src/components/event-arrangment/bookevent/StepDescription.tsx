import { cn } from "@/lib/utils";
import React from "react";

function StepDescription({heading, description, className}:{heading:string, description:string, className?:string}) {
  return (
    <div className={cn("flex flex-col max-w-lg", className)}>
      <h2 className="text-3xl font-semibold text-primary mb-2">{heading}</h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default StepDescription;
