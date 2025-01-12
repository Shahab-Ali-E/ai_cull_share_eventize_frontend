import React from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Adjust the import path as needed

interface ImageData {
  src: string; // URL or StaticImageData
  name: string;
  type: string;
  uploadedDate: string;
}

interface SmartShareImagesPreviewProps {
  images: ImageData[];
  isInGridView: boolean;
}

function SmartShareImagesPreview({ images, isInGridView }: SmartShareImagesPreviewProps) {
  return isInGridView ? (
    <div className="grid grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group shadow-md shadow-card rounded-sm overflow-hidden"
        >
          <Image
            src={image.src}
            alt={image.name}
            className="w-full h-48 object-cover rounded-sm"
            quality={100}
            unoptimized={true}
          />
          {/* Grid View: Image Name on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-semibold">{image.name}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow className='text-base text-primary'>
          <TableCell className="font-semibold">Name</TableCell>
          <TableCell className="font-semibold">Type</TableCell>
          <TableCell className="font-semibold">Date Uploaded</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className='text-muted-foreground text-base'>
        {images.map((image, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center space-x-3">
              <Image
                src={image.src}
                alt={image.name}
                className="w-24 h-20 object-cover rounded-sm"
                quality={100}
              />
              <span>{image.name}</span>
            </TableCell>
            <TableCell>{image.type}</TableCell>
            <TableCell>{image.uploadedDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SmartShareImagesPreview;
