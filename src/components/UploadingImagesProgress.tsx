"use client";

import { useState, useEffect, useCallback } from "react";
import CircularProgressBar from "@/components/ui/circular-progressbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
interface UploadingImagesTaskStatus {
  state?: "PENDING" | "PROGRESS" | "SUCCESS" | "RETRY" | "FAILURE" | "STARTED";
  progress?: {
    progress: string;
    current: number;
    total: number;
    elapsedTime: number;
    remainingTime: number;
  };
  result?: { status: string; totalImages: number; processedImages: number };
}
const UploadingImagesProgress = ({
  uploadingImagesTaskId,
}: {
  uploadingImagesTaskId: string | null;
}) => {
  const [taskStatus, setTaskStatus] = useState<UploadingImagesTaskStatus>();
  const [hasNotified, setHasNotified] = useState(false);
  const router = useRouter();

  const updateTaskStatus = useCallback((update: UploadingImagesTaskStatus) => {
    setTaskStatus((prev) => ({ ...prev, ...update }));
  }, []);

  const monitorUploadingImages = useCallback(async () => {
    if (!uploadingImagesTaskId) return;

    try {
      fetchEventSource(`${GET_TASK_STATUS}/${uploadingImagesTaskId}`, {
        method: "GET",
        headers: { Accept: "text/event-stream" },
        onopen: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            toast.error("Server Error", {
              description: errorText || "An unexpected error occurred.",
            });
          }
        },
        onmessage(ev) {
          try {
            const parsedData = JSON.parse(ev.data);
            if (
              parsedData.state === "PENDING" ||
              parsedData.state === "STARTED"
            ) {
              updateTaskStatus({
                state: "PENDING",
                progress: {
                  elapsedTime: 0,
                  progress: "0",
                  remainingTime: 0,
                  current: 0,
                  total: 0,
                },
              });
            } else if (parsedData.state == "PROGRESS") {
              updateTaskStatus({
                state: parsedData.state,
                progress: {
                  elapsedTime: parsedData.progress.elapsed_time,
                  progress: parsedData.progress.progress,
                  current: parsedData.progress.current,
                  total: parsedData.progress.total,
                  remainingTime: parsedData.progress.remaining_time,
                },
              });
            } else if (parsedData.state == "FAILURE") {
              updateTaskStatus({
                state: parsedData.state,
                result:{status:"FAILURE", totalImages:0, processedImages:0}
              });
              if (!hasNotified) {
                toast.error("Failed to upload images");
                console.error("error uploading images", parsedData)
                setHasNotified(true);
                router.refresh();
              }
            } else if (parsedData.state == "SUCCESS") {
              updateTaskStatus({
                state: parsedData.state,
                result: parsedData.result,
              });

              if (!hasNotified) {
                toast.success("Images are uploaded successfully");
                setHasNotified(true);
                router.refresh();
              }
            }
          } catch (err) {
            console.error("Error parsing task status:", err);
          }
        },
        onerror(err) {
          console.error("FetchEventSource error:", err);
        },
      });
    } catch (error) {
      console.error("Error monitoring status:", error);
    }
  }, [hasNotified, router, updateTaskStatus, uploadingImagesTaskId]);

  useEffect(() => {
    if (!uploadingImagesTaskId) return;
    monitorUploadingImages();
  }, [monitorUploadingImages, uploadingImagesTaskId]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-lg mx-5 md:mx-0 shadow-md border-border bg-primary-foreground">
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Uploading Images
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-2">
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              {taskStatus?.state === "PENDING" ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <span className="text-sm">
                  {taskStatus?.progress?.current} of{" "}
                  {taskStatus?.progress?.total} files
                </span>
              )}
              {taskStatus?.progress?.remainingTime === undefined ||
              taskStatus?.state === "PENDING" ? (
                <p className="text-sm mt-2 font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-32" />
                </p>
              ) : (
                <p className="text-sm mt-2 font-medium text-muted-foreground">
                  {taskStatus.progress.remainingTime >= 60
                    ? `${Math.floor(
                        taskStatus.progress.remainingTime / 60
                      )} min ${Math.floor(
                        taskStatus.progress.remainingTime % 60
                      )} sec`
                    : `${Math.floor(
                        taskStatus.progress.remainingTime
                      )} sec`}{" "}
                  left
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center py-6">
              <CircularProgressBar
                progress={parseInt(taskStatus?.progress?.progress || "0")}
                size={185}
                strokeWidth={13}
                primaryColor="hsl(var(--primary))"
                backgroundColor="hsl(var(--muted))"
                textColor="hsl(var(--foreground))"
              />
            </div>

            <div className="text-center text-muted-foreground">
              {taskStatus?.state === "PENDING" ? (
                <div className="flex flex-col items-center justify-center">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-72 mt-2" />
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    Uploading {taskStatus?.progress?.total} images to server
                  </p>
                  <p className="text-sm mt-2">
                    This may take a few minutes depending on your connection
                    speed
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadingImagesProgress;
