'use server';

import { DELETE_CULLING_WORKSPACE } from '@/constants/ApiUrls';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface DeleteWorkSpaceProps {
  workSpaceName: string;  // Change the name to workSpaceId (not workSpaceName)
}

export const DeleteWorkSpace = async ({ workSpaceName }: DeleteWorkSpaceProps) => {
  try {
    const cookieHeader = cookies().toString();
    const apiUrl = `${DELETE_CULLING_WORKSPACE}/${workSpaceName}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/login");
    } else if (response.status === 500 || !response.ok) {
      return {
        error: jsonResponse.detail || 'Failed to delete workspace',
      };
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error("An error occurred while deleting the workspace:", e);
    return { error: "An error occurred while deleting the workspace." };
  }
};
