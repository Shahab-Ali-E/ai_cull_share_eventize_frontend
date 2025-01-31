import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

interface EventIdLabelProps {
  eventId?: string;
}

const EventIdLabel: React.FC<EventIdLabelProps> = ({ eventId }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(eventId || "NA").then(() => {
        setIsCopied(true); // Show tick icon
        toast.success("Event id copied to clipboard");
        setTimeout(() => setIsCopied(false), 5000); // Revert back to copy icon after 5 seconds
      });
    } else {
      toast.warning("Copying to clipboard is not supported on your device.");
    }
  };

  return (
    <Label className="flex-wrap font-semibold flex items-center">
      <span className="text-primary">Event Id:</span>
      <Button
        className="font-normal text-muted-foreground cursor-pointer hover:underline hover:bg-primary-foreground w-fit flex items-center"
        onClick={handleCopyToClipboard}
        variant={"ghost"}
        title={isCopied ? "Copied!" : "Click to copy"}
      >
        <span className="truncate max-w-[18ch] sm:max-w-[26ch]">{eventId}</span>
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
