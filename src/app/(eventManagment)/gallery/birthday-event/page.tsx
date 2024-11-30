import BirthdayEventCard from "@/components/event-arrangment/gallery/birthday-event/BirthdayEventCard";
import PricingSectionCards from "@/components/event-arrangment/gallery/birthday-event/PricingCard";
import { birthdayEventData, birthdayPricingData } from "@/utils/EventArrangmentData";
import Image from "next/image";
import React from "react";
import celebrationImage from '@/images/EventArrangment/celebration_bg.png';
import RevelHeading from "@/components/RevelHeading";

function Page() {
  return (
    <section className="flex flex-col min-h-screen relative">
      {/* image */}
      <div className="w-full relative">
        <Image 
          src={celebrationImage}
          alt="celebration"
          unoptimized
          className="absolute"
        />
      </div>
      {/* other content */}
      <div className="flex flex-col space-y-8 sm:space-y-20 mt-24 sm:mt-56">
        <div className="flex flex-col space-y-0 sm:space-y-3 justify-center items-center">
          {/* heading */}
          <RevelHeading
            heading="Birthday Party"
            placeholderColor="#ff4446"
            description="We ensure to manage everything from planning to execution, be it
              food, decoration, entertainment or anything else that you have in
              mind. We provide you with innovative ideas and events that, you
              would be proud to host and your guests would remember forever!"
          />
        </div>

        {/* birthday events */}
        <div className="flex flex-col">
          <BirthdayEventCard
            data={birthdayEventData}
          />
        </div>

        {/* pricing */}
        <div className="flex flex-col">
          <PricingSectionCards 
            data={birthdayPricingData}
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
