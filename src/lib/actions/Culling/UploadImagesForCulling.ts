'use server';

import { UPLOAD_CULLING_IMAGES } from '@/constants/ApiUrls';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getClerkToken } from '../clerk-token';
import { ImagesMetadataResponse } from '@/@types/smart-culling';

// Interface for the upload
interface uploadCullingImages {
  workSpaceId: string;
  imagesData: FormData
}

export const uploadCullingImagesToServer = async ({ workSpaceId,imagesData }: uploadCullingImages):Promise<{data?:{message:string; data:ImagesMetadataResponse[]}; error?:string}> => {
    try {
        // getting jwt token from clerk so that we can access backend resorces
        const token = await getClerkToken();

        const apiUrl = `${UPLOAD_CULLING_IMAGES}/${workSpaceId}`;

        const response = await fetch(apiUrl, {
            cache:'no-cache',
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`, // Passing the token here
            },
            body:imagesData
        });

        const jsonResponse = await response.json();

        if (response.status === 401) {
            redirect("/login");
        }
        else if(response.status === 415){
            return { error: jsonResponse.detail }; 
        } 
        else if (response.status === 500 || !response.ok) {
            return {
                error: jsonResponse.detail,
            };
        } else {
            revalidateTag('getCullingWorkspaceById');
            return { data: jsonResponse };
        }
    } catch (e) {
        // You can handle different types of errors or just use the error message
        console.error("An error occurred while fetching the workspaces:", e);
        return { error: "Failed to fetch workspaces" };
    }
};
