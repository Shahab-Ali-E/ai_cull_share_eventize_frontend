import GetStartedButton from "@/components/animata/button/get-started";
import React from "react";
import SlideInFromBottom from "../SlideInFromBottom";


function EventArrangementHeroSection() {
  return (
    <section className="flex flex-col mt-14">
      <div className="font-workSans">
        {/* text section */}
        <SlideInFromBottom duration={0.4} delay={0}>
            <h1 className="text-6xl font-medium">
            Seamless Event <br /> Planning Unforgettable <br /> Experiences
            </h1>
        </SlideInFromBottom>
        <SlideInFromBottom duration={0.5} delay={0.3}>
            <p className="mt-4 font-inter text-lg">
            Plan, manage, and execute events effortlessly <br /> with our
            all-in-one platform.
            </p>
        </SlideInFromBottom>

        {/* buttons here get started */}
        <div className="mt-9 ">
          <SlideInFromBottom duration={0.4} delay={0.5}>
            <GetStartedButton  text="Book Event" />
          </SlideInFromBottom>
        </div>
      </div>
    </section>
  );
}

export default EventArrangementHeroSection;
