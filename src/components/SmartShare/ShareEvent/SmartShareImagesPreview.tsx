"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path as needed
import { SmartShareImagesMetadata } from "@/@types/smart-share";
import useSmartShareStore from "@/zustand/SmartShare";

interface SmartShareImagesPreviewProps {
  images: SmartShareImagesMetadata[];
}

function SmartShareImagesPreview({ images }: SmartShareImagesPreviewProps) {
  const { toggleView } = useSmartShareStore();

  console.log("images", images);
  return toggleView ? (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group shadow-md shadow-card rounded-sm overflow-hidden"
        >
          <Image
            src={image.image_download_path}
            alt={image.name.split(".")[0]}
            height={200}
            width={200}
            className="w-full h-48 object-cover rounded-sm"
            // quality={100}
            // unoptimized={true}
          />
          {/* Grid View: Image Name on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-semibold">
              {image.name.split(".")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow className="text-base text-primary">
          <TableCell className="font-semibold">Name</TableCell>
          <TableCell className="font-semibold">Type</TableCell>
          <TableCell className="font-semibold">Validity</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className="text-muted-foreground text-base">
        {images.map((image, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center space-x-3">
              <Image
                src={image.image_download_path}
                alt={image.name}
                height={50}
                width={50}
                className="w-24 h-20 object-cover rounded-sm"
                quality={100}
              />
              <span>{image.name}</span>
            </TableCell>
            <TableCell>{image.file_type}</TableCell>
            <TableCell>{image.image_download_validity.split("T")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SmartShareImagesPreview;
