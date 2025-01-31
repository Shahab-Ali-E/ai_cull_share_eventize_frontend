"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import EventIdLabel from "@/components/SmartShare/ShareEvent/EventIdLabel";
import CoverImage from "@/components/SmartShare/ShareEvent/CoverImage";
import EventDescription from "@/components/SmartShare/ShareEvent/EventDescription";
import { Label } from "@/components/ui/label";
import UpdateButton from "./UpdateButton";
import QRCode from "qrcode";
import { toast } from "sonner";
import Image from "next/image";

function EventDetailModal({
  eventId,
  eventName,
  description = "",
  coverImage,
}: {
  eventId: string;
  eventName: string;
  description: string;
  coverImage: string;
}) {
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");

  // Function to generate the QR code
  const generateQrCode = async (eventId: string) => {
    try {
      const src = await QRCode.toDataURL(
        // `http://localhost:3000/get-images/${eventId}`
        `https://5e35-182-191-129-81.ngrok-free.app/get-images/${eventId}`
      );
      setQrCodeSrc(src);
    } catch (err) {
      toast.error(String(err));
    }
  };

  // Generate QR code when the modal opens
  useEffect(() => {
    generateQrCode(eventId);
  }, [eventId]);

  // Function to download the QR code
  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeSrc;
    link.download = `${eventName}-QR.png`;
    link.click();
  };

  return (
    <Dialog>
      {/* Button to trigger the modal */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-4 py-5 text-primary hover:bg-primary-foreground rounded-sm"
        >
          <Info size={19} className="text-primary" />
          <span>Details</span>
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="flex flex-col bg-primary-foreground max-w-sm sm:max-w-3xl text-primary px-4 sm:px-7 max-h-[90vh] overflow-y-auto rounded-md">
        <DialogHeader className="py-2 border-b border-muted-foreground">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Event Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-7 sm:gap-8 bg-secondary p-6 rounded-md shadow-lg">
          {/* Left Section: Event Image */}
          <div className="flex-shrink-0 w-full sm:w-2/5 self-center">
            <CoverImage coverImage={coverImage} />
          </div>

          {/* Right Section: Event Details */}
          <div className="flex flex-col space-y-4 w-full sm:w-3/5">
            <Label className="font-semibold">
              Event name:{" "}
              <span className="text-muted-foreground font-normal ml-2 text-base">
                {eventName}
              </span>
            </Label>
            <EventIdLabel eventId={eventId} />
            <EventDescription description={description} />
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-3 flex flex-col items-center space-y-6 bg-secondary p-6 rounded-md shadow-lg">
          <h3 className="text-lg font-semibold text-center text-primary">
            Scan or Share This Event
          </h3>
          {qrCodeSrc ? (
            <Image
              src={qrCodeSrc}
              alt="QR Code"
              height={200}
              width={200}
              className="rounded border border-muted"
            />
          ) : (
            <p className="text-sm text-muted-foreground">Generating QR code...</p>
          )}
          <Button variant="default" onClick={downloadQrCode} className="mt-4 rounded">
            Download QR Code
          </Button>
        </div>

        <DialogFooter className="mt-6">
          {/* Update Button */}
          <UpdateButton eventId={eventId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailModal;
