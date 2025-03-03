import React, { Suspense } from "react";
import EventAvailabilityPage from "./EventAvailabilityPage";
import FaceRecognitionPage from "./FaceRecognitionPage";
import { getPublishedEvent } from "@/lib/actions/SmartShare/GetEvents";
import Await from "./Await";
import FaceRecognitionResultPage from "./FaceRecognitionResultPage";

async function Page({ params }: { params: { slug: string[] } }) {
  if (params?.slug && params.slug.length > 0) {
    // Fetch event details for validation
    const eventId = params.slug[0];
    const getEventDetailsPromise = getPublishedEvent({ eventId });

    // Check for event details when slug has one or two segments
    if (params.slug.length === 1) {
      return (
        <section>
          <Suspense>
            <Await promise={getEventDetailsPromise}>
              {({ data }) => <EventAvailabilityPage eventData={data} />}
            </Await>
          </Suspense>
        </section>
      );
    }

    if (params.slug.length === 2 && params.slug[1] === "face-recognition") {
      return (
        <section>
          <Suspense>
            <Await promise={getEventDetailsPromise}>
              {() => <FaceRecognitionPage eventId={eventId}/>}
            </Await>
          </Suspense>
        </section>
      );
    }

    if (params.slug.length === 2 && params.slug[1] === "images") {
      return (
        <section>
          <FaceRecognitionResultPage />
        </section>
      );
    }
  }

  // Default fallback for invalid URLs
  return (
    <section>
      <h1 className="text-primary text-xl">Not found</h1>
    </section>
  );
}

export default Page;
