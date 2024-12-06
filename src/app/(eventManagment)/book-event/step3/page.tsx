import React, { Suspense } from 'react'
import Destination from './Destination'
import FormSkeleton from '../loading'

function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <Destination />
    </Suspense>
  )
}

export default Page