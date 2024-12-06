"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ReviewLoadingSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-between space-y-14">
      {/* Step Description */}
      <div>
        <Skeleton className="h-7 w-2/3 rounded-sm" /> {/* Title */}
        <Skeleton className="h-5 w-1/2 mt-2 rounded-sm" /> {/* Subtitle */}
      </div>

      {/* Card Content Skeleton */}
      <div className="flex flex-col w-full space-y-6">
        {
            Array.from({length:4}).map((_,index)=>(
                <Skeleton key={index} className="grid grid-cols-2 gap-4 p-5">
                    {/* Left Column */}
                    <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-start space-x-3 p-1">
                        <Skeleton className="h-5 w-5 rounded-full" />{" "}
                        {/* Icon Skeleton */}
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-4 w-1/2 rounded-md" />{" "}
                            {/* Heading Skeleton */}
                            <Skeleton className="h-4 w-2/3 rounded-md" />{" "}
                            {/* Content Skeleton */}
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-start space-x-3 p-1">
                        <Skeleton className="h-5 w-5 rounded-full" />{" "}
                        {/* Icon Skeleton */}
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-4 w-1/2 rounded-md" />{" "}
                            {/* Heading Skeleton */}
                            <Skeleton className="h-4 w-2/3 rounded-md" />{" "}
                            {/* Content Skeleton */}
                        </div>
                        </div>
                    ))}
                    </div>
                </Skeleton>
            ))
        }
      </div>

      {/* Submit and Back Buttons */}
      <div className="flex justify-between">
        <Skeleton className="h-11 w-24 rounded-sm" /> {/* Back Button */}
        <Skeleton className="h-11 w-28 rounded-sm" /> {/* Submit Button */}
      </div>
    </div>
  );
};

export default ReviewLoadingSkeleton;
