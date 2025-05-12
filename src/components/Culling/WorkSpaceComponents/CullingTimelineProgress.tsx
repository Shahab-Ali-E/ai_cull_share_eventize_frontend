"use client";

import {
  AnimatedTimeline,
  TimelineEvent,
  TimelineStyles,
} from "@/components/animata/progress/animated-timeline";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import { cn } from "@/lib/utils";
import useCullingStore from "@/zustand/CullingStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface CullingTimelineProgressProps {
  workSpaceId: string;
  events?: TimelineEvent[];
  title?: string;
  containerClassName?: string;
  timelineStyles?: Partial<TimelineStyles>;
  initialActiveIndex?: number;
  cullingTaskIds: string[];
}

export default function CullingTimelineProgress({
  events,
  title,
  containerClassName,
  timelineStyles,
  workSpaceId,
  cullingTaskIds: propTaskIds,
}: CullingTimelineProgressProps) {
  const [taskStatuses, setTaskStatuses] = useState<TimelineEvent[]>(
    events || []
  );
  const router = useRouter();
  const { cullingTaskIds: zustandTaskIds } = useCullingStore(); // Zustand
  const specificWorkspaceTaskIds = zustandTaskIds[workSpaceId];
  const effectiveTaskIds = propTaskIds?.length ? propTaskIds : specificWorkspaceTaskIds;
  console.log("effective task ids", effectiveTaskIds);

  const updateTaskStatus = useCallback(
    (
      taskIndex: number,
      status: "Pending" | "Progress" | "Completed" | "Retry" | "Failed",
      progress?: number
    ) => {
      setTaskStatuses((prev) =>
        prev.map((task, idx) =>
          idx === taskIndex ? { ...task, status, progress } : task
        )
      );
    },
    []
  );

  const monitorCulling = useCallback(async () => {
    console.log("culling task ids", effectiveTaskIds);
    try {
      await Promise.all(
        effectiveTaskIds.map(async (taskId, i) => {
          return fetchEventSource(`${GET_TASK_STATUS}/${taskId}`, {
            method: "GET",
            headers: { Accept: "text/event-stream" },
            onopen: async (response) => {
              if (response.ok && response.status === 200) {
                console.log("Connection made", response);
              } else if (
                response.status >= 400 &&
                response.status < 500 &&
                response.status !== 429
              ) {
                const errorText = await response.text();
                toast("Server Error", {
                  description: errorText || "An unexpected error occurred.",
                });
              }
            },
            onmessage(ev) {
              try {
                const parsedData = JSON.parse(ev.data);
                console.log("parse data ", parsedData);
                if (
                  parsedData.state === "PENDING" &&
                  parsedData.progress?.progress !== undefined
                ) {
                  updateTaskStatus(i, "Pending", parsedData.progress.progress);
                } else if (
                  parsedData.state === "PROGRESS" &&
                  parsedData.progress?.progress !== undefined
                ) {
                  updateTaskStatus(i, "Progress", parsedData.progress.progress);
                } else if (parsedData.state === "SUCCESS") {
                  updateTaskStatus(i, "Completed");
                } else if (parsedData.state === "FAILURE") {
                  updateTaskStatus(i, "Failed");
                }
              } catch (err) {
                console.error("Error parsing task status:", err);
              }
            },
            onerror(err) {
              toast.error("Unable to start culling", {
                description: err || "Sorry can't start culling",
              });
            },
          });
        })
      );
    } finally {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveTaskIds, workSpaceId, updateTaskStatus]);

  useEffect(() => {
    if (!effectiveTaskIds || effectiveTaskIds.length === 0) return;
    monitorCulling();
  }, [effectiveTaskIds, monitorCulling]);

  if (!effectiveTaskIds || effectiveTaskIds.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Spinner size="large" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center rounded-lg bg-primary-foreground px-12 py-8 text-foreground",
        containerClassName
      )}
    >
      <Label className="text-base sm:text-lg text-primary font-bold mb-3">
        {title}
      </Label>
      <AnimatedTimeline
        events={taskStatuses}
        className="flex flex-col"
        styles={timelineStyles}
        initialActiveIndex={0}
      />
    </div>
  );
}
