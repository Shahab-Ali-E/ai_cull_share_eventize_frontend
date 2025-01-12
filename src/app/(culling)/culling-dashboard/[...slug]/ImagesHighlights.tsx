// // ImagesPreviewComponent.tsx

// import React from 'react';
// import Image from 'next/image';

// function ImagePreview({images }:{images:string}) {

//   return (
//       <div className="shadow-md shadow-card rounded-sm">
//         <Image
//           src={images}
//           height={200}
//           width={200}
//           alt={`Image`}
//           className="rounded-sm object-cover h-32 w-32 sm:h-64 sm:w-80"
//           // quality={100}
//           // unoptimized={true}
//         />
//       </div>
//   );
// }

// export default ImagePreview;

"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import SmartCullImagesPreview from "@/components/Culling/WorkSpaceComponents/SmartCullImagesPreview";
import { CulledImagesMetadataResponse } from "@/@types/smart-culling";

interface ImagesHighlightsProps {
  noOfImages: number;
  images: CulledImagesMetadataResponse[];
}

function ImagesHighlights({ noOfImages, images }: ImagesHighlightsProps) {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="flex flex-col space-y-7 w-full">
      {/* high lights */}
      <div className="flex justify-between">
        <div className="flex space-x-3 items-center text-primary">
          <Label className="text-2xl font-semibold tracking-wider">
            Highlights
          </Label>
          <Badge className="rounded-sm px-3 py-2 font-bold hover:bg-card-foreground">
            {noOfImages}
          </Badge>
        </div>

        {/* view images either in list or grid */}
        <div className="flex text-primary items-center bg-gray-200 dark:bg-accent p-1 rounded-full">
          <Button
            onClick={() => setIsGridView(true)}
            variant={isGridView ? "secondary" : "ghost"}
            className={`flex items-center rounded-full ${
              isGridView ? "bg-card hover:bg-card" : "hover:bg-gray-200 dark:hover:bg-accent"
            }`}
          >
            <IoGrid />
          </Button>
          <Button
            onClick={() => setIsGridView(false)}
            variant={!isGridView ? "secondary" : "ghost"}
            className={`flex items-center rounded-full ${
              !isGridView ? "bg-card hover:bg-card" : "hover:bg-gray-200 dark:hover:bg-accent"
            }`}
          >
            <FaListUl />
          </Button>
        </div>
      </div>

      {/* Images display */}
      <div>
        <SmartCullImagesPreview images={images} isInGridView={isGridView} />
      </div>
    </div>
  );
}

export default ImagesHighlights;

// "use client";
// import { useEffect, useState, useRef } from "react";
// import { ImagePreviewType } from "@/lib/types";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselApi,
// } from "@/components/ui/carousel";
// import Image from "next/image";

// interface GalleryProps {
//   images: ImagePreviewType[];
// }

// const Gallery = ({ images }: GalleryProps) => {
//   const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
//   const [thumbnailApi, setThumbnailApi] = useState<CarouselApi | null>(null);
//   const [current, setCurrent] = useState(0);

//   const prevIndexRef = useRef<number>(current);

//   useEffect(() => {
//     if (!mainApi || !thumbnailApi) return;

//     const handleTopSelect = () => {
//       const selected = mainApi.selectedScrollSnap();
//       if (selected !== prevIndexRef.current) {
//         setCurrent(selected);
//         prevIndexRef.current = selected;
//         thumbnailApi.scrollTo(selected);
//       }
//     };

//     const handleBottomSelect = () => {
//       const selected = thumbnailApi.selectedScrollSnap();
//       if (selected !== prevIndexRef.current) {
//         setCurrent(selected);
//         prevIndexRef.current = selected;
//         mainApi.scrollTo(selected);
//       }
//     };

//     mainApi.on("select", handleTopSelect);
//     thumbnailApi.on("select", handleBottomSelect);

//     return () => {
//       mainApi.off("select", handleTopSelect);
//       thumbnailApi.off("select", handleBottomSelect);
//     };
//   }, [mainApi, thumbnailApi]);

//   const handleClick = (index: number) => {
//     if (!mainApi || !thumbnailApi || index === current) return;
//     setCurrent(index);
//     prevIndexRef.current = index;
//     thumbnailApi.scrollTo(index);
//     mainApi.scrollTo(index);
//   };

//   return (
//     <div className="w-96 max-w-xl sm:w-auto">
//       <Carousel setApi={setMainApi}>
//         <CarouselContent className="m-1">
//           {images.map((image, index) => (
//             <CarouselItem key={index} className="relative aspect-square w-full">
//               <Image
//                 src={image.url}
//                 alt={`Carousel Main Image ${index + 1}`}
//                 fill
//                 style={{ objectFit: "cover" }}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//       <Carousel setApi={setThumbnailApi}>
//         <CarouselContent className="m-1">
//           {images.map((image, index) => (
//             <CarouselItem
//               key={index}
//               className="relative aspect-square w-full basis-1/4"
//               onClick={() => handleClick(index)}
//             >
//               <Image
//                 className={`${index === current ? "border-2" : ""}`}
//                 src={image.url}
//                 fill
//                 alt={`Carousel Thumbnail Image ${index + 1}`}
//                 style={{ objectFit: "cover" }}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// };

// export default Gallery;
