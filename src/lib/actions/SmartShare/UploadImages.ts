"use server";

import { UPLOAD_SMART_SHARE_IMAGES } from "@/constants/ApiUrls";
import { revalidateTag } from "next/cache";
import { getClerkToken } from "../clerk-token";

// Interface for the upload
interface uploadSmartShareImagesProps {
  eventId: string;
  imagesData: FormData;
}

export const uploadSmartShareImages = async ({
  eventId,
  imagesData,
}: uploadSmartShareImagesProps) => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const token = await getClerkToken();

    const apiUrl = `${UPLOAD_SMART_SHARE_IMAGES}/${eventId}`;

    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imagesData,
    });

    const jsonResponse = await response.json();

    if (response.status === 415) {
      return { error: jsonResponse.detail };
    } else if (response.status === 500 || !response.ok) {
      return {
        error: jsonResponse.detail,
      };
    } else {
      revalidateTag("getSmartShareEventsTag");
      return { data: jsonResponse };
    }
  } catch (e) {
    // You can handle different types of errors or just use the error message
    console.error("An error occurred while uploading images:", e);
    return { error: "Failed to upload images" };
  }
};
