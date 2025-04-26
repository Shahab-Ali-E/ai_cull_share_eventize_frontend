"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function DynamicImagePlaceholder({ src, alt }: { src: string; alt: string }) {
  // const [imageBlur, setImageBlur] = useState<string | null>(null);

  // useEffect(() => {
  //   let isMounted = true;

  //   async function fetchBlurImage() {
  //     try {
  //       const res = await fetch(src);
  //       const buffer = Buffer.from(await res.arrayBuffer()).toString("base64");

  //       if (isMounted) {
  //         setImageBlur(buffer);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blur image:", error);
  //     }
  //   }

  //   fetchBlurImage();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [src]); // Fetch only when `src` changes

  return (
    <Image
      src={src}
      alt={alt}
      height={200}
      width={200}
      className="w-full h-72 object-cover"
      // blurDataURL={imageBlur ? `data:image/png;base64,${imageBlur}` : undefined}
      // placeholder={imageBlur ? "blur" : "empty"}
    />
  );
}

export default DynamicImagePlaceholder;
