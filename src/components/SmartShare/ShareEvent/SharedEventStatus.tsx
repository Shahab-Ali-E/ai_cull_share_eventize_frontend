"use client";

import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import useSmartShareStore from "@/zustand/SmartShare";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface PublishedEventTaskStatus {
  state?: "PENDING" | "PROGRESS" | "SUCCESS" | "RETRY" | "FAILURE" | "STARTED";
  progress?: {
    progress: string;
    elapsedTime: number;
    rate: number;
  };
  result?: { status: string; totalImages: number; processedImages: number };
  currentTask?: string; //"Downloading Images" or "Processing Images"
}

function SharedEventStatus({
  eventId,
  status,
}: {
  eventId: string;
  status: "Not Published" | "Published" | "Pending";
}) {
  const { publishedTaskIds } = useSmartShareStore();
  const taskId = publishedTaskIds[eventId];
  const [taskStatus, setTaskStatus] = useState<PublishedEventTaskStatus>();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");

  const updateTaskStatus = useCallback((update: PublishedEventTaskStatus) => {
    setTaskStatus((prev) => ({ ...prev, ...update }));
  }, []);

  const monitorStatus = useCallback(async () => {
    if (!taskId) return;
    if (status === "Not Published" || status === "Published") return;

    try {
      fetchEventSource(`${GET_TASK_STATUS}/${taskId}`, {
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
            if (parsedData.state === "PENDING") {
              updateTaskStatus({
                state: "PENDING",
                progress: {
                  elapsedTime: 0,
                  progress: "0",
                  rate: 0,
                },
              });
            } else if (parsedData.state === "PROGRESS") {
              updateTaskStatus({
                state: parsedData.state,
                progress: {
                  elapsedTime: parsedData.progress.elapsed_time,
                  progress: parsedData.progress.progress,
                  rate: parsedData.progress.rate,
                },
                currentTask: parsedData.progress.current, // e.g. "Downloading Images" / "Processing Images"
              });
            } else if (parsedData.state === "SUCCESS") {
              updateTaskStatus({
                state: parsedData.state,
                result: {
                  status: parsedData.result.status,
                  processedImages: parsedData.result.processed_images,
                  totalImages: parsedData.result.total_images,
                },
              });
              setShowSuccessDialog(true);
              // Generate the QR code using the event URL
              QRCode.toDataURL(`http://localhost:3000/get-images/${eventId}`)
                .then((src) => {
                  setQrCodeSrc(src);
                })
                .catch((err) => {
                  toast.error(String(err));
                });
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
  }, [status, taskId, eventId, updateTaskStatus]);

  useEffect(() => {
    if (!publishedTaskIds) return;
    monitorStatus();
  }, [monitorStatus, publishedTaskIds]);

  // Determine active task (1/2 or 2/2)
  const getTaskProgressText = () => {
    if (taskStatus?.state === "PENDING") return "Pending 1/2";
    if (taskStatus?.currentTask === "Downloading Images")
      return "Downloading 1/2";
    if (taskStatus?.currentTask === "Processing Images")
      return "Processing 2/2";
    return "Published";
  };

  // download QR code function
  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeSrc;
    link.download = `${eventId}-QR.png`;
    link.click();
    setShowSuccessDialog(false); // Close the dialog
  };

  console.log("task status in share_event",taskStatus)

  return (
    <React.Fragment>
      {(taskStatus?.state === "SUCCESS" || status === "Published") && (
        <Label
          className={cn(
            "flex gap-2 items-center justify-center py-4 text-primary rounded"
          )}
        >
          <span className="text-base font-semibold">
            {getTaskProgressText()}
          </span>
          <CheckCircle className="h-5 w-5 text-green-500" />
        </Label>
      )}
      {(taskStatus?.state === "PENDING" || taskStatus?.state==="STARTED") && (
        <Label
          className={cn(
            "w-2/12 flex flex-col gap-2 items-start justify-center p-3 text-primary bg-card rounded"
          )}
        >
          <div className="flex items-center justify-between w-full">
            {/* <Clock className="h-4 w-4 opacity-70" /> */}
            <div className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span className="bg-accent-foreground p-0.5 rounded-full inline-flex"></span>
              Pending...
            </div>
            <Tooltip>
              <TooltipTrigger asChild className="z-10">
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-primary-foreground p-3 rounded-sm text-primary"
              >
                Starting you processing soon....
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex justify-center w-full items-center">
            <Progress
              indeterminate={true}
            />
          </div>
        </Label>
      )}
      {taskStatus?.state === "PROGRESS" && (
        <Label
          className={cn(
            "w-2/12 flex flex-col gap-2 items-start justify-center p-3 text-primary bg-card rounded"
          )}
        >
          <div className="flex items-center justify-between w-full">
            {/* <Clock className="h-4 w-4 opacity-70" /> */}
            <div className="inline-flex items-center gap-1.5 text-muted-foreground">
              {" "}
              <span className="bg-green-500 p-0.5 rounded-full inline-flex"></span>{" "}
              In Progress{" "}
              {taskStatus.currentTask === "Downloading images" ? (
                <span>1</span>
              ) : (
                <span>2</span>
              )}{" "}
              / 2
            </div>
            <Tooltip>
              <TooltipTrigger asChild className="z-10">
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-primary-foreground p-3 rounded-sm text-primary"
              >
                Publishing soon. Processing time varies by image count.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex justify-center w-full items-center gap-2">
            <Progress
              value={parseInt(
                taskStatus.progress?.progress.replace("%", "") || "0.0"
              )}
            />
            <span className="text-muted-foreground">
              {taskStatus.progress?.progress}
            </span>
          </div>
        </Label>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="flex flex-col items-center p-3 bg-primary-foreground text-primary">
          <DialogHeader className="flex items-center">
            <div className="flex w-fit justify-center items-center bg-green-500/20 rounded-full p-2">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <DialogTitle className="text-lg text-primary font-semibold">
              Event Published
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground text-sm max-w-xs">
            The event is live now. Share the QR code with friends to access the
            images!
          </p>
          {qrCodeSrc ? (
            <Image
              src={qrCodeSrc}
              alt="QR Code"
              height={200}
              width={200}
              className="rounded border border-muted"
            />
          ) : (
            <Skeleton className="h-60 w-60 rounded-md" />
          )}
          <Button
            variant="default"
            onClick={downloadQrCode}
            className="mt-4 rounded-md"
          >
            Download
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default SharedEventStatus;
