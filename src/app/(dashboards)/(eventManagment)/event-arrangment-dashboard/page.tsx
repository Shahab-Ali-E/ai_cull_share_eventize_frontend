import GridListView from "@/components/event-arrangment-dashboard/GridListView";
import Search from "@/components/search";
import SortByDropDown from "@/components/sortby-drop-down";
import GradientButton from "@/components/ui/gradient-button";
import Link from "next/link";
import React, { Suspense } from "react";
import Await from "./Await";
import { getAllEvents } from "@/lib/actions/EventArrangment/GetEvents";
import { PaginationWithLink } from "@/components/pagination-with-links";
import EventDashboardPage from "./EventsDashboardPage";

type SearchParams = {
  sort_order: string | undefined;
  sort_by: string | undefined;
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};


function Page({searchParams}:{searchParams:SearchParams}) {

  const eventsPromise = getAllEvents({
      sort_order: searchParams.sort_order,
      sort_by: searchParams.sort_order,
      search: searchParams.search,
      page: searchParams.page || 1,
      limit: searchParams.limit || 10,
    });
  

  return (
    <section className="flex flex-col px-3 sm:px-6 overflow-y-auto">
      <div className="flex flex-col pb-5 space-y-3">
        <div className="flex space-x-4 justify-between p-1">
          {/* Left side Search box */}
          <div className="flex flex-col w-full sm:w-1/4 space-y-3">
            {/* Search component */}
            <div className="w-full">
              <Search placeHolder="search in events" />
            </div>
            {/* Responsive Create event button for sm devices */}
            <div className="mt-5 block sm:hidden w-full">
              <div className="flex justify-center">
                <GradientButton
                  className="w-3/4 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
                  asChild
                >
                  <Link href={"/book-event/step1"}>Book Event</Link>
                </GradientButton>
              </div>
            </div>
          </div>

          {/* Right side: Create event button buttons */}
          <div className="hidden sm:block relative w-1/5 h-fit">
            {/* Create event button*/}
            <div className="w-full flex justify-end">
              <GradientButton
                className="w-1/2 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
                asChild
              >
                <Link href={"/book-event/step1"}>Book Event</Link>
              </GradientButton>
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
        <Suspense >
          <Await promise={eventsPromise}>
            {({ events, totalCount }) => (
              <>
                <EventDashboardPage events={events} />
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
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default Page;
