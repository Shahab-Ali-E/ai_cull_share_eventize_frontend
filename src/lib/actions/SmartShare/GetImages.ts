'use server';

import { GET_IMAGES_BY_FACE } from '@/constants/ApiUrls';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Interface for the upload
interface GetImagesByFaceRecognitionProps {
  eventId: string;
  faceImage: FormData
}

export const GetImagesByFaceRecognition = async ({ eventId, faceImage }: GetImagesByFaceRecognitionProps) => {
    try {
        // getting jwt token from clerk so that we can access backend resorces
    const {getToken} = await auth();
    const token = await getToken({template:"AI_Cull_Share_Eventize"})
    if (!token) {
        console.error("Failed to fetch Clerk token");
        redirect("/sign-in");
    }

        const apiUrl = `${GET_IMAGES_BY_FACE}/${eventId}`;

        const response = await fetch(apiUrl, {
            cache:'no-cache',
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            body:faceImage
        });

        const jsonResponse = await response.json();

        console.log("response from backend of get-images", jsonResponse)
    } catch (e) {
        // You can handle different types of errors or just use the error message
        console.error("Error occurred while fetching the images:", e);
        return { error: "Failed to fetch images" };
    }
};
