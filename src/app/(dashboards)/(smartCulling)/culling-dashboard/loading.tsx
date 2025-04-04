"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-5 px-6 py-2">
      {/* Upper Section Skeleton */}
      <div className="flex flex-col space-y-4">
        {/* Search Bar and Buttons Skeleton */}
        <div className="flex items-center w-full">
          {/* Search Bar Skeleton */}
          <Skeleton className="h-10 w-72 rounded-sm" />
          <div className="flex items-end ml-auto space-x-4">
            {/* Create Workspace Button Skeleton */}
            <Skeleton className="h-11 w-48 rounded-sm hidden sm:block" />
          </div>
        </div>
        <div className="flex gap-5 self-end items-center">
          {/* Sort By Dropdown Skeleton */}
          <Skeleton className="h-10 w-24  rounded-md " />
          <Skeleton className="h-10 w-36 rounded-sm hidden sm:block" />
        </div>
      </div>
      {/* Lower Section Skeleton (existing code) */}
      <div className="flex flex-wrap gap-6">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            key={index}
            className="flex flex-col justify-center w-44 md:w-[225px] rounded-xl p-2"
          >
            <Skeleton className="h-[125px] w-full rounded-xl bg-card" />
            <div className="flex flex-row mt-2 gap-x-8 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="h-10 w-full bg-card rounded-sm" />
                <Skeleton className="h-5 w-4/5 bg-card" />
              </div>
              <div className="flex flex-row w-1/4">
                <Skeleton className="h-5 w-full bg-card" />
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
