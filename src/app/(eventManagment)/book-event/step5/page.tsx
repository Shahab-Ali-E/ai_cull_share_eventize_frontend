import React, { Suspense } from 'react'
import Review from './Review'
import ReviewLoadingSkeleton from './loading'

function Page() {
  return (
    <Suspense fallback={<ReviewLoadingSkeleton />}>
      <Review />
    </Suspense>
  )
}

export default Page