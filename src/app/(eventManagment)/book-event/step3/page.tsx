import React, { Suspense } from 'react'
import Destination from './Destination'
import FormSkeleton from '../loading'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Event | Step 3",
  description: "Specify your event destination, including venue details and location preferences. Complete Step 3 to proceed to the next stage of the multi-step form.",
  keywords: [
    "multi-step form",
    "destination details",
    "event venue",
    "step 3 form",
    "select event location"
  ],
};


function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <Destination />
    </Suspense>
  )
}

export default Page