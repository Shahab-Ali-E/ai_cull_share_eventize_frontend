import React, { Suspense } from 'react'
import EventDetails from './EventDetail'
import FormSkeleton from '../loading'

function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <EventDetails />
    </Suspense>
  )
}

export default Page
