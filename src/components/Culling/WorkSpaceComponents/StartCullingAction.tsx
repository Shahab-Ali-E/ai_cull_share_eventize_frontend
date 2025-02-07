"use client";

import GradientButton from "@/components/ui/gradient-button";
import { StartCulling } from "@/lib/actions/Culling/StartCulling";
import useCullingStore from "@/zustand/CullingStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import { Spinner } from "@/components/ui/spinner";
import { getTaskUpdateInterface } from "@/@types/Types";
import NotFound from "@/app/(dashboards)/(smartCulling)/culling-dashboard/[...slug]/not-found";
import { toast } from "sonner";

function StartCullingAction({
  enableCullingButton,
  workSpaceId,
  temporaryImagesUrl,
}: {
  enableCullingButton: boolean;
  workSpaceName?: string;
  workSpaceId?: string;
  temporaryImagesUrl?: string[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setCullingTaskIds } = useCullingStore();


  if (!workSpaceId) {
    return <NotFound />;
  }
  // For starting culling
  const handleStartCulling = async () => {
    if (temporaryImagesUrl) {
      const imagesUrls = temporaryImagesUrl.map((ele) => ele);

      try {
        setLoading(true); // Start loading when culling starts
        const { data, error } = await StartCulling({
          workSpaceId: workSpaceId,
          imagesUrl: imagesUrls,
        });

        if (error) {
          const errorMessage = Array.isArray(error)
            ? error.map((ele) => ele.msg).join(", ")
            : "Refresh the page, these image links have expired";

          toast.error("Server Error",{
            description: errorMessage,
          });
          console.error("Error from backend:", error);
          return;
        }

        if (data && data?.task_id) {
          // setTaskId(data.task_id);
          await fetchEventSource(`${GET_TASK_STATUS}/${data?.task_id}`, {
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
                toast.error("Server Error",{
                  description: errorText || "An unexpected error occurred.",
                });
              }
            },
            onmessage(ev) {
              try {
                const parsedData: getTaskUpdateInterface = JSON.parse(ev.data);
                if (parsedData?.result?.task_ids) {
                  const extractedIds = parsedData.result.task_ids;
                  setCullingTaskIds({
                    workSpaceId: workSpaceId,
                    ids: extractedIds,
                  });
                  toast.success("Culling started successfully")
                  console.log("task id", data.task_id);
                }
              } catch (error) {
                toast.error("Server Error",{
                  description: String(error) || "Sorry can't start culling",
                });
              }
            },
            onerror(err) {
              toast.error("Unable to start culling",{
                description: err || "Sorry can't start culling",
              });           
            },
          });
        }
      } catch (error) {
        toast.error("Network Error",{
          description: String(error),
        });
        console.error("Network error:", error);
      } finally {
        router.refresh();
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="flex justify-end px-5 py-3">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner size="large" />
        </div>
      )}

      <div className="flex w-full sm:justify-end justify-center">
          {enableCullingButton && (
            <GradientButton
              className="w-3/4 sm:w-36 h-10 xl:h-10 lg:h-10 md:h-10 text-xs sm:text-sm rounded-sm"
              onClick={() => handleStartCulling()}
            >
              Start Culling
            </GradientButton>
          )}
      </div>
    </div>
  );
}

export default StartCullingAction;
