'use server';

import { DELETE_CULLING_WORKSPACE } from '@/constants/ApiUrls';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const DeleteWorkSpace = async ({ workSpaceName }: {workSpaceName:string}) => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const {getToken} = await auth();
    const token = await getToken({template:"AI_Cull_Share_Eventize"})
    if (!token) {
        console.error("Failed to fetch Clerk token");
        redirect("/sign-in");
    }
    const apiUrl = `${DELETE_CULLING_WORKSPACE}/${workSpaceName}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (response.status === 500 || !response.ok) {
      return {
        error: jsonResponse || 'Failed to delete workspace',
      };
    } else {
      return { success: true };
    }
  } catch (e) {
    console.error("An error occurred while deleting the workspace:", e);
    return { error: "An error occurred while deleting the workspace." };
  }
};
