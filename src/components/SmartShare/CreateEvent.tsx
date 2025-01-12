"use client";

import SparkleButton from "../animata/button/sparkle-button";
//component
import CustomInputialog from "../custom-input-dialog";

// api and validaton
import {createEvent} from "@/lib/actions/SmartShare/CreateEvent";

export default function CreateEvent() {

  const createEventBackend = async (eventName: string) => {
    try {
      const response = await createEvent({ EventName:eventName });
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
    <SparkleButton className="top-7">
      Create Event
    </SparkleButton>
  );
  return (
    <CustomInputialog
      usage="Event"
      triggerButton={triggerButton}
      dialogTitle="create Event"
      onCreate={createEventBackend}
    />
  );
}
