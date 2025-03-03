"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomPopupDialogProps {
  triggerButton: React.ReactNode;
  message: string;
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  successMessage?:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: () => Promise<
    { error: unknown; success: undefined } | { success: boolean; error?: undefined }
  >;
}

const CustomPopupDialog: React.FC<CustomPopupDialogProps> = ({
  triggerButton,
  title,
  message,
  loadingText = "Loading...",
  successMessage = "Success",
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await onConfirm();

      if (response.error) {
        toast.error("Somthing wen't wrong",{
          description: Array.isArray(response.error)
            ? response.error[0].msg
            : response.error,
      
        });
      } else {
        toast.success(successMessage)
      }
    } catch (error) {
      toast.error("Something wen't wrong",{
        description: String(error),
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className={cn("bg-primary-foreground max-w-xs sm:max-w-sm rounded-2xl p-0 overflow-hidden", loading ? "" :"text-primary")}>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full p-14">
            <Spinner size="medium">
              <span className="text-primary">{loadingText}</span>
            </Spinner>
          </div>
        ) : (
          <>
            <DialogHeader className="flex flex-row bg-accent justify-between items-center px-5 py-3">
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-muted-foreground p-1 px-5">
              {message}
            </DialogDescription>
            <DialogFooter className="flex justify-end  px-3 py-2 gap-2 md:gap-1">
              <Button
                variant="secondary"
                className="px-4 py-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="px-4 py-2"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomPopupDialog;
