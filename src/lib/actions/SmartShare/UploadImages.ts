'use server';

import { UPLOAD_SMART_SHARE_IMAGES } from '@/constants/ApiUrls';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Interface for the upload
interface uploadSmartShareImagesProps {
  eventId: string;
  imagesData: FormData
}

export const uploadSmartShareImages = async ({ eventId,imagesData }: uploadSmartShareImagesProps) => {
    try {
        // getting jwt token from clerk so that we can access backend resorces
    const {getToken} = await auth();
    const token = await getToken({template:"AI_Cull_Share_Eventize"})
    if (!token) {
        console.error("Failed to fetch Clerk token");
        redirect("/sign-in");
    }

        const apiUrl = `${UPLOAD_SMART_SHARE_IMAGES}/${eventId}`;

        const response = await fetch(apiUrl, {
            cache:'no-cache',
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body:imagesData
        });

        const jsonResponse = await response.json();

        if(response.status === 415){
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
