'use client';

import React, { useEffect } from 'react';
import DropZone from '@/components/Culling/WorkSpaceComponents/DropZone';
import useCullingStore from '@/zustand/CullingStore';
import UploadImagesToServerLoading from '@/components/Culling/WorkSpaceComponents/LoadingUploadImageServer';
import { useToast } from '@/hooks/use-toast';

function UploadImages() {
  const {
    files,
    setFiles,
    rejectedFiles,
    setRejected,
    isImagesUploading,
    uploadImagesError,
    currentActiveWorkSpaceData
  } = useCullingStore();

  const {toast} = useToast()

  // useEffect for toast

  useEffect(()=>{
    if(uploadImagesError){
      toast({
        title: "Can't upload images",
        description: uploadImagesError,
        variant: 'destructive',
      });
    }
  },[uploadImagesError, toast])


  return (
    <div className="mt-10 p-5">
      {isImagesUploading ? (
        <UploadImagesToServerLoading isOpen={isImagesUploading} />
      ) : (
        <DropZone
          setFiles={setFiles}
          files={files}
          setRejected={setRejected}
          rejected={rejectedFiles}
          className="flex flex-col items-center"
          workSpaceId={currentActiveWorkSpaceData.id}
        />
      )}
    </div>
  );
}

export default UploadImages;
