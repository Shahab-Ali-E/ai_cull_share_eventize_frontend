"use client";
// loading.tsx for dynamic workspace
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center space-y-20">
      {/* for header */}
      <div className="flex flex-row items-center justify-between p-5">
        <div className="flex flex-row space-x-2">
          <Skeleton className="h-9 w-9 sm:h-12 sm:w-12 rounded-full" />
          <Skeleton className="h-9 w-32 sm:h-11 sm:w-72 " />
        </div>
        <Skeleton className="h-10 w-44 sm:h-12 sm:w-56 rounded-full " />
      </div>
      {/* <Skeleton className="bg-card-foreground h-[1px] w-full"/> */}

      {/* for body */}
      <div className="grid grid-col-5 sm:grid-cols-5 gap-3 mt-0 sm:mt-5 p-4">
        {[...Array(15)].map((_, index) => (
         <Skeleton
         key={index}
         className="
           h-20
           sm:h-28 
           md:h-40 
           lg:h-64 
           xl:h-64 
           rounded-2xl"
       />
       
        ))}
      </div>
    </div>
  );
}
