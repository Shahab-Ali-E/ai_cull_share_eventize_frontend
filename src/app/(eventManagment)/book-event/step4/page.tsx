import React, { Suspense } from 'react'
import AdditionalInformation from './AdditionalInformation'
import FormSkeleton from '../loading'

function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <AdditionalInformation />
    </Suspense>
  )
}

export default Page