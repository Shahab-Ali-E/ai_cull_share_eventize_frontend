import BirthdayEventCard from "@/components/event-arrangment/gallery/birthday-event/BirthdayEventCard";
import PricingSectionCards from "@/components/event-arrangment/gallery/birthday-event/PricingCard";
import {
  birthdayEventData,
  birthdayPricingData,
} from "@/utils/EventArrangmentData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Event Arrangement | Gallery | Birthday Events",
  description:
    "Explore our exclusive birthday party packages that cover everything from planning and food to decor and entertainment. Host an unforgettable celebration with our complete facilities.",
  keywords: [
    "birthday party",
    "party packages",
    "event planning",
    "celebration",
    "food and decor",
    "entertainment",
    "birthday facilities",
    "unforgettable event",
  ],
};


function Page() {
  return (
    <section className="flex flex-col min-h-screen relative font-inter">
      {/* other content */}
      <div className="flex flex-col space-y-8 md:space-y-20">
        <div className="flex flex-col space-y-0 md:space-y-4 justify-center items-center">
          {/* heading */}
          <div className={"flex flex-col items-center text-center"}>
            <h1 className="text-[#66a0fe] dark:text-[#81b1ff] text-3xl md:text-4xl font-semibold">
              Birthday Party
            </h1>
            <p
              className={"mt-2 text-lg max-w-3xl font-inter font-medium text-muted-foreground"}
            >
             We manage every detail from planning and execution to food, decor, and entertainment to create an unforgettable event.
            </p>
          </div>
        </div>

        {/* birthday events */}
        <div className="flex flex-col">
          <BirthdayEventCard data={birthdayEventData} />
        </div>

        {/* pricing */}
        <div className="flex flex-col w-full items-center">
          <PricingSectionCards data={birthdayPricingData} />
        </div>
      </div>
    </section>
  );
}

export default Page;
