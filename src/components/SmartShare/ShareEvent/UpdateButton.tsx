"use client";

import { Button } from "@/components/ui/button";
import useSmartShareStore from "@/zustand/SmartShare";
import React, { useState, useEffect } from "react";
import { UpdateEvent } from "@/lib/actions/SmartShare/UpdateEvent"; // Import your API function
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UpdateButton({ eventId }: { eventId?: string }) {
  const { currentEventData, setCurrentEventData } = useSmartShareStore();
  const router = useRouter();

  // Store the initial values of `description` and `cover_image`
  const [initialEventData] = useState({
    description: currentEventData?.description,
    cover_image: currentEventData?.cover_image,
  });

  // State to track if the fields have changed
  const [hasChanged, setHasChanged] = useState(false);

  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if `description` or `cover_image` has changed
    if (
      currentEventData?.description !== initialEventData.description ||
      currentEventData?.cover_image !== initialEventData.cover_image
    ) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [currentEventData, initialEventData]);

  // Call the backend API to reflect changes in the backend
  const updateEventInformation = async () => {
    setIsLoading(true); // Set loading state
    try {
      // Create a FormData object for handling multipart/form-data
      const formData = new FormData();
      if (currentEventData.description) formData.append("description", currentEventData.description);
      if (currentEventData.cover_image) formData.append("cover_image", currentEventData.cover_image);

      const response = await UpdateEvent({
        eventId: eventId || "",
        updateFields:formData
      });

      if (response.error) {
        toast.error("Update Failed",{
          
          description: Array.isArray(response.error)
            ? response.error[0].msg
            : response.error,
        });
      } else {
        toast.success("Update Successfull",{
          description: "Event information updated successfully.",
        });

        // clear the states after successfull response
        setCurrentEventData({
          ...currentEventData,
          description: "",
          cover_image: "",
        });

        // refresh the router
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Update Failed",{
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        variant="default"
        className="rounded-sm"
        onClick={updateEventInformation}
        disabled={!hasChanged || isLoading}
      >
        {isLoading ? (
          <>
            Updating... <Loader2 className="animate-spin h-4 w-4" />{" "}
          </>
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
}

export default UpdateButton;
