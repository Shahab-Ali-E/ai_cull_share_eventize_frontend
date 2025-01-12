"use client";

import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/gradient-button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { StartCulling } from "@/lib/actions/StartCulling";
import useCullingStore from "@/zustand/CullingStore";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { GET_TASK_STATUS } from "@/constants/ApiUrls";
import { Spinner } from "@/components/ui/spinner";
import { getTaskUpdateInterface } from "@/@types/Types";
import NotFound from "@/app/(culling)/culling-dashboard/[...slug]/not-found";

function WorkSpaceBeforeCullHeader({
  enableCullingButton,
  workSpaceName,
  workSpaceId,
  temporaryImagesUrl,
}: {
  enableCullingButton: boolean;
  workSpaceName?: string;
  workSpaceId?: string;
  temporaryImagesUrl?: string[];
}) {
  const router = useRouter();
  const { toast } = useToast();
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

          toast({
            title: "Server Error",
            description: errorMessage,
            variant: "destructive",
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
                toast({
                  title: "Server Error",
                  description: errorText || "An unexpected error occurred.",
                  variant: "destructive",
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
                  console.log("task id", data.task_id);
                }
              } catch (error) {
                toast({
                  title: "Server Error",
                  description: String(error) || "Sorry can't start culling",
                  variant: "destructive",
                });
              }
            },
            onerror(err) {
              toast({
                title: "Unable to start culling",
                description: err || "Sorry can't start culling",
                variant: "destructive",
              });           
            },
          });
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description: String(error),
          variant: "destructive",
        });
        console.error("Network error:", error);
      } finally {
        router.refresh();
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner size="large" />
        </div>
      )}

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            onClick={() => {
              router.back();
            }}
            variant="link"
          >
            <IoChevronBack className="text-primary font-extrabold h-5 w-5 xl:h-8 xl:w-8 lg:h-8 lg:w-8 md:h-5 md:w-5" />
          </Button>
          <Label className="font-bold text-primary text-2xl xl:text-4xl lg:text-4xl md:text-2xl">
            {workSpaceName}
          </Label>
        </div>

        <div className="flex items-center space-x-5 pr-5">
          {enableCullingButton && (
            <GradientButton
              className="xl:w-48 lg:w-44 md:w-40"
              onClick={() => handleStartCulling()}
            >
              Start Culling
            </GradientButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceBeforeCullHeader;
