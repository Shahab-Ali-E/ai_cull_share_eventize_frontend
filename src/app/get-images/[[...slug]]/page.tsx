import React, { Suspense } from "react";
import EventAvailabilityPage from "./EventAvailabilityPage";
import FaceRecognitionPage from "./FaceRecognitionPage";
import { GetEventById } from "@/lib/actions/SmartShare/GetEvents";
import Await from "./Await";
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

function Page({ params }: { params: { slug: string[] } }) {
  if (params?.slug && params.slug.length > 0) {
    // Fetch event details for validation
    const eventId = params.slug[0];
    const getEventDetailsPromise = GetEventById({ eventId });

    // checking if the user has already visited the event and filled out the form then redirect them to FaceRecognitionPage
    const user_id = cookies().get('user_id')?.value as string;
    console.log("user id ", user_id)
    if (user_id){
      redirect(`get-images/${eventId}/face-recognition`)
    }

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
          <h1>Images here</h1>
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
