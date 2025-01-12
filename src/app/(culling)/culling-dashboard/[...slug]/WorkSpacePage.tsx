// WorkSpacePage.tsx
'use client';

import WorkSpaceBeforeCullHeader from '@/components/Culling/WorkSpaceComponents/BeforeCullHeader';
// import useCullingStore from '@/zustand/CullingStore';
import {SingleWorkspaceDataInterface} from "@/@types/smart-culling"
import React from 'react';
import ImagesHighlights from './ImagesHighlights';
import UploadImages from './UploadImages';
// import { useToast } from '@/hooks/use-toast';
import CulledImages from './CulledImages';
import StartCulling from './StartCulling'; // Import StartCulling here

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

  const tempImagesUrls = workSpaceData?.temporary_images_urls.length!== 0; //check for if temporary images url's are avalibale or not
  const enableCullingButton =
    !workSpaceData?.culling_done &&
    !workSpaceData?.culling_in_progress &&
    workSpaceData?.temporary_images_urls?.length !== 0; // show culling button only when the temporaray images are avaliable other wise not

  return (
    <section className="flex flex-col min-h-screen p-2">
      <WorkSpaceBeforeCullHeader 
        workSpaceId={workSpaceData?.id}
        workSpaceName={workSpaceData?.name}
        enableCullingButton={enableCullingButton}
        temporaryImagesUrl={workSpaceData?.temporary_images_urls.map((ele)=>ele.url)} 
      />
      
      <div className="flex flex-col mt-10 p-5">
        {workSpaceData?.culling_done ? (
          <CulledImages 
            workSpaceId={workSpaceData.id}
          />
        ) : workSpaceData?.culling_in_progress ? (
          <StartCulling 
            workSpaceId={workSpaceData.id}
          />
        ) : tempImagesUrls ? (
          <>
            <div className="grid grid-cols-4 2xl:grid-col-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-3 sm:gap-4 mt-0 sm:mt-5 justify-start">
              {/* {workSpaceData?.temporary_images_urls?.map((images, index) => (
                <div key={index} className="flex">
                  <ImagesHighlights images={images.url}/> 
                </div>
              ))} */}
            </div>
          </>
        ) : (
          <UploadImages workSpaceId={workSpaceData.id} />
        )}
      </div>
    </section>
  );  
}

export default WorkSpacePage;

