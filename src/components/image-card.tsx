"use client";

import { Button } from "./ui/button";
import { Download } from "lucide-react";
import downloadPhoto from "@/utils/downloadPhoto";
import { ImagesMetadataResponse } from "@/@types/smart-culling";
import DynamicImagePlaceholder from "./dynamic-image-placeholder";

// ImageCard component
const ImageCard = ({ image }: { image: ImagesMetadataResponse }) => {
  
  return (
    <div
      key={image.id}
      className="group relative rounded-lg shadow-md shadow-card overflow-hidden"
    >
      <DynamicImagePlaceholder src={image.image_download_path} alt={image.name} />
      {/* Download button - appears on hover */}
      <Button
        variant="default"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        onClick={() => downloadPhoto(image.image_download_path, image.name)}
      >
        <Download className="h-5 w-5" />
      </Button>
      {/* Overlay appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <h2 className="text-sm font-semibold truncate">{image.name}</h2>
        <p className="text-xs">
          Valid until:{" "}
          {new Date(image.image_download_validity).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
