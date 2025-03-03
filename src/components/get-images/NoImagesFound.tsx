import React from "react";
import { TbFaceIdError } from "react-icons/tb";

function NoImagesFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
      {/* Enlarged Icon */}
      <TbFaceIdError className="text-primary dark:text-muted-foreground h-40 w-40 md:h-52 md:w-52" />

      {/* Text Content */}
      <div>
        <h4 className="text-lg md:text-xl font-semibold text-primary">
          No Matching Faces Found
        </h4>
        <p className="text-muted-foreground text-sm md:text-base mt-1">
          We couldn&apos;t find any images matching the detected face.
        </p>
      </div>
    </div>
  );
}

export default NoImagesFound;
