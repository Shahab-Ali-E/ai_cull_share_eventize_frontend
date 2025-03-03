'use server'

import { CREATE_CULLING_WORKSPACE } from "@/constants/ApiUrls"
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation"
import { getClerkToken } from "../clerk-token";


export const CreateWorkSpace = async ({workSpaceName}:{workSpaceName:string}) =>{

    // getting jwt token from clerk so that we can access backend resorces
    const token = await getClerkToken();
    
    const apiUrl = `${CREATE_CULLING_WORKSPACE}/${workSpaceName}`;

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
            revalidateTag('getAllCullingWorkspaces');
            return { success: "Workspace created successfully !" };
        }
        else if (response.status === 401) {
            redirect('/sign-in')
        } 
        else if(response.status === 406 || response.status === 400 ){
            return {
                error: jsonResponse
            }
        }
        else if (!response.ok) {
            return {
                error: 'Network error, failed to create workspace',
            }
        }
    } catch (e) {
        console.error("An error occurred while creating the workspace:", e)
        return { error: "An error occurred while creating the workspace." };
    }
}