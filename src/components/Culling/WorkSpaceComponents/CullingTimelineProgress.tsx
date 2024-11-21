'use client';

import { AnimatedTimeline, TimelineEvent, TimelineStyles } from "@/components/animata/progress/animated-timeline";
import { Label } from "@/components/ui/label";
import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useCullingStore from "@/zustand/CullingStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CullingTimelineProgressProps {
    events?: TimelineEvent[];
    title?: string;
    containerClassName?: string;
    timelineStyles?: Partial<TimelineStyles>;   
    initialActiveIndex?: number;
}

export default function CullingTimelineProgress({
    events,
    title,
    containerClassName,
    timelineStyles,
}: CullingTimelineProgressProps) {
    const { cullingTaskIds, currentActiveWorkSpaceData, clearCullingTaskIds } = useCullingStore();
    const { toast } = useToast();
    const [taskStatuses, setTaskStatuses] = useState<TimelineEvent[]>(events || []);
    const router = useRouter();

    const taskIds = cullingTaskIds[currentActiveWorkSpaceData.id] || [];

    const updateTaskStatus = useCallback((taskIndex: number, status: "Pending" | "Progress" | "Completed" | "Retry" | "Failed", progress?: number) => {
      setTaskStatuses((prev) =>
        prev.map((task, idx) =>
          idx === taskIndex ? { ...task, status, progress } : task
        )
      );
    }, []);

    const monitorCulling = useCallback(async () => {
      if (!taskIds.length) return;

      try {
        await Promise.all(
          taskIds.map(async (taskId, i) => {
            return fetchEventSource(`${GET_TASK_STATUS}/${taskId}`, {
              onmessage(ev) {
                try {
                  const parsedData = JSON.parse(ev.data);
                  if (parsedData.state === "PENDING" && parsedData.progress?.progress !== undefined) {
                    updateTaskStatus(i, "Pending", parsedData.progress.progress);
                  } else if (parsedData.state === "PROGRESS" && parsedData.progress?.progress !== undefined) {
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
                if (err.name !== "AbortError") {
                  toast({
                    title: "Error",
                    description: `Failed to fetch task status: ${err}`,
                    variant: "destructive",
                  });
                }
              },
            });
          })
        );
      } finally {
        clearCullingTaskIds(currentActiveWorkSpaceData.id);
        router.refresh();
      }
    }, [taskIds, clearCullingTaskIds, currentActiveWorkSpaceData.id, updateTaskStatus]);
    
  
    useEffect(() => {
      if (taskIds.length === 0) return;
  
      monitorCulling();
  
      // Cleanup function to prevent memory leaks
      return () => {
      };
    }, [monitorCulling]);
      

    return (
        <div
            className={cn(
                "flex flex-col justify-center items-center rounded-lg bg-white dark:bg-primary-foreground px-12 py-8 text-foreground",
                "shadow-[0px_0px_15px_5px_rgba(173,216,230,0.3),0px_0px_30px_10px_rgba(173,216,230,0.2),0px_0px_60px_20px_rgba(173,216,230,0.1)]",
                "dark:shadow-[0px_0px_15px_5px_rgba(150,150,150,0.3),0px_0px_60px_60px_rgba(150,150,150,0.2),0px_0px_60px_20px_rgba(150,150,150,0.1)]",
                containerClassName,
            )}
        >
            <Label className="text-3xl text-primary font-bold mb-5">{title}</Label>
            <AnimatedTimeline
                events={taskStatuses}
                className="flex flex-col"
                styles={timelineStyles}
                initialActiveIndex={0}
            />
        </div>
    );
}
