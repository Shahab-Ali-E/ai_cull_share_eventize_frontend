"use client";

import GradientButton from "@/components/ui/gradient-button";
import { toast } from "sonner";

function DownloadAction() {
  return (
      <div className="flex w-full sm:justify-end justify-center">
        <GradientButton
          className="w-3/4 sm:w-36 h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm"
          onClick={() => {
            toast.success("Downloading")
          }}
        >
          Download
        </GradientButton>
      </div>
  );
}

export default DownloadAction;
