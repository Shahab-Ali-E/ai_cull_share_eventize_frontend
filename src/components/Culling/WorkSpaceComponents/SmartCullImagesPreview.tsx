import React from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Adjust the import path as needed
import { SmartCullImagesPreviewProps } from '@/@types/smart-culling';


function SmartCullImagesPreview({ images, isInGridView }: SmartCullImagesPreviewProps) {
  return isInGridView ? (
    <div className="grid grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group shadow-md shadow-card rounded-sm overflow-hidden"
        >
          <Image
            src={image.images_download_path}
            alt={image.name.split('.')[0]}
            height={200}
            width={200}
            className="w-full h-48 object-cover rounded-sm"
            // quality={100}
            // unoptimized={true}
          />
          {/* Grid View: Image Name on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-semibold">{image.name.split('.')[0]}</p>
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
          <TableCell className="font-semibold">Download Validity</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className='text-muted-foreground text-base'>
        {images.map((image, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center space-x-3">
              <Image
                src={image.images_download_path}
                alt={image.name.split('.')[0]}
                height={90}
                width={80}
                className="w-24 h-20 object-cover rounded-sm"
                quality={100}
              />
              <span>{image.name.split('.')[0]}</span>
            </TableCell>
            <TableCell>{image.file_type}</TableCell>
            <TableCell>{image.images_download_validity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SmartCullImagesPreview;
