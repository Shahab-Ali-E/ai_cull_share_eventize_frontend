"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, AlignJustify } from "lucide-react";
import useCullingStore from "@/zustand/CullingStore";

export default function GridListView() {
  const { toggleView, setToggleView } = useCullingStore();

  return (
    <div className="flex items-center bg-primary-foreground p-1 rounded-md text-primary shadow-md shadow-gray-300 dark:shadow-none">
      {/* Grid View Button */}
      <Button
        variant="ghost"
        className={cn(
          "flex items-center space-x-2 px-3 rounded-sm text-sm hover:bg-gray-200 dark:hover:bg-muted",
          toggleView && "bg-gray-200 dark:bg-muted"
        )}
        onClick={() => setToggleView(true)}
      >
        <LayoutGrid size={14} />
        <span className="hidden sm:inline" >Grid</span>
      </Button>

      {/* List View Button */}
      <Button
        variant="ghost"
        className={cn(
          "flex items-center space-x-2 px-3 rounded-sm text-sm hover:bg-gray-200 dark:hover:bg-muted",
          !toggleView && "bg-gray-200 dark:bg-muted"
        )}
        onClick={() => setToggleView(false)}
      >
        <AlignJustify size={14} />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
}
