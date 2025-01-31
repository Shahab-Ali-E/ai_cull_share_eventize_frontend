"use server";

import { UPDATE_EVENT } from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// For updating an event in the backend
export const UpdateEvent = async ({
  eventId,
  updateFields,
}: {
  eventId: string;
  updateFields: FormData;
}): Promise<{ data?: unknown; error?: string }> => {
  // Get the JWT token from Clerk
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });
  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

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
