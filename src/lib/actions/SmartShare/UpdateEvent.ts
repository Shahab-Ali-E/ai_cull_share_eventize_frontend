"use server";

import { UPDATE_EVENT } from "@/constants/ApiUrls";
import { getClerkToken } from "../clerk-token";

// For updating an event in the backend
export const UpdateEvent = async ({
  eventId,
  updateFields,
}: {
  eventId: string;
  updateFields: FormData;
}): Promise<{ data?: unknown; error?: string }> => {
  // getting jwt token from clerk so that we can access backend resorces
  const token = await getClerkToken();

  try {
    console.log("update fields", updateFields);
    const apiUrl = `${UPDATE_EVENT}/${eventId}`;

    const response = await fetch(apiUrl, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updateFields,
    });

    const jsonResponse = await response.json();
    if (!response.ok) {
      return { error: jsonResponse.detail || "Failed to update event data" };
    } else {
      return { data: jsonResponse.update_event_data };
    }
  } catch (e) {
    console.error("An error occurred while updating the event:", e);
    return { error: "Failed to update event data" };
  }
};
