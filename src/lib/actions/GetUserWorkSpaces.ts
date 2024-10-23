// libs/actions/getuserworkspaces.tsx:

"use server";

import { GET_ALL_CULLING_WORKSPACES, GET_CULLING_WORKSPACES_BY_ID } from "@/constants/ApiUrls";
import { cookies } from "next/headers"; // Import cookies from next/headers
import { redirect } from "next/navigation";

interface WorkspaceProps {
    id: number; 
    name: string;
    total_size: number;
    created_at: string;
}

// For fetching all workspaces from the backend
export const getAllWorkSpaces = async ({ search, sort_order, sort_by, page = 1, limit = 10 }: { search?: string; page?: number; sort_by?: string; limit?: number; sort_order?: string }): Promise<{ data?: WorkspaceProps[]; error?: string }> => {
    // await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        // Get the cookies from the incoming request
        const cookieHeader = cookies().toString(); // Converts cookies to string format

        // Construct query parameters using URLSearchParams
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (sort_order) params.set('sort_order', sort_order);
        if (sort_by) params.set('sort_by', sort_by);
        if (page) params.set('page', page.toString());
        if (limit) params.set('limit', limit.toString());

        console.log(params.toString())
        // Append the query string to the API URL
        const apiUrl = `${GET_ALL_CULLING_WORKSPACES}?${params.toString()}`;

        const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                // Forward the cookie to the backend
                Cookie: cookieHeader,
            },
        });

        const jsonResponse = await response.json();

        if (response.status === 401) {
            redirect("/login");
        } else if (response.status === 500 || !response.ok) {
            return {
                error: jsonResponse.detail,
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
export const getWorkSpaceById = async ({ folder_id }: { folder_id: number }): Promise<{ data?: WorkspaceProps; error?: string }> => {
    try {
        // Get the cookies from the incoming request
        const cookieHeader = cookies().toString();

        const apiUrl = `${GET_CULLING_WORKSPACES_BY_ID}/${folder_id}`;

        const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: cookieHeader,
            },
        });

        const jsonResponse = await response.json();
        
        if (response.status === 401) {
            redirect("/login");
        } else if (response.status === 500 || !response.ok) {
            return {
                error: jsonResponse.detail,
            };
        } else {
            return { data: jsonResponse };
        }
    } catch (e) {
        // You can handle different types of errors or just use the error message
        console.error("An error occurred while fetching the workspaces:", e);
        return { error: "Failed to fetch workspaces" };
    }
};
