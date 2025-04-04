"use server";

import { UPLOAD_CULLING_IMAGES } from "@/constants/ApiUrls";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getClerkToken } from "../clerk-token";
import fs from "fs/promises";
import path from "path";

// Interface for the upload
interface uploadCullingImages {
  workSpaceId: string;
  imagesData: FormData;
}

// Helper function to write error to file
async function writeErrorToFile(errorData: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const errorFileName = `error-response-${timestamp}.html`;
  const errorDir = path.join(process.cwd(), "error_logs");

  try {
    await fs.mkdir(errorDir, { recursive: true });
    await fs.writeFile(path.join(errorDir, errorFileName), errorData);
    console.error(
      `Full error response saved to: ${path.join(errorDir, errorFileName)}`
    );
  } catch (fileError) {
    console.error("Failed to save error file:", fileError);
  }
}

export const uploadCullingImagesToServer = async ({
  workSpaceId,
  imagesData,
}: uploadCullingImages): Promise<{
  data?: { task_id: string };
  error?: string;
}> => {
  let response;
  let responseText = "";

  try {
    // getting jwt token from clerk so that we can access backend resources
    const token = await getClerkToken();
    const apiUrl = `${UPLOAD_CULLING_IMAGES}/${workSpaceId}`;

    // Make the request
    response = await fetch(apiUrl, {
      cache: "no-cache",
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imagesData,
    });

    // Get raw response text first
    responseText = await response.text();

    // Try to parse as JSON
    try {
      const jsonResponse = JSON.parse(responseText);

      if (!response.ok) {
        console.error("Error Response:", responseText);
        return { error: jsonResponse.detail || responseText };
      }

      if (response.status === 401) {
        redirect("/login");
      } else if (response.status === 415) {
        return { error: jsonResponse.detail };
      } else if (response.status === 500 || !response.ok) {
        return { error: jsonResponse.detail };
      } else {
        revalidateTag("getCullingWorkspaceById");
        return { data: jsonResponse };
      }
    } catch {
      // If JSON parsing fails, save the full response to file
      const errorData = [
        `URL: ${apiUrl}`,
        `Status: ${response.status}`,
        `Headers: ${JSON.stringify(
          Object.fromEntries(response.headers.entries()),
          null,
          2
        )}`,
        `Body:\n${responseText}`,
      ].join("\n\n");

      await writeErrorToFile(errorData);

      return {
        error: `Server returned non-JSON response. Status: ${response.status}. Check error log file for details.`,
      };
    }
  } catch (e) {
    // For network errors or other exceptions
    let errorMessage = "Unknown error occurred";
    let stackTrace = "No stack trace available";

    if (e instanceof Error) {
      errorMessage = e.message;
      stackTrace = e.stack || stackTrace;
    }

    // Save the error details to file
    const errorData = [
      `Error: ${errorMessage}`,
      `Stack Trace:\n${stackTrace}`,
      `API URL: ${UPLOAD_CULLING_IMAGES}/${workSpaceId}`,
      `Response Text (if any):\n${responseText}`,
      `Response Status (if any): ${response?.status || "No response"}`,
    ].join("\n\n");

    await writeErrorToFile(errorData);

    console.error("An error occurred while uploading images:", e);
    return {
      error: "Failed to upload images. Check error log file for details.",
    };
  }
};
