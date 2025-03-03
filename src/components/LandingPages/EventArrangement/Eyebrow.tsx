import React from "react";

function Eyebrow({heading, description}: {heading: string, description: string}) {
  return (
    <div className="flex flex-col items-center font-inter text-center">
      <p className="text-[#81b1ff] text-sm">{heading}</p>
      <h1 className="text-4xl mt-1 max-w-3xl font-inter font-medium">
        {description}
      </h1>
    </div>
  );
}

export default Eyebrow;
