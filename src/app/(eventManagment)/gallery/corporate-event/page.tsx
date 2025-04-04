import CorporateEventCard from "@/components/event-arrangment/gallery/corporate-event/CorporateEventCard";
import { corporateEventsData } from "@/utils/EventArrangmentData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Event Arrangement | Gallery | Coporate Events",
    description:
      "Discover our corporate event planning services, including conferences, product launches, and business gatherings. We ensure flawless execution and impactful experiences.",
    keywords: [
      "corporate event",
      "business event planning",
      "conference management",
      "product launch",
      "corporate meetings",
      "seminar planning",
      "networking events",
      "business gatherings",
      "professional event services",
    ],
  };
  

function Page() {
  return (
    <section className="flex flex-col min-h-screen space-y-16">
      <div className="flex flex-col space-y-0 sm:space-y-24 justify-center items-center">
        {/* heading */}
        <div className={"flex flex-col items-center text-center"}>
          <h1 className="text-[#66a0fe] dark:text-[#81b1ff] text-3xl md:text-4xl font-semibold">
            Corporate Event
          </h1>
          <p
            className={
              "mt-2 text-lg max-w-3xl font-inter font-medium text-muted-foreground"
            }
          >
            We organize exceptional corporate events, from conferences to
            product launches, ensuring flawless execution and lasting
            impressions.
          </p>
        </div>
      </div>

      {/* corporate events */}
      <div className="flex flex-col space-y-20">
        {corporateEventsData.map((data, index) => (
          <div key={index}>
            <CorporateEventCard
              heading={data.heading}
              description={data.description}
              src={data.src}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
