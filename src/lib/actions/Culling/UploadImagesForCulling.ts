"use server";

import { UPLOAD_CULLING_IMAGES } from "@/constants/ApiUrls";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getClerkToken } from "../clerk-token";
import axios from "axios";
import type {AxiosResponse} from "axios"


// Interface for the upload
interface uploadCullingImages {
  workSpaceId: string;
  imagesData: FormData;
  progress: (val: number) => void; // callback to pass progress to client
}

export const uploadCullingImagesToServer = async ({
  workSpaceId,
  imagesData,
  progress,
}: uploadCullingImages): Promise<{
  data?: { task_id: string };
  progress: number;
  error?: string;
}> => {
  let finalProgress = 0;
  let response: AxiosResponse;

  try {
    const token = await getClerkToken();
    const apiUrl = `${UPLOAD_CULLING_IMAGES}/${workSpaceId}`;

    console.log(`[Upload] Starting upload to: ${apiUrl}`);

    response = await axios.post(apiUrl, imagesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded / progressEvent.total!) * 50);
        finalProgress = percent;
        progress(percent); // Send progress to client via callback
        console.log(`[Upload Progress] ${percent}%`);
      },
    });

    const status = response.status;
    const data = response.data;
    finalProgress = 100;
    progress(100); // Final update to progress

    console.log(`[Upload] Upload complete. Status: ${status}`);

    if (status === 401) {
      console.warn(`[Upload] Unauthorized - redirecting to login`);
      redirect("/login");
    }

    if (status === 415 || status === 500) {
      return { error: data?.details || "Upload failed", progress: finalProgress };
    }

    revalidateTag("getCullingWorkspaceById");

    return {
      data: data,
      progress: finalProgress,
    };
  } catch (e) {
    let errorMessage = "Unknown error occurred";
    let stackTrace = "No stack trace available";

    if (e instanceof Error) {
      errorMessage = e.message;
      stackTrace = e.stack || stackTrace;
    }

    const errorLog = [
      `Error Message: ${errorMessage}`,
      `Stack Trace:\n${stackTrace}`,
      `API URL: ${UPLOAD_CULLING_IMAGES}/${workSpaceId}`,
      `Response Status: ${response.status || "No response"}`,
    ].join("\n\n");


    console.error("[Upload Error]", errorLog);
    return {
      error: "Failed to upload images. Check error log for details.",
      progress: finalProgress,
    };
  }
};
