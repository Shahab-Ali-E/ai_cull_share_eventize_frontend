"use client";

import { useState } from "react";
import { SmartShareImagesMetadata } from "@/@types/smart-share";
import GradientButton from "@/components/ui/gradient-button";
import { Spinner } from "@/components/ui/spinner";
import { publicEvent } from "@/lib/actions/SmartShare/ShareEvent";
import { cn } from "@/lib/utils";
import useSmartShareStore from "@/zustand/SmartShare";
import { toast } from "sonner";

function ShareEventAction({
  disable,
  eventImages,
  eventId,
}: {
  disable: boolean;
  eventId: string;
  eventImages: SmartShareImagesMetadata[];
}) {
  const imagesUrls = eventImages
    .map(({ image_download_path }) => image_download_path ?? "")
    .filter((url) => url !== "");

  const [loading, setLoading] = useState(false);
  const { setPublishedTaskIds } = useSmartShareStore();

  const shareEvent = async () => {
    setLoading(true);
    try {
      const result = await publicEvent({ eventId, imagesData: imagesUrls });

      if (result.error?.trim()) {
        toast.error(result.error);
      } else {
        setPublishedTaskIds({ eventId, taskId: result.data.task_id });
        toast.success("Sharing event !")
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GradientButton
        className={cn(
          "h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm transition duration-300 ease-in-out",
          disable ? "from-muted-foreground to-gray-600 cursor-not-allowed" : "",
          loading && "cursor-not-allowed opacity-60 hover:opacity-60"
        )}
        onClick={shareEvent}
        disabled={disable || loading}
      >
        {loading ? <span>Publishing..</span> : <span>Publish Event</span>}
        <Spinner size="small" show={loading} className="ml-2 h-5 w-5" />
      </GradientButton>
    </>
  );
}

export default ShareEventAction;
