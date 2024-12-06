// libs/actions/getuserworkspaces.tsx:

"use server";

import {
  GET_ALL_CULLING_WORKSPACES,
  GET_CULLING_WORKSPACES_BY_ID,
} from "@/constants/ApiUrls";
import { WorkspaceDataInterface } from "@/zustand/CullingStore";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// For fetching all workspaces from the backend
export const getAllWorkSpaces = async ({
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
}): Promise<{ data?: WorkspaceDataInterface[]; error?: string }> => {
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

    console.log(params.toString());
    // Append the query string to the API URL
    const apiUrl = `${GET_ALL_CULLING_WORKSPACES}?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
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
      // Return the fetched data
      return { data: jsonResponse };
    }
  } catch (e) {
    console.error("An error occurred while fetching the workspaces:", e);
    return { error: "Failed to fetch workspaces" };
  }
};

//For fetching workspace by id from backend
export const GetWorkSpaceById = async ({
  workSpaceId,
}: {
  workSpaceId: string;
}): Promise<{ data?: WorkspaceDataInterface; error?: string }> => {
  // getting jwt token from clerk so that we can access backend resorces
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });
  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

  try {
    const apiUrl = `${GET_CULLING_WORKSPACES_BY_ID}/${workSpaceId}`;

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
      return { error: jsonResponse.detail || "Failed to fetch workspace data" };
    } else {
      return { data: jsonResponse };
    }
  } catch (e) {
    console.error("An error occurred while fetching the workspace:", e);
    return { error: "Failed to fetch workspace data" };
  }
};
