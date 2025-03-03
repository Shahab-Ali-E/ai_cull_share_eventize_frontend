import React, { Suspense } from 'react'
import AdditionalInformation from './AdditionalInformation'
import FormSkeleton from '../loading'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Event | Step 4",
  description: "Provide additional details and special requirements for your event. Complete Step 4 to proceed to the final review stage.",
  keywords: [
    "multi-step form",
    "additional event details",
    "step 4 form",
    "event requirements",
    "special requests"
  ],
};


function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <AdditionalInformation />
    </Suspense>
  )
}

export default Page