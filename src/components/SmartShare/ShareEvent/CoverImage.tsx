"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import altCoverImage from "@/images/event-management-slider.jpg";
import useSmartShareStore from "@/zustand/SmartShare";

function CoverImage({
  coverImage,
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
      {/* Image wrapper */}
      <div
        className="relative h-36 sm:h-56 w-full group cursor-pointer"
        onClick={() => document.getElementById("image-upload-input")?.click()}
      >
        {/* Display the uploaded image */}
        <Image
          src={currentCoverImage}
          alt="Cover Image"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-2xl group-hover:opacity-70 transition-opacity duration-300"
          unoptimized
        />

        {/* Hover text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white font-medium text-sm z-10 rounded-2xl">
          Change Cover Image
        </div>

        {/* Hidden file input */}
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}

export default CoverImage;
