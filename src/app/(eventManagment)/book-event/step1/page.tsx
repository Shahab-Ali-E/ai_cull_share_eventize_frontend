import React, { Suspense } from 'react';
import PersonalInformation from './PersonalInformation';
import FormSkeleton from '../loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Event | Step 1",
  description: "Start your application by filling in your personal details. Complete Step 1 to proceed to the next stage of the multi-step form.",
  keywords: [
    "multi-step form",
    "personal information form",
    "step 1 form",
    "user details form",
    "fill personal details"
  ],
}
// Personal Information step
function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <PersonalInformation />
    </Suspense>
  );
}

export default Page;
