import EventCarousal from "@/components/event-arrangment/event-arrang/EventsCarousal";
import HowItWorks from "@/components/event-arrangment/event-arrang/HowItWorks";
import MenuCard from "@/components/event-arrangment/event-arrang/MenuCard";
import TopSection from "@/components/top-section";
import { howItWorksData, menuCardData } from "@/utils/EventArrangmentData";
import React from "react";
import RevelHeading from "@/components/RevelHeading";

function Page() {
  return (
    <section className="flex flex-col space-y-10 sm:space-y-20 text-primary">
      {/* top section */}
      <TopSection
        title="We Arrange Events Within and Outside Pakistan"
        subtitle="From weddings to corporate events, we handle all processes efficiently and seamlessly."
        buttonText="Book Now"
        buttonHref="/book-event/step1"
        className="mt-10"
        revelPlaceHolderColor='#00B8B8'
      />

      {/* body */}
      <section className="flex flex-col p-0 sm:p-14 space-y-36">
        {/* how it works */}
        <div className="flex flex-col space-y-10">
          {/* heading */}
          <RevelHeading
            heading="HOW IT WORKS"
            placeholderColor="#00B8B8"
            description="Sign up, complete a simple form, and leave the rest to us. We'll handle every aspect of your event planning with precision and care, ensuring a seamless and memorable experience."
          />

          {/* how it works */}
          <HowItWorks data={howItWorksData} />
        </div>

        {/* events carousal slider */}
        <div className="flex flex-col space-y-14">
          {/* heading */}
          <RevelHeading
            heading="YOUR DREAM EVENT"
            placeholderColor="#00B8B8"
            description="We provide countless options from Wedding to Birthday party or corporate event
              We have various interactive ideas, you can mix and match all
              elements to design the perfect event for you."
          />
        
          {/* slider */}
          <EventCarousal />
        </div>

        {/* our gallery */}
        <div className="flex flex-col space-y-10">
          {/* heading */}
          <RevelHeading
            heading="OUR MENUS"
            placeholderColor="#00B8B8"
            description="Explore our diverse food menus and craft a personalized culinary experience tailored to your event. Let us help you bring your unique style to life with a selection of dishes that perfectly suit your taste and vision."
          />
          
          <div className="flex flex-col px-2 sm:px-24 space-y-14 sm:space-y-10 overflow-x-hidden">
            {menuCardData.map((data, index) => (
              <MenuCard
                id={`${index}`}
                key={index}
                index={index}
                description={data.description}
                heading={data.heading}
                href={data.href}
                src={data.src}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Page;
