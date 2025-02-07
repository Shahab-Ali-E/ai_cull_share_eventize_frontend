import { EventDetails } from "@/@types/event-managment";
import EventDetailsCard from "@/components/event-arrangment-dashboard/event_by_id/EventDetailsCard";
import React from "react";


function EventDetailsPage({ eventData }:{ eventData?:EventDetails}) {
  if(!eventData){
    return <section>
        <h1>Not found</h1>
    </section>
  }
  return (
    <section className="flex flex-col px-4 sm:px-6 space-y-4">
      <EventDetailsCard event={eventData}/>
    </section>
  );
}

export default EventDetailsPage;
