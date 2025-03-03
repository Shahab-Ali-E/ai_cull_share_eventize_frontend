// WorkSpacePage.tsx

import StartCullingAction from "@/components/Culling/WorkSpaceComponents/StartCullingAction";
import { SingleWorkspaceDataInterface } from "@/@types/smart-culling";
import React from "react";
import ImagesHighlights from "./ImagesHighlights";
import UploadImages from "./UploadImages";
import CulledImagesFolders from "./CulledImagesFolder";
import StartCulling from "./StartCulling"; // Import StartCulling here

interface WorkSpacePageProps {
  workSpaceData: SingleWorkspaceDataInterface | undefined;
  error: string | undefined;
}

function WorkSpacePage({ workSpaceData }: WorkSpacePageProps) {

  console.log("workspace data", workSpaceData)

  const tempImagesUrls = workSpaceData?.temporary_images_urls.length !== 0; //check for if temporary images url's are avalibale or not
  const enableCullingButton =
    !workSpaceData?.culling_done &&
    !workSpaceData?.culling_in_progress &&
    workSpaceData?.temporary_images_urls?.length !== 0; // show culling button only when the temporaray images are avaliable other wise not

  return (
    <section className="flex flex-col min-h-screen p-2">
      <StartCullingAction
        workSpaceId={workSpaceData?.id}
        enableCullingButton={enableCullingButton}
        temporaryImagesUrl={workSpaceData?.temporary_images_urls.map(
          (ele) => ele.image_download_path
        )}
      />

      <div className="flex flex-col">
        {workSpaceData?.culling_done ? (
          <CulledImagesFolders workSpaceId={workSpaceData.id} />
        ) : workSpaceData?.culling_in_progress ? (
          <StartCulling workSpaceId={workSpaceData.id} />
        ) : tempImagesUrls ? (
          <div className="px-2 sm:px-5">
            <ImagesHighlights
              images={workSpaceData?.temporary_images_urls || []}
              noOfImages={workSpaceData?.temporary_images_urls.length || 0}
            />
          </div>
        ) : (
          <UploadImages workSpaceId={workSpaceData.id} />
        )}
      </div>
    </section>
  );
}

export default WorkSpacePage;
