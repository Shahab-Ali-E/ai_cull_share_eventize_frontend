"use server";

import { ASSOCIATE_USER_WITH_EVENT } from "@/constants/ApiUrls";
import { getClerkToken } from "../clerk-token";

// For updating an event in the backend
export const AssociateUserWithEvent = async ({
  eventId,
}: {
  eventId: string;
}): Promise<{ data?:unknown; error?: string }> => {
  // Get the JWT token from Clerk
  const token = await getClerkToken();

  try {
    const apiUrl = `${ASSOCIATE_USER_WITH_EVENT}/${eventId}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 302 || response.status === 200) {
      return {data:"success"}
    } else if (response.status === 400) {
      console.error(jsonResponse);
      return { error: "Event not found" };
    } else if (response.status === 500 || !response.ok) {
      console.error(jsonResponse);
      return { error: "Failed to find images" };
    }
  } catch (e) {
    console.error("An error occurred while updating the event:", e);
    return { error: "Failed to find images" };
  }

  // Ensure function always returns something
  return { data:"N/A" };
};
