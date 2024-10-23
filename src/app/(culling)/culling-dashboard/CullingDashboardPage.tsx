// pages/CullingDashboardPage.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

//components
import WorkspaceCard from "@/components/Culling/WorkSpaceCard";
import CustomAlert from "@/components/Errors/CustomAlert";
import { DeleteWorkSpace } from "@/lib/actions/DeleteWorkSpace";
import { WorkSpacesSkeleton } from "@/components/Culling/WorkSpaceSkeleton";
import GetStarted from "./GetStarted";

type Workspace = {
  id: number;
  name: string;
  created_at: string;
  total_size: number;
};

export default function CullingDashboardPage({ workSpaces }: { workSpaces: Workspace[] | undefined }) {
  //router 
  const router = useRouter()
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>('');
  const [isLoading,setIsLoading] = useState<boolean>(false)


  const workSpacesData: Workspace[] = workSpaces || [];

  // Unified function for handling workspace deletion and error handling
  const handleWorkspaceAction = async (workSpaceName: string) => {
    setIsLoading(true)
    try {
      // setSelectedWorkspace(workspace);
      const response = await DeleteWorkSpace({ workSpaceName: workSpaceName });
  
      if (response.error) {
        setAlertMessage(response.error);  // Set the error message
        setErrorAlertOpen(true);  // Open the error alert
      } else {
        router.refresh()
        setTimeout(()=>{
          setIsLoading(false)
        },2000)
      }
    } catch (error) {
      if(error instanceof Error){
        setAlertMessage(error.message)
      }
      setErrorAlertOpen(true); 
      
    } finally{
      setIsLoading(false)
    }
  };

  // if there's not uploaded image found in culling then show this get Started
  if (workSpacesData.length === 0) {
    return <div><GetStarted /></div>;
  }

  if(isLoading) return <WorkSpacesSkeleton />

  return (
    <div className="flex flex-col">
      {/* Custom Alert for Errors */}
     {/* Custom Alert for Errors */}
      <CustomAlert
        isOpen={errorAlertOpen}
        onClose={() => setErrorAlertOpen(false)}
        title="Error"
        description={alertMessage || "An unexpected error occurred."}
      />

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10 p-3">
        {workSpacesData.map((workspace, index) => (
          <WorkspaceCard
            workSpaceId={workspace.id}
            key={index}
            initials={workspace.name[0]}
            workspaceName={workspace.name}
            createdDate={workspace.created_at.split("T")[0]}
            size={workspace.total_size}
            href={`/culling-dashboard/${workspace.id}`}
            onDelete={() => handleWorkspaceAction(workspace.name)}
          />
        ))}
      </div>
    </div>
  );
}
