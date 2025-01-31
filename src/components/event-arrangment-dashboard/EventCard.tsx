"use client";

import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import Image from "next/image";
import AltCoverImage from "@/images/EventArrangment/concert.jpeg";
import { FaCalendarAlt, FaUser, FaGlobe } from "react-icons/fa";
import { CalendarDays, Earth, HandCoins, MapPin, User } from "lucide-react";

interface EventCardProps {
  eventType: string;
  bookedDate: string;
  bookedBy: string;
  country: string;
  href: string;
}

const EventCard = ({
  eventType,
  bookedDate,
  bookedBy,
  country,
  href,
}: EventCardProps) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-muted hover:shadow-xl w-[48%] md:w-[280px]">
      {/* Event image (60% of the card) */}
      <Link href={href} passHref>
        <div className="w-full h-36 md:h-40 hover:cursor-pointer relative aspect-w-3 aspect-h-2">
          <Image
            src={AltCoverImage}
            alt={"Cover Image"}
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
        <div className="flex items-center mb-3">
          <Label className="text-primary font-semibold text-base">
            {eventType}
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
            {/* Country */}
            <div className="flex items-center space-x-1">
              <MapPin className="text-muted-foreground" size={15} />
              <Label className="text-muted-foreground text-xs md:text-sm">
                {country}
              </Label>
            </div>

            {/* Budget */}
            <div className="flex items-center space-x-1">
              <HandCoins className="text-muted-foreground" size={15} />
              <Label className="text-muted-foreground text-xs md:text-sm">
                100000
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
