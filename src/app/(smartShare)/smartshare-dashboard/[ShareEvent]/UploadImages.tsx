'use client';

import React, { useEffect } from 'react';
import UploadImagesToServerLoading from '@/components/Culling/WorkSpaceComponents/LoadingUploadImageServer';
import { useToast } from '@/hooks/use-toast';
import SmartShareDropZone from '@/components/SmartShare/ShareEvent/SmartShareDropZone';
import useSmartShareStore from '@/zustand/SmartShare';

function UploadImages({EventId}:{EventId:string}) {
  const {
    files,
    setFiles,
    rejectedFiles,
    setRejected,
    isImagesUploading,
    uploadImagesError,
  } = useSmartShareStore();

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
        <SmartShareDropZone
          setFiles={setFiles}
          files={files}
          setRejected={setRejected}
          rejected={rejectedFiles}
          className="flex flex-col items-center"
          workSpaceId={EventId}
        />
      )}
    </div>
  );
}

export default UploadImages;
