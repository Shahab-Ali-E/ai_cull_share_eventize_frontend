import React from "react";

function WhyChooseUs({ icon, title, description }:{icon: JSX.Element, title: string, description: string}) {
  return (
    <div className="group flex flex-col h-full w-full rounded-md bg-primary-foreground outline outline-1 outline-gray-300/20 overflow-hidden z-0">
      {/* icon and glowing */}
      <div className="flex w-full justify-between">
        {/* icon */}
        <div className="p-7">{icon}</div>

        {/* Hover Glow Effect */}
        <div className="relative h-40 w-40 z-10">
          <div className="absolute top-0 right-0 h-44 w-60 scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out bg-gradient-to-bl from-white from-20% via-[#81b1ff] via-10% to-[#4512A1] to-70% blur-2xl transform origin-top-right"></div>
        </div>
      </div>

      {/* heading */}
      <div className="flex flex-col space-y-2 font-inter max-w-72 p-7">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
    </div>
  );
}

export default WhyChooseUs;
