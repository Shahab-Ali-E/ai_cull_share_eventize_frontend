import { Suspense } from "react";

// components

// // apis
import { getEventById } from "@/lib/actions/EventArrangment/GetEvents";
import Await from "./Await";
import EventDetailsPage from "./EventDetailsPage";


const Page = ({ params }: { params: {event_by_id:string} }) => {
  const eventId = params.event_by_id;
  // Fetch the workspace data
  const eventByIdPromise = getEventById({ eventId });

  return (
    <Suspense > 
      <Await promise={eventByIdPromise}>
        {({ data }) => (
          <EventDetailsPage 
           eventData={data}
          />
        )}
      </Await>
    </Suspense>
    
  );
};

export default Page;
