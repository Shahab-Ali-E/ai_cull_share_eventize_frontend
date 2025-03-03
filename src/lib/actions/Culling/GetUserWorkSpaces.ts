// libs/actions/getuserworkspaces.tsx:

"use server";

import {
  GET_ALL_CULLING_WORKSPACES,
  GET_CULLING_WORKSPACES_BY_ID,
} from "@/constants/ApiUrls";
import { SingleWorkspaceDataInterface, MultipleWorkspaceDataInterface } from "@/@types/smart-culling";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

// For fetching all workspaces from the backend
export const getAllWorkSpaces = unstable_cache(
  async ({
    search,
    sort_order,
    sort_by,
    page = 1,
    limit = 10,
    token
  }: {
    search?: string;
    page?: number;
    sort_by?: string;
    limit?: number;
    sort_order?: string;
    token:string
  }): Promise<{ data?: MultipleWorkspaceDataInterface[]; totalCount?:number; error?: string }> => {  
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
        return {
          data: jsonResponse.folders,
          totalCount: jsonResponse.total_count,
        };
      }
    } catch (e) {
      console.error("An error occurred while fetching the workspaces:", e);
      return { error: "Failed to fetch workspaces" };
    }
  },
  ['getAllCullingWorkspaces'],
  {tags:['getAllCullingWorkspaces']}
) 
  
  

//For fetching workspace by id from backend
export const GetWorkSpaceById = unstable_cache(
  async ({
    workSpaceId,
    token
  }: {
    workSpaceId: string;
    token:string;
  }): Promise<{ data?: SingleWorkspaceDataInterface; error?: string }> => {
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
        return { error: jsonResponse || "Failed to fetch workspace data" };
      } else {
        return { data: jsonResponse };
      }
    } catch (e) {
      console.error("An error occurred while fetching the workspace:", e);
      return { error: "Failed to fetch workspace data" };
    }
  },
  ['getCullingWorkspaceById'],
  {tags:['getCullingWorkspaceById']}
) 
