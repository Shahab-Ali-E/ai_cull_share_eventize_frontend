import { Metadata } from "next";
import { getAnalytics } from "@/lib/actions/Dashboard/Analytics";
import { Suspense } from "react";
import Await from "./Await";
import DashboardPage from "./DashboardPage";
import StorageCard from "@/components/dashboard/StorageCard";
import CollapsibleTable from "@/app/(dashboards)/dashboard/CollapsibleTable";
import { GetUserStorage } from "@/lib/actions/Dashboard/GetUserStorage";
import StorageCardSkeleton, { AnalyticsSkeleton, CollapsibleTableSkeleton } from "@/components/dashboard/Skeletons";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function Page() {
  // calling the API from backend to get analytics data
  const analyticsPromise = getAnalytics();
  // calling the API from backend to get storage data
  const storageDataPromise = GetUserStorage();

  return (
    <div className="flex-col md:flex pt-6 p-8 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-12 ">
        <Suspense
          fallback={<AnalyticsSkeleton />}
        >
          <Await promise={analyticsPromise}>
            {({ data }) => <DashboardPage analyticsData={data} />}
          </Await>
        </Suspense>
        {/* storage card */}
        <div className="col-span-3 pt-4 md:pt-0 pl-0 md:pl-4 flex flex-col gap-4 ">
          {/* smart culling storage */}
          <Suspense
            fallback={
               <StorageCardSkeleton />
            }
          >
            <Await promise={storageDataPromise}>
              {({ data }) => (
                <StorageCard
                  title="Smart Culling Storage"
                  totalStorage={data?.total_smart_culling_storage || 0}
                  storageUsed={
                    parseInt(data?.total_smart_culling_storage_used || "0") || 0
                  }
                />
              )}
            </Await>
          </Suspense>
          {/* smart share storage */}
          <Suspense
            fallback={
               <StorageCardSkeleton />
            }
          >
            <Await promise={storageDataPromise}>
              {({ data }) => (
                <StorageCard
                  title="Smart Share Storage"
                  totalStorage={data?.total_smart_share_storage || 0}
                  storageUsed={
                    parseInt(data?.total_smart_share_storage_used || "0") || 0
                  }
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      {/* visitors of table */}
      <div className="pt-4 md:pt-0">
        <Suspense
          fallback={<CollapsibleTableSkeleton />}
        >
          <Await promise={analyticsPromise}>
            {({ data }) => (
              <CollapsibleTable eventAccessData={data?.user_event_access} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
