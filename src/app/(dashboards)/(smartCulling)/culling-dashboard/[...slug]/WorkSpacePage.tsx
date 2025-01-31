// WorkSpacePage.tsx

import StartCullingAction from "@/components/Culling/WorkSpaceComponents/StartCullingAction";
// import useCullingStore from '@/zustand/CullingStore';
import { SingleWorkspaceDataInterface } from "@/@types/smart-culling";
import React from "react";
import ImagesHighlights from "./ImagesHighlights";
import UploadImages from "./UploadImages";
// import { useToast } from '@/hooks/use-toast';
import CulledImages from "./CulledImages";
import StartCulling from "./StartCulling"; // Import StartCulling here

interface WorkSpacePageProps {
  workSpaceData: SingleWorkspaceDataInterface | undefined;
  error: string | undefined;
}

function WorkSpacePage({ workSpaceData }: WorkSpacePageProps) {
  // const { toast } = useToast();
  // const {
  //   setCurrentActiveWorkSpaceData,
  //   currentActiveWorkSpaceData,
  //   setUploadedImagesS3Urls,
  //   uploadedImagesS3Urls,
  //   resetStateForNewWorkspace
  // } = useCullingStore();

  // useEffect(() => {
  //   if (workSpaceData) {
  //     resetStateForNewWorkspace(workSpaceData.id);
  //     setCurrentActiveWorkSpaceData(workSpaceData);
  //     if (workSpaceData.temporary_images_urls?.length) {
  //       setUploadedImagesS3Urls(workSpaceData.temporary_images_urls.map((ele) => ele.url));
  //     }
  //   } else if (error) {
  //     toast({
  //       title: 'Error',
  //       description: error,
  //       variant: 'destructive',
  //     });
  //   }
  // }, [workSpaceData, error, resetStateForNewWorkspace, setCurrentActiveWorkSpaceData, setUploadedImagesS3Urls, toast]);

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
          (ele) => ele.images_download_path
        )}
      />

      <div className="flex flex-col">
        {workSpaceData?.culling_done ? (
          <CulledImages workSpaceId={workSpaceData.id} />
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
