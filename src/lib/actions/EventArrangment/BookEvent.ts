"use server";

import { SubmitFormType } from "@/@types/event-managment";
import { BOOK_EVENT } from "@/constants/ApiUrls";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface BookEventParams {
  formData: SubmitFormType; // Use the Zustand types
}

export const BookEvent = async ({ formData }: BookEventParams) => {
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });

  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }

  const jsonForm = JSON.stringify(formData);

  try {
    const response = await fetch(BOOK_EVENT, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: jsonForm,
    });

    const jsonResponse = await response.json();

    if (response.status === 202) {
      return { formId: jsonResponse.form_id };
    } else if (response.status === 401) {
      redirect("/sign-in");
    } else if (response.status === 406 || response.status === 400) {
      return { error: jsonResponse.detail };
    } else {
      return { error: "Network error, failed to submit form" };
    }
  } catch (e) {
    console.error("An error occurred while booking event:", e);
    return { error: "An error occurred while booking event." };
  }
};
