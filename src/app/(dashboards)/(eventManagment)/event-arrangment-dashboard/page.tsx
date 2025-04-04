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
import { Metadata } from "next";

type SearchParams = {
  sort_order: string | undefined;
  sort_by: string | undefined;
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export const metadata: Metadata = {
  title: "Event Arrangement Dashboard",
  description:
    "Effortlessly manage and track your booked events. Search, sort, and paginate through your event list for a seamless planning experience.",
  keywords: [
    "event dashboard",
    "manage booked events",
    "event planning",
    "event arrangement",
    "booked event details",
    "sort events",
    "event tracking",
    "event scheduling",
    "corporate events",
    "wedding events",
  ],
  openGraph: {
    title: "Event Arrangement Dashboard",
    description:
      "View and manage your booked events with ease. Sort, search, and organize event details for seamless event planning.",
    url: "https://yourwebsite.com/event-dashboard",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/images/event-dashboard-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Event Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Arrangement Dashboard",
    description:
      "Manage and track all your booked events. Easily search, sort, and organize your event details for hassle-free event planning.",
    images: ["https://yourwebsite.com/images/event-dashboard-preview.jpg"],
  },
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
                {events?.length!=0 &&(
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
}

export default Page;
