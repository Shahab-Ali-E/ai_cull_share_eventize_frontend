import { Skeleton } from "@/components/ui/skeleton";

export function WorkSpacesSkeleton() {
  return (
    <div className="flex justify-center">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10 p-3">
        {[...Array(10)].map((_, index) => (
            <Skeleton
            key={index}
            className="flex flex-col justify-center h-56 w-80 rounded-xl p-2"
            >
            <Skeleton className="h-[125px] w-[300px] rounded-xl bg-card" />
            <div className="flex flex-row mt-2 gap-x-8">
                <div className="flex flex-col space-y-2">
                <Skeleton className="h-10 w-[200px] bg-card rounded-sm" />
                <Skeleton className="h-5 w-[180px] bg-card" />
                </div>
                <div className="flex flex-row">
                <Skeleton className="h-5 w-[60px] bg-card" />
                </div>
            </div>
            </Skeleton>
        ))}
        </div>
    </div>
  );
}
