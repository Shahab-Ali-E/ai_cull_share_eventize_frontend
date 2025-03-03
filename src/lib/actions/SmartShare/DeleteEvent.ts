'use server';

import { DELETE_EVENT } from '@/constants/ApiUrls';
import { redirect } from 'next/navigation';
import {revalidateTag} from 'next/cache'
import { getClerkToken } from '../clerk-token';


export const DeleteEvent = async ({ EventName}: {EventName:string}) => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
    const token = await getClerkToken();
    const apiUrl = `${DELETE_EVENT}/${EventName}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Passing the token here
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 401) {
      redirect("/sign-in");
    } else if (response.status === 500 || !response.ok) {
      return {
        error: jsonResponse.detail || 'Failed to delete event',
      };
    } else {
      revalidateTag('getSmartShareEventsTag');
      return { success: true };
    }
  } catch (e) {
    console.error("An error occurred while deleting the event:", e);
    return { error: "An error occurred while deleting the event." };
  }
};
