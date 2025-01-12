// pages/CullingDashboardPage.tsx
import React from "react";

//components
import EventCard from "@/components/SmartShare/EventCard";
import GetStarted from "./GetStarted";
import { SmartShareEventDataInterface } from "@/@types/smart-share";

export default function SmartShareDashboardPage({ Events }: { Events: SmartShareEventDataInterface[] | undefined }) {

  const EventData: SmartShareEventDataInterface[] = Events || [];

  // if there's not created any event then show get started
  if (EventData.length === 0) {
    return <div><GetStarted /></div>;
  }

  return (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10 p-3">
        {EventData.map((event, index) => (
          <EventCard
            key={index}
            EventName={event.name}
            createdDate={event.created_at.split("T")[0]}
            size={event.total_size}
            coverPhoto={event.cover_image}
            href={`/smartshare-dashboard/${event.id}`}
          />
        ))}
      </div>
    </div>
  );
}
