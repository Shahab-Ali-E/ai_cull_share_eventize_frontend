import React, { Suspense } from 'react'
import EventDetails from './EventDetail'
import FormSkeleton from '../loading'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Event | Step 2",
  description: "Provide event details including date, location, and other relevant information. Complete Step 2 to proceed to the next stage of the multi-step form.",
  keywords: [
    "multi-step form",
    "event details form",
    "step 2 form",
    "event booking",
    "event information"
  ],
};

function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <EventDetails />
    </Suspense>
  )
}

export default Page
