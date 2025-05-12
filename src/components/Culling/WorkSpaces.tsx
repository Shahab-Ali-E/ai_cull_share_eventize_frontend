'use client';

import useCullingStore from "@/zustand/CullingStore";
import React, { useEffect } from "react";
import WorkspaceTable from "./WorkSpacesTable";
import WorkspaceCard from "./WorkSpaceCard";
import { MultipleWorkspaceDataInterface } from "@/@types/smart-culling";

function WorkSpaces({ workSpacesData }: { workSpacesData: MultipleWorkspaceDataInterface[] }) {
  const { toggleView, setWorkSpacesData } = useCullingStore();
  
  useEffect(()=>{
    setWorkSpacesData(workSpacesData)
  },[setWorkSpacesData, workSpacesData])
  
  return (
    <div className="flex flex-col pb-4">
      {toggleView ? (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-normal">
          {workSpacesData.map((workspace, index) => (
            <WorkspaceCard
              key={index}
              initials={workspace.name[0]}
              workspaceName={workspace.name}
              createdDate={workspace.created_at.split("T")[0]}
              size={workspace.total_size}
              disabled={workspace.culling_in_progress}
              href={`/culling-dashboard/${workspace.id}`}
              cullingDone={workspace.culling_done}
            />
          ))}
        </div>
      ) : (
        <WorkspaceTable workspaces={workSpacesData} />
      )}
    </div>
  );
}

export default WorkSpaces;
