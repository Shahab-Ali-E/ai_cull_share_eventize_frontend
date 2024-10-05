"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GradientButton from "@/components/ui/gradient-button"
import { useState } from "react"
import { CREATE_CULLING_WORKSPACE } from "@/constants/ApiUrls"
import { useRouter } from 'next/navigation'
import { IoAlertCircleSharp } from "react-icons/io5";

interface CreateCullingWorkSpaceProps {
  setLoadingSpinner: (value: boolean) => void
}

export default function CreateCullingWorkSpace() {
    const [workSpaceName, setWorkSpaceName] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loadingSpinner,setLoadingSpinner] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
  
    const router = useRouter()
  
    const validateWorkspaceName = (name: string) => {
      if (!name.trim()) {
        return "Workspace name cannot be empty"
      }
      if (name.trim().length < 4) {
        return "At least 4 characters required"
      }
      return ""
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const validationError = validateWorkspaceName(value)
      setWorkSpaceName(value)
      setError(validationError)
    }
  
    const createWorkSpaceBackend = async () => {
        const validationError = validateWorkspaceName(workSpaceName)
    
        if (validationError) {
            setError(validationError)
            return
        }
        setLoadingSpinner(true)

        try {
            const response = await fetch(`${CREATE_CULLING_WORKSPACE}/${workSpaceName}`, {
                method: 'POST',
                credentials: 'include'
            })

            const jsonResponse = await response.json()
            if (response.status === 201) {
                setSuccessMessage("Workspace successfully created")
                setLoadingSpinner(false)
                setOpen(false)
                setWorkSpaceName("")
            }
            else if (response.status === 401) {
                router.push('/login')
            } 
            else if (response.status === 406 || response.status === 400) {
                setError(jsonResponse.detail)
            }

        } catch (e) {
            console.error("An error occurred while creating the workspace:", e)
            setError("Something went wrong, please try again.")
        } finally {
            setLoadingSpinner(false)
        }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <GradientButton className='w-48 h-11 xl:w-52 xl:h-14 lg:w-48 lg:h-12 md:w-44 md:h-12'>
            Create Event
          </GradientButton>
        </DialogTrigger>
        {loadingSpinner? 
        (
            <Label>loading...</Label>
        ):
        (
            <DialogContent className="bg-primary-foreground sm:max-w-[400px]">
                <DialogHeader>
                <DialogTitle className="text-primary">Create Workspace</DialogTitle>
                <DialogDescription>
                    Enter a unique workspace name that hasn’t been used before.
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-4">
                <Label htmlFor="workSpaceName" className="text-primary">Name</Label>
                <div className="flex flex-col w-full">
                    <Input
                    id="workSpaceName"
                    value={workSpaceName}
                    className={`w-full text-primary ${error ? "border-red-500" : "border-primary"}`}
                    onChange={handleInputChange}
                    />
                    {error && (
                    <div className="flex items-center mt-1 text-red-500 space-x-2">
                        <IoAlertCircleSharp  className="h-5 w-5" />
                        <Label className="text-sm">{error}</Label>
                    </div>
                    )}
                </div>
                </div>
                <DialogFooter>
                <Button
                    type="submit"
                    className="w-full xl:w-28 lg:xl:w-28 md:xl:w-28"
                    onClick={createWorkSpaceBackend}
                >
                    Create
                </Button>
                </DialogFooter>
            </DialogContent>
        )    
        }
      </Dialog>
    )
}
  
