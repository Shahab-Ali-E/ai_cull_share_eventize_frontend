"use client"

//component
import CustomInputialog from "../custom-input-dialog"

// api and validaton
import { CreateWorkSpace } from "@/lib/actions/Culling/CreateWorkSpace"
import GradientButton from "../ui/gradient-button";


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
    const triggerButton = (
        <GradientButton className="w-3/4 sm:w-full h-10 xl:h-10 lg:h-10 md:h-10 text-sm rounded-sm">
          Create Workspace
        </GradientButton>
      );
    return (
        <CustomInputialog 
            usage="Workspace"
            dialogTitle="create workspace"
            onCreate={createWorkSpaceBackend}
            triggerButton={triggerButton}
        />
    )
}
  
