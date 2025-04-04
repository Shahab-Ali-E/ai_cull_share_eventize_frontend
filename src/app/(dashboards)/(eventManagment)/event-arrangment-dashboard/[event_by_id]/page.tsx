import { Suspense } from "react";

// components

// // apis
import { getEventById } from "@/lib/actions/EventArrangment/GetEvents";
import Await from "./Await";
import EventDetailsPage from "./EventDetailsPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { event_by_id: string };
}): Promise<Metadata> {
  const eventId = params.event_by_id;
  const eventData = await getEventById({ eventId });

  if (!eventData.data) {
    return {
      title: "Event Not Found",
      description: "The event you are looking for does not exist.",
      keywords: ["event not found", "event booking error"],
    };
  }

  return {
    title: `Event Arrangement Dashboard | ${eventData.data.eventType} event`,
    description: `View and manage your booked ${eventData.data.eventType} event. Access event details, attendees, and more.`,
    keywords: [
      "event booking",
      "event details",
      "manage booked event",
      "view event information",
      "event dashboard",
      "event attendees",
      `${eventData.data.eventType} event`,
    ],
    openGraph: {
      title: `Book Event | ${eventData.data.eventType} Details`,
      description: `Manage your booked ${eventData.data.eventType} event. Access full details, attendees, and event timeline.`,
      url: `https://yourwebsite.com/book-event/${eventId}`,
      type: "website",
      images: [
        {
          url: "https://yourwebsite.com/images/event-details-preview.jpg",
          width: 1200,
          height: 630,
          alt: "Event Details Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Book Event | ${eventData.data.eventType} Details`,
      description: `View and manage your booked ${eventData.data.eventType} event. Access event details and attendees.`,
      images: ["https://yourwebsite.com/images/event-details-preview.jpg"],
    },
  };
}

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
