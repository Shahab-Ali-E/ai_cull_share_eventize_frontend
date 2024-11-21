import React from "react";

function StepDescription({heading, description}:{heading:string, description:string}) {
  return (
    <div className="flex flex-col max-w-lg ">
      <h2 className="text-3xl font-semibold text-primary mb-2">{heading}</h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default StepDescription;
