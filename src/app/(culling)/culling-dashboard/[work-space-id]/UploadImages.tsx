'use client';

import React, { useEffect } from 'react';

// components
import DropZone from '@/components/Culling/WorkSpaceComponents/DropZone';
import useCullingStore from '@/zustand/CullingStore';
import UploadImagesToServerLoading from '@/components/Culling/WorkSpaceComponents/LoadingUploadImageServer';
import CustomAlert from '@/components/Errors/CustomAlert';
import ImagePreview from './ImagesPreview';


function UploadImages({ workSpaceName, workSpaceId }: { workSpaceName: string, workSpaceId:number }) {
  // zustand store
  const {
    files,
    setFiles,
    rejectedFiles,
    setRejected,
    uploadedImagesS3Urls,
    currentWorkspaceId,
    resetStateForNewWorkspace,
    isImagesUploading,
    uploadImagesError,
    setIsAlertOpen,
    isAlertOpen,
  } = useCullingStore();


  // Reset Zustand state for new workspace
  useEffect(() => {
    if (workSpaceId !== currentWorkspaceId) {
      // Reset the state if we switch to a new workspace
      resetStateForNewWorkspace(workSpaceId);
    }
  }, [workSpaceId, currentWorkspaceId, resetStateForNewWorkspace]);

  return (
    <div>
      {/* Custom Alert for Errors occur while uploading */}
      <CustomAlert
        isOpen={isAlertOpen}
        title="Error"
        onClose={()=>setIsAlertOpen(false)}
        description={uploadImagesError || "An unexpected error occurred!"}
      />


      {/* Show either DropZone or success/error message depending on upload state */}
      {uploadedImagesS3Urls.length > 0 ? (
        // Show previews of images from the S3 pre-signed URLs
        <ImagePreview imagesUrl={uploadedImagesS3Urls} />
      ) : (
        <>
          {isImagesUploading? (
            // show the loader until the images was uploading to the server
            <UploadImagesToServerLoading isOpen={isImagesUploading} />
          ) : (
            <DropZone
              setFiles={setFiles}
              files={files}
              setRejected={setRejected}
              rejected={rejectedFiles}
              className="flex flex-col items-center"
              workSpaceName={workSpaceName}
            />
          )}
        </>
      )}
    </div>
  );
}

export default UploadImages;
