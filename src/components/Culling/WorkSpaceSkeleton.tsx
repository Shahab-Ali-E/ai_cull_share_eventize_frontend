import { Skeleton } from "@/components/ui/skeleton";

export function WorkSpacesSkeleton() {
  return (
    <div className="flex flex-wrap gap-6 ml-4">
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
  );
}
