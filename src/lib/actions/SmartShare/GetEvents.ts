// libs/actions/getuserworkspaces.tsx:

"use server";

import { SmartShareEventDataByIdInterface, SmartShareEventsDataInterface } from "@/@types/smart-share";
import {
  GET_SMART_SHARE_EVENT_BY_ID,
  GET_ALL_SMART_SHARE_EVENTS
} from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// For fetching all events from the backend
export const getAllEvents = async ({
  search,
  sort_order,
  sort_by,
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  sort_by?: string;
  limit?: number;
  sort_order?: string;
}): Promise<{ data?: SmartShareEventsDataInterface[]; totalCount?:number; error?: string }> => {
  // getting jwt token from clerk so that we can access backend resorces
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });
  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

  try {
    // Construct query parameters using URLSearchParams
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (sort_order) params.set("sort_order", sort_order);
    if (sort_by) params.set("sort_by", sort_by);
    if (page) params.set("page", page.toString());
    if (limit) params.set("limit", limit.toString());

    // Append the query string to the API URL
    const apiUrl = `${GET_ALL_SMART_SHARE_EVENTS}?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    console.log("get all events", jsonResponse);

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (!response.ok) {
      return {
        error: "Internal Server Error",
      };
    } else {
      // Return the fetched data
      return {
        data: jsonResponse.events,
        totalCount: jsonResponse.total_count,
      };
    }
  } catch (e) {
    console.error("An error occurred while fetching the events:", e);
    return { error: "Failed to fetch events" };
  }
};

//For fetching workspace by id from backend
export const GetEventById = async ({
  eventId,
}: {
  eventId: string;
}): Promise<{ data?: SmartShareEventDataByIdInterface; error?: string }> => {
  // getting jwt token from clerk so that we can access backend resorces
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });
  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

  try {
    const apiUrl = `${GET_SMART_SHARE_EVENT_BY_ID}/${eventId}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Passing the token here
        "Content-Type": "application/json",
      },
    });
    
    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (!response.ok) {
      return { error: jsonResponse.detail || "Failed to fetch event data" };
    } else {
      return { data: jsonResponse };
    }
  } catch (e) {
    console.error("An error occurred while fetching the event:", e);
    return { error: "Failed to fetch event data" };
  }
};
