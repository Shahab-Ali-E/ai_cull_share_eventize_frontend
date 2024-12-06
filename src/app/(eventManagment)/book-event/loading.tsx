import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-between space-y-14">
      {/* Step Description */}
      <div className="">
        <Skeleton className="h-7 w-2/3 rounded-sm" /> {/* Title */}
        <Skeleton className="h-5 w-1/2 mt-2 rounded-sm" /> {/* Subtitle */}
      </div>

      {/* Form Fields */}
      <div className="flex flex-col space-y-7">
        <div>
          <Skeleton className="h-6 w-1/4 mb-2 rounded-sm" />
          <Skeleton className="h-10 w-full rounded-sm" />
          <Skeleton className="h-4 w-1/2 mt-2 rounded-sm" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/4 mb-2 rounded-sm" />
          <Skeleton className="h-10 w-full rounded-sm" />
          <Skeleton className="h-5 w-1/2 mt-2 rounded-sm" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/4 mb-2 rounded-sm" />
          <Skeleton className="h-10 w-full rounded-sm" />
          <Skeleton className="h-5 w-1/2 mt-2 rounded-sm" />
        </div>

        {/* Budget */}
        <div>
          <Skeleton className="h-6 w-1/4 mb-2 rounded-sm" />
          <Skeleton className="h-10 w-full rounded-sm" />
          <Skeleton className="h-5 w-1/2 mt-2 rounded-sm" />
        </div>
      </div>

      {/* Submit and Back Buttons */}
      <div className="flex justify-between">
        <Skeleton className="h-11 w-24 rounded-sm" /> {/* Back Button */}
        <Skeleton className="h-11 w-24 rounded-sm" /> {/* Submit Button */}
      </div>
    </div>
  );
};

export default FormSkeleton;
