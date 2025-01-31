import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import React from "react";
import Image from "next/image";
import image from "@/images/fine_after_cull.jpg";
import { SmartShareEventDataByIdInterface } from "@/@types/smart-share";
import FindMyImagesButton from "./DetailsForm";

function EventAvailabilityPage({ eventData }: { eventData: SmartShareEventDataByIdInterface | undefined }) {
  return (
    <Card className="max-w-sm md:max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg bg-primary-foreground">
      {/* Upper section with image and event name */}
      <div className="relative w-full h-60 md:h-96">
        <Image
          src={eventData?.cover_image || image}
          layout="fill"
          objectFit="cover"
          alt="event-image"
          className="rounded-t-2xl"
          unoptimized
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Label className="text-white text-3xl md:text-5xl font-semibold tracking-wide">
            {eventData?.name.charAt(0).toUpperCase() + (eventData?.name.slice(1) || "")}
          </Label>
        </div>
      </div>

      {/* Bottom section with event details and action button */}
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm md:text-base font-semibold">Get your images by face recognition at </Label>
            <Label className="text-base md:text-xl font-bold text-primary">{eventData?.name.charAt(0).toUpperCase() + (eventData?.name.slice(1) || "")}</Label>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="w-5 h-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 text-sm text-muted-foreground bg-primary-foreground">
              Welcome to the new age of image discovery. Our cutting-edge algorithms detect your face in every photo captured with 99.2% accuracy. Just fill this form, capture a selfie, and we’ll send all your photos from <strong>{eventData?.name}</strong> directly to you—automatically and privately!<br/><br/>
              PS: Your data is completely secure with us. No spams.
            </PopoverContent>
          </Popover>
        </div>
        
        <FindMyImagesButton eventId={eventData?.id || ""} />
      </CardContent>
    </Card>
  );
}

export default EventAvailabilityPage;
