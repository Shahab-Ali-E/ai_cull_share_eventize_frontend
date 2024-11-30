// WorkSpacePage.tsx
'use client';

import WorkSpaceBeforeCullHeader from '@/components/Culling/WorkSpaceComponents/BeforeCullHeader';
import useCullingStore, { WorkspaceDataInterface } from '@/zustand/CullingStore';
import React, { useEffect } from 'react';
import ImagePreview from './ImagesPreview';
import UploadImages from './UploadImages';
import { useToast } from '@/hooks/use-toast';
import CulledImages from './CulledImages';
import StartCulling from './StartCulling'; // Import StartCulling here
import { Label } from '@/components/ui/label';

interface WorkSpacePageProps {
  workSpaceData: WorkspaceDataInterface | undefined;
  error: string | undefined;
}

function WorkSpacePage({ workSpaceData, error }: WorkSpacePageProps) {
  const { toast } = useToast();
  const {
    setCurrentActiveWorkSpaceData,
    currentActiveWorkSpaceData,
    setUploadedImagesS3Urls,
    uploadedImagesS3Urls,
    resetStateForNewWorkspace
  } = useCullingStore();

  useEffect(() => {
    if (workSpaceData) {
      resetStateForNewWorkspace(workSpaceData.id);
      setCurrentActiveWorkSpaceData(workSpaceData);
      if (workSpaceData.temporary_images_urls?.length) {
        setUploadedImagesS3Urls(workSpaceData.temporary_images_urls.map((ele) => ele.url));
      }
    } else if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [workSpaceData, error, resetStateForNewWorkspace, setCurrentActiveWorkSpaceData, setUploadedImagesS3Urls, toast]);

  const hasImagesUploaded = currentActiveWorkSpaceData.temporary_images_urls.length !== 0;
  const showCullingButton =
    !workSpaceData?.culling_done &&
    !workSpaceData?.culling_in_progress &&
    workSpaceData?.temporary_images_urls?.length !== 0;

  return (
    <section className="flex flex-col min-h-screen p-2">
      <WorkSpaceBeforeCullHeader 
        showCullingButton={showCullingButton} 
      />
      
      <div className="flex flex-col mt-10 p-5">
        {currentActiveWorkSpaceData.culling_done ? (
          <CulledImages />
        ) : currentActiveWorkSpaceData.culling_in_progress ? (
          <StartCulling />
        ) : hasImagesUploaded ? (
          <>
            <Label className='text-primary text-lg sm:text-2xl font-semibold '>Images Preview:</Label>
            <div className="flex flex-wrap gap-3 mt-5 justify-center">
              {uploadedImagesS3Urls?.map((images, index) => (
                <div key={index} className="flex">
                  <ImagePreview images={images}/> 
                </div>
              ))}
            </div>
          </>
        ) : (
          <UploadImages />
        )}
      </div>
    </section>
  );  
}

export default WorkSpacePage;

