// pages/(culling)/culling-dashboard/CullingDashboardPage.tsx
import React from "react";

//components
import WorkspaceCard from "@/components/Culling/WorkSpaceCard";
import GetStarted from "./GetStarted";
import { MultipleWorkspaceDataInterface } from "@/@types/smart-culling";

export default function CullingDashboardPage({ workSpaces }: { workSpaces: MultipleWorkspaceDataInterface[] | undefined }) {

  const workSpacesData: MultipleWorkspaceDataInterface[] = workSpaces || [];

  // if there's not uploaded image found in culling then show this get Started
  if (workSpacesData.length === 0) {
    return <div><GetStarted /></div>;
  }


  return (
    <div className="flex flex-col">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10 p-3">
        {workSpacesData.map((workspace, index) => (
          <WorkspaceCard
            key={index}
            initials={workspace.name[0]}
            workspaceName={workspace.name}
            createdDate={workspace.created_at.split("T")[0]}
            size={workspace.total_size}
            disabled={workspace.culling_in_progress}
            href={`/culling-dashboard/${workspace.id}`}
          />
        ))}
      </div>
    </div>
  );
}
