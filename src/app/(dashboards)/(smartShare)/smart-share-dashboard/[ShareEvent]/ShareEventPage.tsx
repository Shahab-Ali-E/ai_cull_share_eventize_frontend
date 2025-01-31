import React from "react";
import { ShareEventPageInterface } from "@/@types/smart-share";
import EventDetailModal from "@/components/SmartShare/ShareEvent/EventDetailModal";
import GridListView from "@/components/SmartShare/GridListView";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import SmartShareImagesPreview from "@/components/SmartShare/ShareEvent/SmartShareImagesPreview";
import ShareEventAction from "@/components/SmartShare/ShareEvent/ShareEventAction";
import SmartShareDropZone from "@/components/SmartShare/ShareEvent/SmartShareDropZone";

function ShareEventPage({ eventData }: ShareEventPageInterface) {
  console.log("event data ", eventData);
  return (
    <section className="flex flex-col px-4 sm:px-6 space-y-4">
      <div className="flex w-full justify-end">
        <ShareEventAction />
      </div>

      {/* show images or dropzone*/}
      <div className="flex flex-col space-y-7 w-full">
        <div className="flex justify-between">
          {/* Highlights label */}
          <div className="flex space-x-1 sm:space-x-3 items-center text-primary">
            <Label className="text-base sm:text-xl font-semibold tracking-wider">
              Highlights
            </Label>
            <Badge className="rounded-full py-1 text-xs font-bold hover:bg-card-foreground">
              {eventData?.images_data.length}
            </Badge>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <EventDetailModal
              coverImage={eventData?.cover_image || ""}
              description={eventData?.description || ""}
              eventId={eventData?.id || ""}
              eventName={eventData?.name || ""}
            />
            {
              eventData?.images_data.length !=0 &&  <GridListView />
            }
          </div>
        </div>
        {eventData?.images_data.length != 0 ? (
          <div className="w-full">
            <SmartShareImagesPreview images={eventData?.images_data || []} />
          </div>
        ) : (
          <div className="flex justify-center ">
            <SmartShareDropZone
              className="flex flex-col items-center w-3/4"
              eventId={eventData.id}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ShareEventPage;
