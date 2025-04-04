"use client";
// loading.tsx for dynamic workspace
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center space-y-6">
      {/* for header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex self-end gap-2 items-center">
          <Skeleton className="h-6 w-36 rounded-sm" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <div className="flex flex-col items-end justify-end gap-5">
          <Skeleton className="h-11 w-44 md:w-40 rounded-sm" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24  rounded-md " />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
      </div>
      {/* <Skeleton className="bg-card-foreground h-[1px] w-full"/> */}

      {/* for body */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5">
        {[...Array(15)].map((_, index) => (
          <Skeleton key={index} className="w-full h-72 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
