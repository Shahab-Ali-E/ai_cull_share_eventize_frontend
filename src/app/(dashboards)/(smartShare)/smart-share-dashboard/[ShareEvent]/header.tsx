import React from "react";
import SharedEventStatus from "@/components/SmartShare/ShareEvent/SharedEventStatus";
import ShareEventAction from "@/components/SmartShare/ShareEvent/ShareEventAction";
import { ShareEventPageInterface } from "@/@types/smart-share";

function Header({ eventData }: ShareEventPageInterface) {

  return (
    <div className="flex w-full justify-end">
      {eventData?.status === "Not Published"? (
        <ShareEventAction
          disable={eventData?.images_data.length === 0}
          eventImages={eventData?.images_data || []}
          eventId={eventData?.id || ""}
        />
      ) : (
        <SharedEventStatus
          eventId={eventData?.id || ""}
          status={eventData?.status || "Not Published"}
        />
      )}
    </div>
  );
}

export default Header;
