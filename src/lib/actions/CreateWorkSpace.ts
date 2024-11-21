'use server'

import { CREATE_CULLING_WORKSPACE } from "@/constants/ApiUrls"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


export const CreateWorkSpace = async ({workSpaceName}:{workSpaceName:string}) =>{

    const cookieHeader = cookies().toString();
    const apiUrl = `${CREATE_CULLING_WORKSPACE}/${workSpaceName}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers:{
                Cookie: cookieHeader,
            }
        })

        const jsonResponse = await response.json()

        if (response.status === 201) {
            return { success: "Workspace created successfully !" };
        }
        else if (response.status === 401) {
            redirect('/login')
        } 
        else if(response.status === 406 || response.status === 400 ){
            return {
                error: jsonResponse.detail
            }
        }
        else if (!response.ok) {
            return {
                error: 'Network error, failed to create workspace',
            }
        }
    } catch (e) {
        console.error("An error occurred while creating the workspace:", e)
        return { error: "An error occurred while deleting the workspace." };
    }
}