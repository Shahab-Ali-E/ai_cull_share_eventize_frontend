import React from "react";
import { SideBarProps } from "@/@types/smart-share";
import EventIdLabel from "@/components/SmartShare/ShareEvent/EventIdLabel";
import CoverImage from "@/components/SmartShare/ShareEvent/CoverImage";
import SideBarDescription from "@/components/SmartShare/ShareEvent/SideBarDescription";
import SideBarUpdateButton from "@/components/SmartShare/ShareEvent/SideBarUpdateButton";

function SideBar({
  eventId,
  totalImages,
  description = "",
  coverImage,
}: SideBarProps) {
  return (
    <aside className="flex flex-col w-full p-5 space-y-4 bg-card min-h-screen">
      {/* Cover image */}
      <div>
        <CoverImage coverImage={coverImage} totalImages={totalImages} />
      </div>

      {/* description */}
      <div>
        <SideBarDescription description={description}/>
      </div>

      {/* event id */}
      <div className="text-primary">
        <EventIdLabel eventId={eventId} />
      </div>

      {/* update button */}
      <SideBarUpdateButton eventId={eventId} />
    </aside>
  );
}

export default SideBar;
