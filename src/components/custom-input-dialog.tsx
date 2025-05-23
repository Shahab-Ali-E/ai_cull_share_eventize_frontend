"use client";

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

// api and validation
import { validateWorkspaceName } from "@/utils/workSpaceValidation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface CustomInputialogProps {
  onCreate: (
    Name: string
  ) => Promise<{ error?: string; success?: string }>;
  dialogTitle: string;
  triggerButton: React.ReactNode; 
  usage?:"Workspace" | "Event"
}

export default function CustomInputialog({
  onCreate,
  dialogTitle,
  triggerButton,
  usage="Workspace"

}: CustomInputialogProps) {
  const [enteredName, setEnteredName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validateWorkspaceName(value);
    setEnteredName(value);
    setError(validationError);
  };

  // Create a new Date object
  const currentDate = new Date();

  // Format the date in the desired format
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(currentDate);

  const handleCreate = async () => {
    const validationError = validateWorkspaceName(enteredName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const res = await onCreate(enteredName);

      if (res.error) {
        console.log(`error${usage}`);
        console.log(res.error);
        toast.error("Server Error",{
          description: res.error
        });
      } else {
       //close the dialog box
        setOpen(false);

        // show toast when event or workspace created
        toast.success(res.success,{
          description: `${formattedDate}`
        });

        // clear name
        setEnteredName("");
      }
    } catch (error: unknown) {
      // show toast when event or workspace created
      toast.error("Server Error",{
        description: String(error)
      });
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={`bg-primary-foreground max-w-[400px] sm:w-full rounded-md ${isLoading||"text-primary"}`}>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full p-14">
            <Spinner size="medium">
              <span className="text-primary">creating...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary text-lg">
                {dialogTitle}
              </DialogTitle>
              <DialogDescription>
                Enter a unique {usage} name that hasn’t been used before.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4">
              <Label htmlFor={`${usage}Name`} className="text-primary">
                Name
              </Label>
              <div className="flex flex-col w-full">
                <Input
                  id={`${usage}Name`}
                  value={enteredName}
                  className={`w-full text-primary ${
                    error ? "border-red-500" : "border-primary"
                  }`}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
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
              <Button
                type="submit"
                className="w-full xl:w-24"
                onClick={handleCreate}
              >
                Create
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
