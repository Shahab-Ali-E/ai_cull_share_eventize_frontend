"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFaceRecognitionStore } from "@/zustand/FaceRecognitionStore";
import FaceRecognitionImagesPreview from "@/components/get-images/FaceRecognitionImagesPreview";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import GridListFaceRecognitionView from "@/components/get-images/GridListFaceRecognitionView";
import NoImagesFound from "@/components/get-images/NoImagesFound";

export default function FaceRecognitionResultPage() {
  const { images } = useFaceRecognitionStore();
  const [loading, setLoading] = useState(true);
  const [toggleView, setToggleView] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-7 text-primary space-y-4">
      <div className="flex w-full justify-between">
        {/* face recognition result images */}
        <div className="flex space-x-1 sm:space-x-3 items-center text-primary">
          <Label className="text-base sm:text-xl font-semibold tracking-wider">
            Identified Images
          </Label>

          <Badge className="rounded-full py-1 text-xs font-bold hover:bg-card-foreground">
            {images.length}
          </Badge>
        </div>
        <div className="flex mb-4">
          <GridListFaceRecognitionView
            setToggleView={setToggleView}
            toggleView={toggleView}
          />
        </div>
      </div>
      <div className="flex h-full w-full justify-center items-center">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} className="h-96 w-full rounded-md" />
            ))}
          </div>
        ) : images && images.length > 0 ? (
          <FaceRecognitionImagesPreview images={images} toggleView={toggleView} />
        ) : (
          <NoImagesFound/> 
        )}
      </div>
    </div>
  );
}
