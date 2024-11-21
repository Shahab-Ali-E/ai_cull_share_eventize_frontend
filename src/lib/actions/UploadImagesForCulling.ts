'use server';

import { UPLOAD_CULLING_IMAGES } from '@/constants/ApiUrls';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Interface for the upload
interface uploadCullingImages {
  workSpaceId: string;
  imagesData: FormData
}

export const uploadCullingImagesToServer = async ({ workSpaceId,imagesData }: uploadCullingImages) => {
    try {
        // Get the cookies from the incoming request
        const cookieHeader = cookies().toString();

        const apiUrl = `${UPLOAD_CULLING_IMAGES}/${workSpaceId}`;

        const response = await fetch(apiUrl, {
            cache:'no-cache',
            method: "POST",
            credentials: "include",
            headers: {
                Cookie: cookieHeader,
            },
            body:imagesData
        });

        const jsonResponse = await response.json();
        console.log("upload images for culling jsonResponse")
        console.log(jsonResponse)

        if (response.status === 401) {
            redirect("/login");
        }
        else if(response.status === 415){
            return { error: "Max storage reached !" }; 
        } 
        else if (response.status === 500 || !response.ok) {
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
