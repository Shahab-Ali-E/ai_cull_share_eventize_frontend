"use client";

//component
import CustomInputialog from "@/components/custom-input-dialog";

// api and validaton
import { createEvent } from "@/lib/actions/SmartShare/CreateEvent";
import GradientButton from "../ui/gradient-button";

export default function CreateEvent() {
  const createEventBackend = async (eventName: string) => {
    try {
      const response = await createEvent({ EventName: eventName });
      if (response?.error) {
        return { error: response.error };
      } else {
        return { success: response?.success };
      }
    } catch (e) {
      console.error("An error occurred while creating the workspace:", e);
      return { error: "An unexpected error occurred." };
    }
    // await new Promise((resolve)=>setTimeout((resolve),1000));
  };

  //   passing this button as prop to CustomInputDialog
  const triggerButton = (
    <GradientButton className="w-3/4 sm:w-full h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm">
      Create Event
    </GradientButton>
  );
  return (
    <CustomInputialog
      usage="Event"
      triggerButton={triggerButton}
      dialogTitle="Create event"
      onCreate={createEventBackend}
    />
  );
}
