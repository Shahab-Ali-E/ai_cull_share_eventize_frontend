"use server";

import { START_CULLING } from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Interface for the upload
interface uploadCullingImages {
  workSpaceId: string;
  imagesUrl: string[];
}

export const StartCulling = async ({
  workSpaceId,
  imagesUrl,
}: uploadCullingImages):Promise<{data?:{task_id:string}; error?:string}> => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const { getToken } = await auth();
    const token = await getToken({ template: "AI_Cull_Share_Eventize" });
    if (!token) {
      console.error("Failed to fetch Clerk token");
      redirect("/sign-in");
    }

    // Prepare the request body to match the backend schema
    const requestBody = JSON.stringify({
      folder_id: workSpaceId,
      images_url: imagesUrl,
    });

    const response = await fetch(START_CULLING, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Passing the token here
        "Content-Type": "application/json",
      },
      body: requestBody,
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
