"use server";

import { AnalyticsResponse } from "@/@types/dashboard";
import { ANALYTICS } from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getAnalytics = async (): Promise<{
  data?: AnalyticsResponse;
  error?: string;
}> => {
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });

  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

  try {
    const response = await fetch(ANALYTICS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();

    if (response.ok) {
        console.log("data", jsonResponse)
      return { data: jsonResponse }; // Return success response
    } else {
      // Handle server-side errors
      return {
        error: jsonResponse.message || "Failed to get analytics",
      };
    }
  } catch (e) {
    console.error("Network error please try again later", e);
    return { error: "Network error please try again later" };
  }
};
