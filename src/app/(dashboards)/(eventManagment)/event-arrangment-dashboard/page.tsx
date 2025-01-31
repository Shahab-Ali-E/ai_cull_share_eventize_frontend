import Events from "@/components/event-arrangment-dashboard/Events";
import GridListView from "@/components/event-arrangment-dashboard/GridListView";
import Search from "@/components/Search";
import SortByDropDown from "@/components/sortby-drop-down";
import GradientButton from "@/components/ui/gradient-button";
import Link from "next/link";
import React from "react";

function Page() {
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
                className="w-2/3 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
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
        <Events />
      </div>
    </section>
    // <section className="flex flex-col px-3 sm:px-6 overflow-y-auto">
    //   <div className="flex flex-col pb-5 space-y-3">
    //     <div className="flex flex-col w-full md:w-1/4 space-y-3 border-2 border-white">
    //       {/* Search component */}
    //       <div className="w-full">
    //         <Search placeHolder="search in events" />
    //       </div>
    //       {/* Right side: Book event buttons */}
    //       <div className="flex justify-end p-1">
    //         <div className="hidden md:flex w-[13%] justify-end">
    //           <GradientButton
    //             className="w-4/5 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
    //             asChild
    //           >
    //             <Link href={"/book-event/step1"}>Book Event</Link>
    //           </GradientButton>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex justify-end space-x-3 items-center">
    //       {/* Sort by button */}
    //       <SortByDropDown />
    //       {/* grid list view  */}
    //       <GridListView />
    //     </div>
    //   </div>

    //   {/* rest of culling dashboard page */}
    //   <div className="flex flex-col relative overflow-y-auto">
    //     <Events />
    //   </div>
    // </section>
  );
}

export default Page;
