"use server";

import { PUBLISH_EVENT } from "@/constants/ApiUrls";
import { revalidateTag } from "next/cache";
import { getClerkToken } from "../clerk-token";

// Interface for the upload
interface uploadSmartShareImagesProps {
  eventId: string;
  imagesData: string[];
}

export const publicEvent = async ({
  eventId,
  imagesData,
}: uploadSmartShareImagesProps) => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const token = await getClerkToken();

    // prepare request body
    const requestBody = JSON.stringify({
      folder_id: eventId,
      images_url: imagesData,
    });

    console.log("request body", requestBody);

    const response = await fetch(PUBLISH_EVENT, {
      cache: "no-cache",
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const jsonResponse = await response.json();

    if (response.status === 500 || !response.ok) {
      return {
        error: jsonResponse.detail,
      };
    } else {
      revalidateTag("getSmartShareEventByIdTag");
      return { data: jsonResponse };
    }
  } catch (e) {
    // You can handle different types of errors or just use the error message
    console.error("An error occurred while publishing event:", e);
    return { error: "Failed to publish event" };
  }
};
