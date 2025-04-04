// libs/actions/getuserworkspaces.tsx:

"use server";

import {
  GET_ALL_EVENTS,
  GET_EVENT_BY_ID
} from "@/constants/ApiUrls";
import { EventDetails } from "@/@types/event-managment";
import { redirect } from "next/navigation";
import { getClerkToken } from "../clerk-token";

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
}): Promise<{ events?: EventDetails[]; totalCount?:number; error?: string }> => {
  // getting jwt token from clerk so that we can access backend resorces
  const token = await getClerkToken();

  try {
    // Construct query parameters using URLSearchParams
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (sort_order) params.set("sort_order", sort_order);
    if (sort_by) params.set("sort_by", sort_by);
    if (page) params.set("page", page.toString());
    if (limit) params.set("limit", limit.toString());

    // Append the query string to the API URL
    const apiUrl = `${GET_ALL_EVENTS}?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (!response.ok) {
      return {
        error: "Internal Server Error",
      };
    } else {

      // Return the fetched events
      return {
        events: jsonResponse.events,
        totalCount:jsonResponse.total_count,
      };
    }
  } catch (e) {
    console.error("An error occurred while fetching the events:", e);
    return { error: "Failed to fetch events" };
  }
};

//For fetching workspace by id from backend
export const getEventById = async ({
  eventId,
}: {
  eventId: string;
}): Promise<{ data?: EventDetails; error?: string }> => {
  // getting clerk token
  const token = await getClerkToken();

  try {
    const apiUrl = `${GET_EVENT_BY_ID}/${eventId}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (!response.ok) {
      return { error: jsonResponse || "Failed to fetch events" };
    } else {
      return { data: jsonResponse };
    }
  } catch (e) {
    console.error("An error occurred while fetching the events:", e);
    return { error: "Failed to fetch events" };
  }
};
