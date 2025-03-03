// FaceRecognitionImagesPreview.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImageCard from "@/components/image-card";
import { SmartShareImagesMetadata } from "@/@types/smart-share";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import downloadPhoto from "@/utils/downloadPhoto";

interface FaceRecognitionImagesPreviewProps {
  images: SmartShareImagesMetadata[];
  toggleView: boolean;
}

const FaceRecognitionImagesPreview: React.FC<
  FaceRecognitionImagesPreviewProps
> = ({ images, toggleView }) => {
  return (
    <div className="flex flex-1">
      {toggleView ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-base text-primary">
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Type</TableCell>
              <TableCell className="font-semibold">Validity</TableCell>
              <TableCell className="font-semibold">Download</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="text-muted-foreground text-base">
            {images.map((image) => (
              <TableRow key={image.id}>
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
                <TableCell>
                  {image.image_download_validity.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      downloadPhoto(image.image_download_path, image.name)
                    }
                    className="p-2 rounded-md bg-accent-foreground hover:bg-muted-foreground ml-8"
                  >
                    <Download size={16} className="text-primary-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FaceRecognitionImagesPreview;
