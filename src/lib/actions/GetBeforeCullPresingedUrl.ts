'use server';

import { GET_BEFORE_CULL_PRESIGNED_URL } from '@/constants/ApiUrls';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Interface for the upload
interface GetBeforeCullPresignedUrlProps {
  workSpaceId: number;
}

export const GetBeforeCullPresignedUrl = async ({ workSpaceId }: GetBeforeCullPresignedUrlProps) => {
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 5000);
    // });
    try {
        // Get the cookies from the incoming request
        const cookieHeader = cookies().toString();
        const apiUrl = `${GET_BEFORE_CULL_PRESIGNED_URL}/${workSpaceId}`;
        console.log("before cull presigned apiUrl")
        console.log(apiUrl)
        const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: cookieHeader,
            },
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)

        if (response.status === 401) {
            redirect("/login");
        } else if (response.status === 500 || !response.ok) {
            return {
                error: jsonResponse.detail,
            };
        } else {
            return { urls: jsonResponse };
        }
    } catch (e) {
        // You can handle different types of errors or just use the error message
        console.error("An error occurred while fetching the workspaces:", e);
        return { error: "Failed to fetch Links" };
    }
};
