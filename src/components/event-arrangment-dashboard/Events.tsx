"use client";

import React from "react";
import EventCard from "./EventCard";
import EventTable from "./EventTable";
import image from '@/images/closed_eyes.jpg'
import useEventArrangementStore from "@/zustand/EventArrangementStore";

function Events() {
    const events = [
        {
          id: 1,
          name: "Shahab Ali",
          email: "malikshahabali@gmail.com",
          eventType: "Conference",
          country: "Pakistan",
          bookedDate: "2024-04-10",
          budget:10000,
        },
        {
          id: 2,
          name: "Ayesha Khan",
          email: "ayesha.khan@example.com",
          eventType: "Wedding",
          country: "United States",
          bookedDate: "2024-05-15",
          budget:10000,
        },
        {
          id: 3,
          name: "Omar Farooq",
          email: "omar.farooq@example.com",
          eventType: "Music Concert",
          country: "United Kingdom",
          bookedDate: "2024-03-22",
          budget:10000,
        },
        {
          id: 4,
          name: "Sara Ahmed",
          email: "sara.ahmed@example.com",
          eventType: "Birthday Party",
          country: "Canada",
          bookedDate: "2024-06-30",
          budget:10000,
        },
      ];
      
    const {toggleView} = useEventArrangementStore();

  return (

    <div className="flex flex-col justify-between pb-4">
      {toggleView ? (
        <div className="flex flex-wrap gap-4 sm:gap-5">
          {events.map((event) => (
            <EventCard
              key={event.id}
              eventType={event.eventType}
              bookedDate={event.bookedDate}
              bookedBy={event.name}
              country={event.country}
              href={`/event/${event.id}`}
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
