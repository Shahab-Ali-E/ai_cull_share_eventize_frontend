// pages/(culling)/culling-dashboard/CullingDashboardPage.tsx
import React from "react";

//components
import GetStarted from "./GetStarted";
import { MultipleWorkspaceDataInterface } from "@/@types/smart-culling";
import WorkSpaces from "@/components/Culling/WorkSpaces";

export default function CullingDashboardPage({
  workSpaces,
}: {
  workSpaces: MultipleWorkspaceDataInterface[] | undefined;
}) {
  const workSpacesData: MultipleWorkspaceDataInterface[] = workSpaces || [];

  // if there's not uploaded image found in culling then show this get Started
  if (workSpacesData.length === 0) {
    return (
      <div>
        <GetStarted />
      </div>
    );
  }

  return <WorkSpaces workSpacesData={workSpacesData} />;
}
