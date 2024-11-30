// // ImagesPreviewComponent.tsx

import React from 'react';
import Image from 'next/image';

function ImagePreview({images }:{images:string}) {

  return (
      <div className="shadow-md shadow-card rounded-sm">
        <Image
          src={images}
          height={200}
          width={200}
          alt={`Image`}
          className="rounded-sm object-cover h-32 w-32 sm:h-64 sm:w-80"
          quality={100}
          unoptimized={true}
        />
      </div>
  );
}

export default ImagePreview;


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
