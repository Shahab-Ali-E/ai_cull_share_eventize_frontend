'use server'

import { CREATE_EVENT } from "@/constants/ApiUrls"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"


export const createEvent = async ({EventName}:{EventName:string}) =>{

    // getting jwt token from clerk so that we can access backend resorces
    const {getToken} = await auth();
    const token = await getToken({template:"AI_Cull_Share_Eventize"})
    if (!token) {
        console.error("Failed to fetch Clerk token");
        redirect("/sign-in");
    }
    
    const apiUrl = `${CREATE_EVENT}/${EventName}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`, // Passing the token here
                "Content-Type": "application/json",
            },
        })

        const jsonResponse = await response.json()

        if (response.status === 201) {
            return { success: "Event created successfully !" };
        }
        else if (response.status === 401) {
            redirect('/sign-in')
        } 
        else if(response.status === 406 || response.status === 400 ){
            return {
                error: jsonResponse.detail
            }
        }
        else if (!response.ok) {
            return {
                error: 'Network error, failed to create event',
            }
        }
    } catch (e) {
        console.error("An error occurred while creating the event:", e)
        return { error: "An error occurred while deleting the event." };
    }
}