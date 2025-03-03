// pages/CullingDashboardPage.tsx
import React from "react";

//components
import GetStarted from "./GetStarted";
import { SmartShareEventsDataInterface } from "@/@types/smart-share";
import SmartShareEvents from "@/components/SmartShare/SmartShareEvents";

export default function SmartShareDashboardPage({
  Events,
}: {
  Events: SmartShareEventsDataInterface[] | undefined;
}) {
  const EventData: SmartShareEventsDataInterface[] = Events || [];

  // if there's not created any event then show get started
  if (EventData.length === 0) {
    return (
      <div className="w-full overflow-hidden">
        <GetStarted />
      </div>
    );
  }

  return <SmartShareEvents eventData={EventData} />;
}
