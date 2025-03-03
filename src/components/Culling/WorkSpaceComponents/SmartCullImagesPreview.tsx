import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path as needed
import { SmartCullImagesPreviewProps } from "@/@types/smart-culling";
import ImageCard from "@/components/image-card";

function SmartCullImagesPreview({
  images,
  isInGridView,
}: SmartCullImagesPreviewProps) {
  return isInGridView ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
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
                alt={image.name.split(".")[0]}
                height={90}
                width={80}
                className="w-24 h-20 object-cover rounded-sm"
                quality={100}
              />
              <span>{image.name.split(".")[0]}</span>
            </TableCell>
            <TableCell>{image.file_type}</TableCell>
            <TableCell>
              {new Date(image.image_download_validity).toLocaleString("en-US", {
                year: "numeric",
                day: "2-digit",
                month: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SmartCullImagesPreview;
