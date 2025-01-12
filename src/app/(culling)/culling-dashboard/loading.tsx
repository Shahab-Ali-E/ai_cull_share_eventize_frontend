"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-3">
        {/* Upper Section Skeleton */}
        <div className="flex flex-col space-y-4">
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-48 rounded-sm" />

            {/* Search Bar and Buttons Skeleton */}
            <div className="flex items-center w-full">
                {/* Search Bar Skeleton */}
                <Skeleton className="h-10 w-80 rounded-md" />
                <div className='flex items-end ml-auto space-x-4'>
                    {/* storage usage skeleton */}
                    <div className="flex flex-col space-y-2 justify-end items-end">
                        <Skeleton className="h-2 w-96 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-sm" />
                    </div>
                    {/* Sort By Dropdown Skeleton */}
                    <Skeleton className="h-9 w-24 rounded-md " />
                    {/* Create Workspace Button Skeleton */}
                    <Skeleton className="h-11 w-48 rounded-full hidden sm:block" />
                </div>
            </div>
            
            {/* Divider Line Skeleton */}
            <Skeleton className="h-px w-full bg-gray-600" />
        </div>
        {/* Lower Section Skeleton (existing code) */}
        <div className="flex justify-center">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 p-3 w-full">
                {[...Array(12)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className="flex flex-col justify-center h-56 w-full rounded-xl p-2"
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
    </div>
 
  );
}
