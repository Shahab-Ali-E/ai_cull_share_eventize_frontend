// WorkSpacePage.tsx

import StartCullingAction from "@/components/Culling/WorkSpaceComponents/StartCullingAction";
import { SingleWorkspaceDataInterface } from "@/@types/smart-culling";
import React from "react";
import ImagesHighlights from "./ImagesHighlights";
import CulledImagesFolders from "./CulledImagesFolder";
import StartCulling from "./StartCulling"; // Import StartCulling here
import UploadingImagesProgress from "@/components/UploadingImagesProgress";
import CullingDropZone from "@/components/Culling/WorkSpaceComponents/CullingDropZone";

interface WorkSpacePageProps {
  workSpaceData: SingleWorkspaceDataInterface | undefined;
  error: string | undefined;
}

function WorkSpacePage({ workSpaceData }: WorkSpacePageProps) {
  const tempImagesUrls = workSpaceData?.temporary_images_urls.length !== 0; //check for if temporary images url's are avalibale or not
  const enableCullingButton =
    !workSpaceData?.culling_done &&
    !workSpaceData?.culling_in_progress &&
    workSpaceData?.temporary_images_urls?.length !== 0; // show culling button only when the temporaray images are avaliable other wise not

  return (
    <section className="flex flex-col p-2">
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
          <div className="mt-8 p-5">
            {/* if the uploading images task id is not null then show the uploading images progress otherwise show the culling drop zone */}
            {workSpaceData.uploading_in_progress ? (
              <UploadingImagesProgress
                uploadingImagesTaskId={workSpaceData.uploading_task_id}
              />
            ) : (
              <CullingDropZone
                className="flex flex-col items-center"
                workSpaceId={workSpaceData.id}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
  
}

export default WorkSpacePage;
