"use client";

// pages/(dashboards)/event-arrangement-dashboard/EventsDashboardsPage.tsx
import React from "react";

//components
import { EventDetails } from "@/@types/event-managment";
import Events from "@/components/event-arrangment-dashboard/Events";

// icons
import AstronautFishing from "@/images/icons/astronaut_fishing.svg";
import GradientButton from "@/components/ui/gradient-button";
import Link from "next/link";

export default function EventDashboardPage({
  events,
}: {
  events: EventDetails[] | undefined;
}) {
  const eventsData: EventDetails[] = events || [];

  // if there's not uploaded image found in culling then show this get Started
  if (eventsData.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center text-center">
        <AstronautFishing className="dark:fill-white h-60 w-60" />
        <h1 className="text-lg sm:text-xl font-bold text-primary">
          No Events Booked
        </h1>
        <p className="text-xs sm:text-sm w-3/4 md:w-full font-medium text-primary mt-1">
          🎉 Plan your perfect event—whether it&apos;s a wedding, party, or
          birthday. Start booking now! 🎊
        </p>
        <div className="flex justify-center w-1/4 mt-3 invisible md:visible">
          <GradientButton
            className="w-1/2 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
            asChild
          >
            <Link href={"/book-event/step1"}>Book Event</Link>
          </GradientButton>
        </div>
      </div>
    );
  }

  return <Events events={eventsData} />;
}
