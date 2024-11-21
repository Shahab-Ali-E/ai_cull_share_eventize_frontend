"use client"

//component
import CustomInputialog from "../custom-input-dialog"

// api and validaton
import { CreateWorkSpace } from "@/lib/actions/CreateWorkSpace"


export default function CreateCullingWorkSpace() {
  
    const createWorkSpaceBackend = async (workSpaceName: string) => {
        try {
            const response = await CreateWorkSpace({ workSpaceName });
            if (response?.error) {
                return { error: response.error };
            } else {
                
                return { success: response?.success };
            }
        } catch (e) {
            console.error("An error occurred while creating the workspace:", e);
            return { error: "An unexpected error occurred."};
        }
    };
  
    return (
        <CustomInputialog 
            buttonTitle="Create WorkSpace"
            dialogTitle="create workspace"
            onCreate={createWorkSpaceBackend}
        />
    )
}
  
