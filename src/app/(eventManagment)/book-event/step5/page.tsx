import React, { Suspense } from 'react'
import Review from './Review'
import ReviewLoadingSkeleton from './loading'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Event | Step 5",
  description: "Review all the provided details before final submission. Ensure everything is accurate before completing your booking.",
  keywords: [
    "multi-step form",
    "review event details",
    "step 5 form",
    "final review",
    "submit event form"
  ],
};


function Page() {
  return (
    <Suspense fallback={<ReviewLoadingSkeleton />}>
      <Review />
    </Suspense>
  )
}

export default Page