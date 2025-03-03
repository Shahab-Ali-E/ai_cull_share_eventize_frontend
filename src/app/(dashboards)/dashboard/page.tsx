import { Metadata } from "next";
import { getAnalytics } from "@/lib/actions/Dashboard/Analytics";
import { Suspense } from "react";
import Await from "./Await";
import Loading from "./loading";
import dynamic from "next/dynamic";
import StorageCardSkeleton, { ChartPageSkeleton, CollapsibleTableSkeleton } from "@/components/dashboard/Skeletons";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function Page() {
  // calling the API from backend to get analytics data
  const analyticsPromise = getAnalytics();

  // importing client components for overcoming the hydration error
  const ChartPage = dynamic(()=>import("./ChartPage"),{
    ssr: false,
    loading: () => <ChartPageSkeleton />,
  });

  const StorageCard = dynamic(()=>import("@/components/dashboard/StorageCard"),{
    ssr: false,
    loading: () => <StorageCardSkeleton />,
  });

  const CollapsibleTable = dynamic(()=>import("./CollapsibleTable"),{
    ssr: false,
    loading: () => <CollapsibleTableSkeleton />,
  });



  return (
    <Suspense fallback={<Loading />}>
      <Await promise={analyticsPromise}>
        {({ data }) => (
          <div className="flex-col md:flex pt-6 p-8 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-12 ">
              <ChartPage analyticsData={data} />

              {/* storage card */}
              <div className="col-span-3 pt-4 md:pt-0 pl-0 md:pl-4 flex flex-col gap-4 ">
                {/* smart culling storage */}
                <StorageCard
                  title="Smart Culling Storage"
                  totalStorage={data?.total_smart_culling_storage || 0}
                  storageUsed={
                    parseInt(data?.total_smart_culling_storage_used || "0") || 0
                  }
                />

                {/* smart share storage */}
                <StorageCard
                  title="Smart Share Storage"
                  totalStorage={data?.total_smart_share_storage || 0}
                  storageUsed={
                    parseInt(data?.total_smart_share_storage_used || "0") || 0
                  }
                />
              </div>
            </div>
            {/* visitors of table */}
            <div className="pt-4 md:pt-0">
              <CollapsibleTable eventAccessData={data?.user_event_access} />
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
