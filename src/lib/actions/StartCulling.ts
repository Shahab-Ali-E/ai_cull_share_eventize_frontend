'use server';

import { START_CULLING } from '@/constants/ApiUrls';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Interface for the upload
interface uploadCullingImages {
    workSpaceId: string;
    imagesUrl: string[]
}

export const StartCulling = async ({ workSpaceId,imagesUrl }: uploadCullingImages) => {
    try {
        // Get the cookies from the incoming request
        const cookieHeader = cookies().toString();

        // Prepare the request body to match the backend schema
        const requestBody = JSON.stringify({
            folder_id: workSpaceId,
            images_url: imagesUrl
        });

        const response = await fetch(START_CULLING, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieHeader,
            },
            body: requestBody
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
        console.error("An error occurred while fetching the workspaces:", e);
        return { error: "Failed to fetch workspaces" };
    }
};
