import { Suspense } from "react";

//components
import CullingDashboardPage from "./CullingDashboardPage";
import SortByDropDown from "@/components/sortby-drop-down";
import Search from "@/components/search";
import Await from "./Await";
import CreateCullingWorkSpace from "@/components/Culling/CreateWorkSpace";

//loading skeleton
import { WorkSpacesSkeleton } from "@/components/Culling/WorkSpaceSkeleton";

//api
import { getAllWorkSpaces } from "@/lib/actions/Culling/GetUserWorkSpaces";
import GridListView from "@/components/Culling/GridListView";
import { PaginationWithLink } from "@/components/pagination-with-links";
import { Metadata } from "next";
import { getClerkToken } from "@/lib/actions/clerk-token";

export const metadata: Metadata = {
  title: "Culling Dashboard",
  description:
    "Create, manage, and organize your culling workspaces. View workspace details, sort, paginate, and delete workspaces to maintain an efficient photo culling process.",
  keywords: [
    "culling dashboard",
    "workspace management",
    "create culling workspaces",
    "sort culling workspaces",
    "paginate workspaces",
    "delete culling workspaces",
    "AI image culling",
  ],
  openGraph: {
    title: "Culling Dashboard",
    description:
      "Create, manage, and organize your culling workspaces. View workspace details, sort, paginate, and delete workspaces to maintain an efficient photo culling process.",
    url: "https://yourwebsite.com/culling-dashboard",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/images/culling-dashboard-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Culling Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Culling Dashboard",
    description:
      "Create, manage, and organize your culling workspaces. View workspace details, sort, paginate, and delete workspaces to maintain an efficient photo culling process.",
    images: ["https://yourwebsite.com/images/culling-dashboard-preview.jpg"],
  },
};

type SearchParams = {
  sort_order: string | undefined;
  sort_by: string | undefined;
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

const CullingDashboard = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // getting clerk token to access backend end apis
  const token = await getClerkToken();
  // calling the API from backend to get workspaces
  const workSpacesPromise = getAllWorkSpaces({
    sort_order: searchParams.sort_order,
    sort_by: searchParams.sort_order,
    search: searchParams.search,
    page: searchParams.page || 1,
    limit: searchParams.limit || 10,
    token:token
  });

  return (
    <section className="flex flex-col px-3 sm:px-6 overflow-y-auto">
      <div className="flex flex-col pb-5 space-y-3">
        <div className="flex space-x-4 justify-between p-1">
          {/* Left side: My Cullings label and Search box */}
          <div className="flex flex-col w-full sm:w-1/4 space-y-3 ">
            {/* Search component */}
            <div className="w-full">
              <Search placeHolder="search in cullings" />
            </div>
            {/* Responsive Create Workspace component at the bottom */}
            <div className="mt-5 block sm:hidden w-full">
              <div className="flex justify-center">
                <CreateCullingWorkSpace />
              </div>
            </div>
          </div>

          {/* Right side: Create Workspace buttons */}
          <div className="hidden sm:block relative w-[13%]">
            {/* Create culling workspace button, aligned to the bottom */}
            <div className="absolute bottom-0 w-full">
              <CreateCullingWorkSpace />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 items-center">
          {/* Sort by button */}
          <SortByDropDown />
          {/* grid list view  */}
          <GridListView />
        </div>
      </div>

      {/* rest of culling dashboard page */}
      <div className="flex flex-col relative overflow-y-auto">
        <Suspense fallback={<WorkSpacesSkeleton />}>
          <Await promise={workSpacesPromise}>
            {({ data, totalCount }) => (
              <>
                <CullingDashboardPage workSpaces={data} />
                {data?.length != 0 && (
                  <div className="flex mt-10 mb-5">
                    <PaginationWithLink
                      page={Number(searchParams.page || 1)}
                      pageSize={Number(searchParams.limit || 10)}
                      totalCount={totalCount || 0}
                      pageSizeSelectOptions={{
                        pageSizeOptions: [10, 20, 40],
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default CullingDashboard;
