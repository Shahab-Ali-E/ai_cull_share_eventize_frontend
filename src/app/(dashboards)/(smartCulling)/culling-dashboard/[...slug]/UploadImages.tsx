import React from "react";
import CullingDropZone from "@/components/Culling/WorkSpaceComponents/CullingDropZone";

function UploadImages({ workSpaceId }: { workSpaceId: string }) {
  return (
    <div className="mt-10 p-5">
      <CullingDropZone
        className="flex flex-col items-center"
        workSpaceId={workSpaceId}
      />
    </div>
  );
}

export default UploadImages;
