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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CustomPopupDialogProps {
  triggerButton: React.ReactNode;
  message: string;
  title: string;
  isLoading?: boolean;
  loadingText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: () => Promise<{error:any; success:undefined} | { success: boolean; error?: undefined; }>;
}

const CustomPopupDialog: React.FC<CustomPopupDialogProps> = ({
  triggerButton,
  title,
  message,
  loadingText = "Loading...",
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    setLoading(true);
    try {
        const response = await onConfirm();

        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } 
        else {
            router.refresh()
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
    } catch (error) {
        toast({
            title: "Error",
            description: String(error),
            variant: "destructive",
        });
    } 
    finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-primary-foreground text-primary max-w-xs sm:max-w-sm rounded-2xl p-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full p-14">
            <Spinner size="medium">
              <span className="text-primary">{loadingText}</span>
            </Spinner>
          </div>
        ) : (
          <>
            <DialogHeader className="flex flex-row bg-accent justify-between items-center px-5 py-3">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-muted-foreground p-1 px-5">
              {message}
            </DialogDescription>
            <DialogFooter className="flex justify-end space-x-4 px-3 py-2">
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
