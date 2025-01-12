"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface EventIdLabelProps {
  eventId?: string;
}

const EventIdLabel: React.FC<EventIdLabelProps> = ({ eventId }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(eventId || "NA")
      .then(() => {
        setIsCopied(true); // Show tick icon
        setTimeout(() => setIsCopied(false), 5000); // Revert back to copy icon after 5 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Truncate file names to avoid overflow
  const truncateEventId = (id?: string, maxLength: number = 10): string => {
    if (!id) return ""; // Handle undefined or empty id
    return id.length > maxLength ? id.slice(0, maxLength) + "..." : id;
  };

  return (
    <Label className="flex-wrap font-semibold flex items-center">
      Event Id:{" "}
      <Button
        className="font-normal text-headingtext cursor-pointer hover:underline w-fit flex items-center ml-2"
        onClick={handleCopyToClipboard}
        variant={"ghost"}
        title={isCopied ? "Copied!" : "Click to copy"}
      >
        {truncateEventId(eventId, 20)}
        {isCopied ? (
          <FiCheck className="ml-1 text-green-500" />
        ) : (
          <FiCopy className="ml-1 text-muted-foreground hover:text-primary" />
        )}
      </Button>
    </Label>
  );
};

export default EventIdLabel;
