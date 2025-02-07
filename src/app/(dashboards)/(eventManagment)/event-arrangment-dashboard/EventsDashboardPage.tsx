// pages/(culling)/culling-dashboard/CullingDashboardPage.tsx
import React from "react";

//components
import { EventDetails } from "@/@types/event-managment";
import Events from "@/components/event-arrangment-dashboard/Events";

export default function EventDashboardPage({
  events,
}: {
  events: EventDetails[] | undefined;
}) {
  const eventsData: EventDetails[] = events || [];

  // if there's not uploaded image found in culling then show this get Started
  if (eventsData.length === 0) {
    return (
      <div>
       <h1 className="text-primary">Not found</h1>
      </div>
    );
  }

  return <Events events={eventsData}/>;
}
