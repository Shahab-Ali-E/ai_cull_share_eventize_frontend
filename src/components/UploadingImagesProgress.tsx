"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import CircularProgressBar from "@/components/ui/circular-progressbar";

interface UploadingImagesProgressProps {
  /** percentage uploaded 0–100 */
  progress?: number;
  /** total number of files to upload */
  totalFiles?: number;
  /** number of files already uploaded */
  uploadedCount?: number;
  /** estimated time remaining */
  eta?: string;
}

const UploadingImagesProgress: React.FC<UploadingImagesProgressProps> = ({
  progress,
  totalFiles,
  uploadedCount,
  eta,
}) => {
  // Determine if upload hasn't started or missing data
  const isStarting =
    progress === undefined ||
    progress ==0 ||
    totalFiles === undefined ||
    uploadedCount === undefined ||
    eta === undefined || 
    eta == "...";

  // Notify before unload (e.g. refresh) when upload in progress
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // show prompt only if upload is in progress
      if (!isStarting) {
        // Standard way to trigger a confirmation dialog
        e.preventDefault();
        // Do NOT set e.returnValue — it's deprecated
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isStarting]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-lg mx-5 md:mx-0 shadow-md border-border bg-primary-foreground">
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {isStarting ? "Starting Soon" : "Uploading Images"}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-2 space-y-6">
          {/* Top line: X of Y files */}
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {isStarting ? "0 of 0" : `${uploadedCount} of ${totalFiles}`}{" "}
              files
            </span>
            <p className="text-sm mt-2 font-medium text-muted-foreground">
              {isStarting ? "Starting soon..." : `${eta} remaining`}
            </p>
          </div>

          {/* Circular progress */}
          <div className="flex flex-col items-center justify-center py-6">
            <CircularProgressBar
              progress={progress}
              indeterminate={isStarting}
              size={185}
              strokeWidth={13}
              primaryColor="hsl(var(--primary))"
              backgroundColor="hsl(var(--muted))"
              textColor="hsl(var(--foreground))"
            />
          </div>

          {/* Bottom info */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Do not refresh the page</p>
            <p className="text-sm mt-1">
              This may take a few minutes depending on your connection speed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadingImagesProgress;
