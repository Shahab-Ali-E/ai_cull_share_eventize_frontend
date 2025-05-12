"use server";

import { SmartShareEventDataByIdInterface, SmartShareEventsDataInterface } from "@/@types/smart-share";
import { GET_SMART_SHARE_EVENT_BY_ID, GET_ALL_SMART_SHARE_EVENTS, GET_SMART_SHARE_PUBLISHED_EVENT } from "@/constants/ApiUrls";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { getClerkToken } from "../clerk-token"; 

// For fetching all events from the backend
export const getAllEvents = unstable_cache(
  async (
    { search, sort_order, sort_by, page = 1, limit = 10 }: {
      search?: string;
      page?: number;
      sort_by?: string;
      limit?: number;
      sort_order?: string;
    },
    token: string
  ): Promise<{ data?: SmartShareEventsDataInterface[]; totalCount?: number; error?: string }> => {
    try {
      // Construct query parameters using URLSearchParams
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (sort_order) params.set("sort_order", sort_order);
      if (sort_by) params.set("sort_by", sort_by);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const apiUrl = `${GET_ALL_SMART_SHARE_EVENTS}?${params.toString()}`;
      console.log("apiurl", apiUrl)

      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("response",response)

      const jsonResponse = await response.json();
      console.log("get all events", jsonResponse);

      if (response.status === 401) {
        redirect("/sign-in");
      } else if (!response.ok) {
        return { error: "Internal Server Error" };
      }
      return { data: jsonResponse.events, totalCount: jsonResponse.total_count };
    } catch (e) {
      console.error("An error occurred while fetching the events:", e);
      return { error: "Failed to fetch events" };
    }
  },
  ["getSmartShareEventsTag"],
  { tags: ["getSmartShareEventsTag"] }
);

// For fetching a workspace by id from backend
export const GetEventById = unstable_cache(
  async (
    { eventId }: { eventId: string },
    token: string
  ): Promise<{ data?: SmartShareEventDataByIdInterface; error?: string }> => {
    try {
      const apiUrl = `${GET_SMART_SHARE_EVENT_BY_ID}/${eventId}`;

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
        return { error: jsonResponse.detail || "Failed to fetch event data" };
      }
      return { data: jsonResponse };
    } catch (e) {
      console.error("An error occurred while fetching the event:", e);
      return { error: "Failed to fetch event data" };
    }
  },
  ["getSmartShareEventByIdTag"],
  { tags: ["getSmartShareEventByIdTag"] }
);

// For fetching event for secondary user who will access once it's published
export const getPublishedEvent = async (
    { eventId }: { eventId: string },
  ): Promise<{ data?: Omit<SmartShareEventsDataInterface, "description"| "total_size"|"created_at">; error?: string }> => {
    try {
      const apiUrl = `${GET_SMART_SHARE_PUBLISHED_EVENT}/${eventId}`;
      // getting clerk token
      const token = await getClerkToken();
      
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
      } else if (response.status === 404) {
        console.log("event not found", jsonResponse);
        return { error: "Event not found" };
      } else if (!response.ok) {
        return { error: jsonResponse.detail || "Failed to fetch event data" };
      }
      return { data: jsonResponse };
    } catch (e) {
      console.error("An error occurred while fetching the event:", e);
      return { error: "Failed to fetch event data" };
    }
  }