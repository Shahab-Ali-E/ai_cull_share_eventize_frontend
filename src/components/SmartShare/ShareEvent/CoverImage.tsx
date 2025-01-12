"use client";

import { Label } from "@/components/ui/label";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import altCoverImage from "@/images/event-management-slider.jpg";
import useSmartShareStore from "@/zustand/SmartShare";

function CoverImage({
  coverImage,
  totalImages,
}: {
  coverImage?: string;
  totalImages?: number;
}) {
  const [currentCoverImage, setCurrentCoverImage] = useState<
    string | StaticImageData
  >(coverImage || altCoverImage);

  const { currentEventData, setCurrentEventData } = useSmartShareStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file); // Create a temporary URL
      setCurrentCoverImage(objectURL);
      setCurrentEventData({
        ...currentEventData,
        cover_image: file,
      });
    }
  };

  return (
    <div className="relative flex flex-col space-y-1">
      {/* Upload button */}
      <Label className="cursor-pointer absolute top-2/3 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-semibold h-12 w-full rounded-none hover:bg-opacity-70 hover:bg-white hover:text-black flex items-center justify-center z-10">
        Change Cover Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </Label>
      {/* Display the uploaded image */}
      <div className="relative h-48 w-full">
        <Image
          src={currentCoverImage}
          alt="Cover Image"
          fill
          style={{objectFit:"cover"}}
          className="rounded-2xl"
          unoptimized
        />
      </div>

      {/* Total number of images */}
      <Label className="self-end text-sm font-medium text-muted-foreground mr-2">
        {totalImages} Photos
      </Label>
    </div>
  );
}

export default CoverImage;
