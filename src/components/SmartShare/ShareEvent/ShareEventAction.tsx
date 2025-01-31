"use client";

import SparkleButton from "@/components/animata/button/sparkle-button";
import { toast } from "sonner";

function ShareEventAction() {
  return (
        <SparkleButton
          className="text-xs sm:text-sm"
          onClick={() => toast.success("sharing event")}
        >
          Publish Event
        </SparkleButton>
  );
}

export default ShareEventAction;
