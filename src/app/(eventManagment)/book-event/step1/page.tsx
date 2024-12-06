import React, { Suspense } from 'react';
import PersonalInformation from './PersonalInformation';
import FormSkeleton from '../loading';

// Personal Information step
function Page() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <PersonalInformation />
    </Suspense>
  );
}

export default Page;
