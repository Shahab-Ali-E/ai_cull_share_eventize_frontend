'use client'
// loading.tsx for dynamic workspace
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center ">
        {/* for header */}
        <div className="flex flex-row items-center justify-between p-5 pl-9 pr-10">
            <div className="flex flex-row space-x-2">
                <Skeleton className="h-12 w-12 rounded-full"/>
                <Skeleton className="h-11 w-72 "/>
            </div>
            <Skeleton className="h-12 w-56 rounded-full "/>
        </div>
        <Skeleton className="bg-card-foreground h-[1px] w-full"/>
        {/* for footer */}
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-10 p-6 mt-10">
        {[...Array(15)].map((_, index) => (
            <Skeleton
            key={index}
            className="flex flex-col justify-center h-48 w-64 rounded-2xl p-2  "
            />
        ))}
        </div>
    </div>
  );
}
