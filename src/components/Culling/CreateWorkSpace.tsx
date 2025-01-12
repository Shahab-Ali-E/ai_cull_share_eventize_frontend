"use client"

//component
import CustomInputialog from "../custom-input-dialog"

// api and validaton
import { CreateWorkSpace } from "@/lib/actions/CreateWorkSpace"
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
        <GradientButton className="w-full h-11 xl:h-11 lg:h-12 md:h-12 text-xs md:text-xs xl:text-sm 2xl:text-base shadow-chart-2 sm:shadow-none">
          Create Workpsace
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
  
