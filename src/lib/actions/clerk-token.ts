// lib/actions/clerk-token.ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getClerkToken() {
  const { getToken } = await auth();
  const token = await getToken({ template: "AI_Cull_Share_Eventize" });
  if (!token) {
    console.error("Failed to fetch Clerk token");
    redirect("/sign-in");
  }
  return token;
}
