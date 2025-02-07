"use server";

import { ImagesMetadataResponse } from "@/@types/smart-culling";
import { GET_CULLED_IMAGES } from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export const GetCulledImagesMetadata = async ({
  workSpaceId,
  detection_status,
}: {
  workSpaceId: string;
  detection_status?: string;
}): Promise<{
  data: ImagesMetadataResponse[] | [];
  error: string | null;
}> => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const { getToken } = await auth();
    const token = await getToken({ template: "AI_Cull_Share_Eventize" });
    if (!token) {
      console.error("Failed to fetch Clerk token");
      redirect("/sign-in");
    }
    const api_url = `${GET_CULLED_IMAGES}/${workSpaceId}/${detection_status}`;

    const response = await fetch(api_url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Passing the token here
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (response.status === 500 || !response.ok) {
      return {
        data: [],
        error:
          jsonResponse.detail ||
          "An error occurred while fetching culled images metadata.",
      };
    } else {
      return { data: jsonResponse, error: null };
    }
  } catch (e) {
    console.error("An error occurred while fetching the workspaces:", e);
    return { data: [], error: "Failed to fetch culled images metadata" };
  }
};
