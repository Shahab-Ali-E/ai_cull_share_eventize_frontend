"use server";

import { UPLOAD_BEFORE_CULLING_IMAGES_METADATA } from "@/constants/ApiUrls";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getClerkToken } from "../clerk-token";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { ImagesMetadataResponse } from "@/@types/smart-culling";

// Interface for the upload
interface UploadImagesMetadataProps {
  workSpaceId: string;
  combinedSize: number;
  imagesMetadata: (Omit<ImagesMetadataResponse, "id"> & {
    culling_folder_id: string;
  })[];
}

export const uploadPreCullImagesMetadata = async ({
  workSpaceId,
  combinedSize,
  imagesMetadata,
}: UploadImagesMetadataProps): Promise<{
  data?: { message: string };
  error?: string;
}> => {
  let response: AxiosResponse | undefined;

  try {
    const token = await getClerkToken();
    const apiUrl = `${UPLOAD_BEFORE_CULLING_IMAGES_METADATA}/${workSpaceId}?combined_size=${combinedSize}`;

    response = await axios.post(apiUrl, imagesMetadata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const status = response?.status;
    const data = response?.data;

    if (status === 401) {
      console.warn("[Upload] Unauthorized - redirecting to login");
      redirect("/login");
    }

    if (status === 415 || status === 500) {
      return {
        error: data?.details || "Upload failed",
      };
    }

    revalidateTag("getCullingWorkspaceById");

    return {
      data,
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
      `API URL: ${UPLOAD_BEFORE_CULLING_IMAGES_METADATA}/${workSpaceId}`,
      `Response Status: ${response?.status || "No response"}`,
    ].join("\n\n");

    console.error("[Upload Error]", errorLog);
    return {
      error: "Failed to upload images. Check error log for details.",
    };
  }
};
