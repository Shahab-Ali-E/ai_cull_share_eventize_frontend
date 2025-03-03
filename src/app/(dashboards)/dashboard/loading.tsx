"use client";

import StorageCardSkeleton, {
  ChartPageSkeleton,
  CollapsibleTableSkeleton,
} from "@/components/dashboard/Skeletons";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col  pt-6 p-8 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-12 ">
        <ChartPageSkeleton />
        <div className="col-span-3 pt-4 md:pt-0 pl-0 md:pl-4 flex flex-col gap-4 ">
          <StorageCardSkeleton />
          <StorageCardSkeleton />
        </div>
      </div>
      {/* visitors of table */}
      <div className="pt-4 md:pt-0">
        <CollapsibleTableSkeleton />
      </div>
    </div>
  );
}

export default Loading;
