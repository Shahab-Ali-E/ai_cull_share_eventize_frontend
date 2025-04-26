"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { getClerkToken } from "../clerk-token";
import { UPLOAD_EVENT_IMAGES_METADATA } from "@/constants/ApiUrls";
import type { AxiosResponse } from "axios";
import { ImagesMetadataResponse } from "@/@types/smart-culling";

interface UploadImagesMetadataProps {
  eventId: string;
  combinedSize: number;
  imagesMetadata: (Omit<ImagesMetadataResponse, "id"> & {
    smart_share_folder_id: string;
  })[];
}

export const uploadEventImagesMetadata = async ({
  eventId,
  combinedSize,
  imagesMetadata,
}: UploadImagesMetadataProps): Promise<{
  data?: { message: string };
  error?: string;
}> => {
  try {
    const token = await getClerkToken();
    const apiUrl = `${UPLOAD_EVENT_IMAGES_METADATA}/${eventId}?combined_size=${combinedSize}`;

    const response: AxiosResponse = await axios.post(apiUrl, imagesMetadata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the backend response has an error
    if (response.status === 401) {
      redirect("/login");
    }

    // Ensure the response contains the status and message
    if (response.status !== 202) {
      throw new Error(response.data?.message || "Upload failed");
    }

    // If the response was successful (status 202), revalidate and return data
    revalidateTag("getSmartShareEventByIdTag");
    return { data: response.data };

  } catch (e: unknown) {
    let backendMessage = "Upload failed";
    let status = null;

    if (axios.isAxiosError(e)) {
      // Log Axios error details
      backendMessage =
        e.response?.data?.message ||
        e.response?.data?.detail ||
        e.message ||
        "Unknown error";
      status = e.response?.status;
    } else if (e instanceof Error) {
      backendMessage = e.message;
    }

    console.error("[Upload Error]", {
      message: backendMessage,
      url: `${UPLOAD_EVENT_IMAGES_METADATA}/${eventId}`,
      status,
    });

    return { error: backendMessage };
  }
};
