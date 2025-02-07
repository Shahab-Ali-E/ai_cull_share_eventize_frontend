"use client";

import React from "react";
import EventCard from "./EventCard";
import EventTable from "./EventTable";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import { EventDetails } from "@/@types/event-managment";

function Events({events}:{events:EventDetails[]}) {
  const { toggleView } = useEventArrangementStore();

  return (
    <div className="flex flex-col justify-between pb-4">
      {toggleView ? (
        <div className="flex flex-wrap gap-4 sm:gap-5">
          {events.map((event) => (
            <EventCard
              key={event.id}
              eventType={event.eventType}
              bookedDate={event.submittedAt.split('T')[0]}
              bookedBy={event.fullName}
              country={`${event.city}, ${event.selectCountry}`}
              budget={event.budget}
              href={`/event-arrangment-dashboard/${event.id}`}
            />
          ))}
        </div>
      ) : (
        <EventTable events={events} />
      )}
    </div>
  );
}

export default Events;
