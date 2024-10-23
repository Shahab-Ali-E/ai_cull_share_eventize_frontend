"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// api and validation
import { validateWorkspaceName } from "@/utils/workSpaceValidation";
import GradientButton from "./ui/gradient-button";
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component

interface CustomDialogBoxProps {
  onCreate: (workspaceName: string) => Promise<{ error?: string; success?: string }>;
  dialogTitle: string;
  buttonTitle: string;
}

export default function CustomDialogBox({ onCreate, dialogTitle, buttonTitle }: CustomDialogBoxProps) {
  const [workSpaceName, setWorkSpaceName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {toast} = useToast()

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validateWorkspaceName(value);
    setWorkSpaceName(value);
    setError(validationError);
  };

  const handleCreate = async () => {
    const validationError = validateWorkspaceName(workSpaceName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const res = await onCreate(workSpaceName);

    if (res.error) {
      console.log("error workspace");
      console.log(res.error);
      setIsLoading(false);
      setError(res.error.split(':')[2]);
    } else {
      setError("");
      setSuccessMessage(res.success);
      console.log("success workspace");
      console.log(res.success);

      // Delay closing the dialog to show the spinner before hiding it
      router.refresh(); 
      setOpen(false);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      // Create a new Date object
      const currentDate = new Date();

      // Format the date in the desired format
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(currentDate);

      // show toast when workspace created
      toast({
        title: successMessage,
        description: `${formattedDate}`
      });
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <GradientButton className="w-48 h-11 xl:w-48 xl:h-11 lg:w-48 lg:h-12 md:w-44 md:h-12">
          {buttonTitle}
        </GradientButton>
      </DialogTrigger>
      <DialogContent className="bg-primary-foreground sm:max-w-[400px]">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full p-14">
            <Spinner size="medium">
                <span className="text-primary">creating...</span>
            </Spinner> 
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary">{dialogTitle}</DialogTitle>
              <DialogDescription>
                Enter a unique workspace name that hasn’t been used before.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4">
              <Label htmlFor="workSpaceName" className="text-primary">
                Name
              </Label>
              <div className="flex flex-col w-full">
                <Input
                  id="workSpaceName"
                  value={workSpaceName}
                  className={`w-full text-primary ${error ? "border-red-500" : "border-primary"}`}
                  onChange={handleInputChange}
                />
                {error && (
                  <div className="flex items-center mt-1 text-red-500 space-x-2">
                    <IoAlertCircleSharp className="h-5 w-5" />
                    <Label className="text-sm">{error}</Label>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full xl:w-28" onClick={handleCreate}>
                Create
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
