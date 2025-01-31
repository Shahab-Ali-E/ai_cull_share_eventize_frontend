"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useSmartShareStore from "@/zustand/SmartShare";
import React, { useState } from "react";

function EventDescription({ description }: { description?: string }) {
  const { setCurrentEventData, currentEventData } = useSmartShareStore();
  const [localDescription, setLocalDescription] = useState<string | undefined>(
    description
  );

  // Handle textarea changes
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setLocalDescription(newDescription);
    setCurrentEventData({
      ...currentEventData,
      description: newDescription, // Update global state
    });
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-baseline">
        <Label className="text-primary font-semibold">Add description</Label>
      </div>
      <Textarea
        className="border-2 border-muted resize-none shadow-md shadow-card bg-primary-foreground text-primary p-3 h-32 text-sm"
        placeholder="Write description about event...."
        value={localDescription}
        onChange={handleDescriptionChange} // Update state on change
      />
    </div>
  );
}

export default EventDescription;
