"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, HandCoins, Mail, Phone, Copy } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { EventDetails } from "@/@types/event-managment";
import { toast } from "sonner";

// Import event images
import CorporateImage from "@/images/EventArrangment/corporateimages/1.jpg";
import WeddingImage from "@/images/EventArrangment/weddingimages/wedding_5.jpg";
import birthdayImage from "@/images/EventArrangment/birthdayimages/birthday_5.jpg";
import OthersImage from "@/images/EventArrangment/concert.jpeg";
import DefaultImage from "@/images/EventArrangment/concert.jpeg";

const EventDetailsCard = ({ event }: { event: EventDetails }) => {
  const eventImage: Record<string, StaticImageData> = {
    corporate: CorporateImage,
    wedding: WeddingImage,
    birthday: birthdayImage,
    others: OthersImage,
  };

  const handleCopyEventId = () => {
    if(navigator.clipboard.writeText){
      navigator.clipboard.writeText(event.id);
      toast.success("Event ID has been copied to your clipboard");
    }else{
      // Handle the case where clipboard API is not supported
      toast.warning("Copying to clipboard is not supported on your device.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg bg-primary-foreground p-6">
      {/* Event Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">
          {event.eventType} Event
        </CardTitle>
        <CardDescription className="mt-2">
          <Badge variant="outline" className="mr-2">
            {event.eventDate.split('T')[0]}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            onClick={handleCopyEventId}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Event ID
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Event Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-6">
          <Image
            src={eventImage[event.eventType.toLowerCase()] || DefaultImage}
            alt={event.eventType}
            fill
            className="object-cover"
          />
        </div>

        {/* Personal Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="text-primary" size={18} />
              <p className="text-muted-foreground text-sm">{event.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-primary" size={18} />
              <p className="text-muted-foreground text-sm">{event.phone}</p>
            </div>
          </div>
        </div>

        {/* Event Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Event Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="text-primary" size={18} />
              <p className="text-muted-foreground text-sm">
                {event.numberOfGuests} Guests
              </p>
            </div>
            <div className="flex items-center gap-2">
              <HandCoins className="text-primary" size={18} />
              <p className="text-muted-foreground text-sm">
                Budget: ${event.budget}
              </p>
            </div>
            {event.eventDescription && (
              <p className="text-sm text-muted-foreground">
                {event.eventDescription}
              </p>
            )}
          </div>
        </div>

        {/* Destination Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Destination Details</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" size={18} />
              <p className="text-muted-foreground text-sm">
                {event.city}, {event.selectCountry}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
          <div className="space-y-2">
            {event.portfolio && (
              <p className="text-sm text-muted-foreground">
                Portfolio: {event.portfolio}
              </p>
            )}
            {event.specialRequirements && (
              <p className="text-sm text-muted-foreground">
                Special Requirements: {event.specialRequirements}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Button variant="outline">Share Event</Button>
          <Button>Contact Organizer</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailsCard;