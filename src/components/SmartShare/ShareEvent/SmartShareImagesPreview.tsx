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
import ImageCard from "@/components/image-card";

interface SmartShareImagesPreviewProps {
  images: SmartShareImagesMetadata[];
}

function SmartShareImagesPreview({ images }: SmartShareImagesPreviewProps) {
  const { toggleView } = useSmartShareStore();

  return toggleView ? (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard image={image} key={image.id}/>
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
