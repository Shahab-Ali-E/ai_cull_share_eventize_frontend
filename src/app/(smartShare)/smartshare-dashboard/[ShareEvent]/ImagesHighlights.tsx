'use client'

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaListUl } from "react-icons/fa"; // Grid and List icons
import { IoGrid } from "react-icons/io5";
import image3 from "@/images/duplicate_after_cull.jpg";
import SmartShareImagesPreview from "@/components/SmartShare/ShareEvent/SmartShareImagesPreview";

interface ImagesHighlightsProps{
  noOfImages:number
}

function ImagesHighlights({noOfImages}:ImagesHighlightsProps) {
  const [isGridView, setIsGridView] = useState(true);

  const images = [
    {
      src: image3,
      name: "hello",
      type: "image/png",
      uploadedDate: "12-12-204",
    },
    {
      src: image3,
      name: "hello",
      type: "image/png",
      uploadedDate: "12-12-204",
    },
    {
      src: image3,
      name: "hello",
      type: "image/png",
      uploadedDate: "12-12-204",
    },
    {
      src: image3,
      name: "hello",
      type: "image/png",
      uploadedDate: "12-12-204",
    },
  ]; // Example array of images

  return (
    <div className="flex flex-col space-y-10 w-full">
      {/* high lights */}
      <div className="flex justify-between">
        <div className="flex space-x-3 items-center text-primary">
          <Label className="text-3xl tracking-wider">Highlights</Label>
          <Badge className="rounded-sm p-2 px-3 font-bold hover:bg-card-foreground">
            {noOfImages}
          </Badge>
        </div>

        {/* view images either in list or grid */}
        <div className="flex space-x-2 text-primary">
          <Button
            onClick={() => setIsGridView(true)}
            variant={isGridView ? "default" : "outline"}
            className="flex items-center space-x-2 border-muted-foreground"
          >
            <IoGrid />
            <span>Grid</span>
          </Button>
          <Button
            onClick={() => setIsGridView(false)}
            variant={!isGridView ? "default" : "outline"}
            className="flex items-center space-x-2 border-muted-foreground"
          >
            <FaListUl />
            <span>List</span>
          </Button>
        </div>
      </div>

      {/* Images display */}
      <div>
        <SmartShareImagesPreview images={images} isInGridView={isGridView} />
      </div>
    </div>
  );
}

export default ImagesHighlights;
