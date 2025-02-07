"use client";

import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { CalendarDays, HandCoins, MapPin, User } from "lucide-react";

// Import event images
import CorporateImage from "@/images/EventArrangment/corporateimages/1.jpg";
import WeddingImage from "@/images/EventArrangment/weddingimages/wedding_5.jpg";
import birthdayImage from "@/images/EventArrangment/birthdayimages/birthday_5.jpg";
import OthersImage from "@/images/EventArrangment/concert.jpeg";
import DefaultImage from "@/images/EventArrangment/concert.jpeg";

interface EventCardProps {
  eventType: string;
  bookedDate: string;
  bookedBy: string;
  country: string;
  budget: number;
  href: string;
}

// Mapping event types to images
const eventImages: Record<string, StaticImageData> = {
  corporate: CorporateImage,
  wedding: WeddingImage,
  birthday: birthdayImage,
  others: OthersImage,
};

const EventCard = ({
  eventType,
  bookedDate,
  bookedBy,
  country,
  budget,
  href,
}: EventCardProps) => {
  // Get the corresponding image or use default
  const eventImage = eventImages[eventType.toLowerCase()] || DefaultImage;

  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-muted hover:shadow-xl w-[46%] md:w-[228px]">
      {/* Event image (60% of the card) */}
      <Link href={href} passHref>
        <div className="w-full h-36 md:h-40 hover:cursor-pointer relative aspect-w-3 aspect-h-2">
          <Image
            src={eventImage}
            alt={`${eventType} Event Image`}
            fill
            className="object-cover"
            unoptimized
            quality={100}
          />
        </div>
      </Link>

      {/* Event details (40% of the card) */}
      <div className="flex flex-col p-4 bg-primary-foreground h-full">
        {/* Event Type */}
        <div className="flex items-center mb-2">
          <Label className="text-primary font-semibold text-base">
            {eventType}
          </Label>
        </div>

        {/* Country */}
        <div className="flex items-center space-x-1 mb-3">
          <MapPin className="text-muted-foreground" size={15} />
          <Label className="text-muted-foreground text-xs md:text-sm break-words">
            {country}
          </Label>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col space-y-3">
            {/* Booked By (User Name) */}
            <div className="flex items-center space-x-1">
              <User className="text-muted-foreground" size={15} />
              <Label className="text-muted-foreground text-xs md:text-sm">
                {bookedBy}
              </Label>
            </div>

            {/* Booked Date */}
            <div className="flex items-center space-x-1">
              <CalendarDays className="text-muted-foreground" size={15} />
              <Label className="text-muted-foreground text-xs md:text-sm">
                {bookedDate}
              </Label>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {/* Budget */}
            <div className="flex items-center space-x-1">
              <HandCoins className="text-muted-foreground" size={15} />
              <Label className="text-muted-foreground text-xs md:text-sm">
                {budget}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
