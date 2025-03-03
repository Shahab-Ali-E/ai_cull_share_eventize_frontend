import { Suspense } from "react";

//components
import SmartShareDashboardPage from "./SmartShareDashboardPage";
import SortByDropDown from "@/components/sortby-drop-down";
import Search from "@/components/search";
import Await from "./Await";
import CreateEvent from "@/components/SmartShare/CreateEvent";

//loading skeleton
import EventsSkeleton from "@/components/SmartShare/EventsSkeleton";

//api
import { getAllEvents } from "@/lib/actions/SmartShare/GetEvents";
import GridListView from "@/components/SmartShare/GridListView";
import { PaginationWithLink } from "@/components/pagination-with-links";
import { getClerkToken } from "@/lib/actions/clerk-token";

type SearchParams = {
  sort_order: string | undefined;
  sort_by: string | undefined;
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

const SmartShareDashboard = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // Get token once outside the cached function
  const token = await getClerkToken();
  // calling the API from backend to get all events
  const eventsPromise = getAllEvents({
    sort_order: searchParams.sort_order,
    sort_by: searchParams.sort_order,
    search: searchParams.search,
    page: searchParams.page || 1,
    limit: searchParams.limit || 10,
  },token);

  return (
    <section className="flex flex-col px-3 sm:px-6 overflow-y-auto">
      <div className="flex flex-col pb-5 space-y-3">
        <div className="flex space-x-4 justify-between p-1">
          {/* Left side Search box */}
          <div className="flex flex-col w-full sm:w-1/4 space-y-3">
            {/* Search component */}
            <div className="w-full">
              <Search placeHolder="search in smart share events" />
            </div>
            {/* Responsive Create event button for sm devices */}
            <div className="mt-5 block sm:hidden w-full">
              <div className="flex justify-center">
                <CreateEvent />
              </div>
            </div>
          </div>

          {/* Right side: Create event button buttons */}
          <div className="hidden sm:block relative w-[13%] h-fit">
            {/* Create event button*/}
            <div className="w-full flex justify-end">
              <CreateEvent />
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
      {/* rest of smart dashboard page */}
      <div className="flex flex-col relative overflow-y-auto">
        <Suspense fallback={<EventsSkeleton />}>
          <Await promise={eventsPromise}>
            {({ data, totalCount }) => (
              <>
                <SmartShareDashboardPage Events={data} />
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

export default SmartShareDashboard;
