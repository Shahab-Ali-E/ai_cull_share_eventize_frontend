import React from "react";
import ShareEventHeader from "@/components/SmartShare/ShareEvent/ShareEventHeader";
import SideBar from "./SideBar";
import { ShareEventPageInterface } from "@/@types/smart-share";
import ImagesHighlights from "./ImagesHighlights";
import UploadImages from "./UploadImages";

function ShareEventPage({ Eventdata }: ShareEventPageInterface) {
  return (
    <section className="flex flex-col min-h-screen">
      {/* page header */}
      <ShareEventHeader eventName={Eventdata?.name || "NA"} />

      <section className="flex">
        {/* side bar */}
        <div className="w-1/4">
          <SideBar
            eventId={Eventdata?.id}
            totalImages={Eventdata?.images_data.length}
            description={Eventdata?.description}
            coverImage={Eventdata?.cover_image}
          />
        </div>

        {/* show images or dropzone*/}
        <div className="flex flex-col w-full p-10">
          {Eventdata?.images_data.length != 0 ? (
            <ImagesHighlights noOfImages={Eventdata?.images_data.length || 0} />
          ) : (
            <UploadImages 
              EventId={Eventdata.id}
            />
          )}
        </div>
      </section>
    </section>
  );
}

export default ShareEventPage;
