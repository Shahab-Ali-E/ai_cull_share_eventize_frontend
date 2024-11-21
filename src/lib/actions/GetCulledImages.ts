'use server';

import { GET_CULLED_IMAGES } from '@/constants/ApiUrls';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface CulledImagesMetadataResponse {
    id: string; // UUID as string in the frontend
    name: string;
    file_type: string;
    download_path: string;
    link_validity: string; // ISO 8601 date string
}


export const GetCulledImagesMetadata = async ({ workSpaceId, detection_status }: { workSpaceId: string, detection_status?: string }): Promise<{ data: CulledImagesMetadataResponse[] | []; error: string | null }> => {
    try {
        const cookieHeader = cookies().toString();
        const api_url = `${GET_CULLED_IMAGES}/${workSpaceId}/${detection_status}`;
        
        const response = await fetch(api_url, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: cookieHeader,
            },
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);

        if (response.status === 401) {
            redirect("/login");
        } else if (response.status === 500 || !response.ok) {
            return {
                data:[],
                error: jsonResponse.detail || "An error occurred while fetching culled images metadata.",
            };
        } else {
            return { data: jsonResponse, error: null };
        }
    } catch (e) {
        console.error("An error occurred while fetching the workspaces:", e);
        return {data:[], error: "Failed to fetch culled images metadata" };
    }
};
