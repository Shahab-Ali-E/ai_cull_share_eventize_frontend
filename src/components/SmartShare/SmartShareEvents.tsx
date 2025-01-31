'use client';

import React, { useEffect } from "react";
import useSmartShareStore from "@/zustand/SmartShare";
import { SmartShareEventsDataInterface } from "@/@types/smart-share";
import EventCardView from "./EventCardView";
import EventTableView from "./EventTableView";

function SmartShareEvents({ EventsData }: { EventsData: SmartShareEventsDataInterface[] }) {
  const { toggleView, setEventsData } = useSmartShareStore();

  useEffect(()=>{
    setEventsData(EventsData)
  },[EventsData, setEventsData])

  return (
    <div className="flex flex-col justify-between pb-4">
      {toggleView ? (
        <div className="flex flex-wrap gap-4 sm:gap-5">
          {EventsData.map((event, index) => (
            <EventCardView
              key={index}
              EventName={event.name}
              coverPhoto={event.cover_image}
              createdDate={event.created_at.split('T')[0]}
              size={event.total_size}
              href={`/smart-share-dashboard/${event.id}`}
            />
          ))}
        </div>
      ) : (
        <EventTableView eventsData={EventsData} />
      )}
    </div>
  );
}

export default SmartShareEvents;
