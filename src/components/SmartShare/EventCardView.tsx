"use client";

import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import { FcEmptyTrash } from "react-icons/fc";
import CustomPopupDialog from "../custom-popup-dialog";
import { DeleteEvent } from "@/lib/actions/SmartShare/DeleteEvent";
import Image from "next/image";
import AltCoverImage from "@/images/event-management-slider.jpg";

interface EventCardProps {
  EventName: string;
  createdDate: string;
  coverPhoto: string;
  size: number;
  href: string;
}

// Function to convert size from bytes to MB or GB
const formatSize = (sizeInBytes: number) => {
  const sizeInMB = sizeInBytes / (1024 * 1024);
  if (sizeInMB < 1023) {
    return `${sizeInMB.toFixed(2)} MB`;
  } else {
    const sizeInGB = sizeInMB / 1024;
    return `${sizeInGB.toFixed(2)} GB`;
  }
};

const EventCardView = ({
  EventName,
  createdDate,
  size,
  href,
  coverPhoto,
}: EventCardProps) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-muted hover:shadow-xl w-[46%] md:w-[230px]">
      {/* Event image */}
      <Link href={href} passHref>
        <div className="w-full hover:cursor-pointer relative">
          <Image
            src={coverPhoto || AltCoverImage}
            alt={"Cover Image"}
            height={100}
            width={200}
            className="object-cover h-32 sm:h-36 w-full"
            unoptimized
            quality={100}
          />
        </div>
      </Link>

      {/* Event details */}
      <div className="flex flex-row p-4 bg-primary-foreground">
        <div className="flex flex-col w-1/2 justify-between">
          <Label className="text-primary text-base sm:text-xl font-bold">{EventName}</Label>
          <Label className="text-muted-foreground text-xs">
            Size: {formatSize(size)}
          </Label>
        </div>
        <div className="flex flex-col items-end justify-between space-y-5 w-1/2">
          <Label className="text-muted-foreground text-xs">{createdDate}</Label>

          {/* Delete warning button with confirmation */}
          <CustomPopupDialog
            triggerButton={
              <button className="text-primary" title="Delete Event">
                <FcEmptyTrash className="h-6 w-6 hover:text-purple-200" />
              </button>
            }
            message={`This can't be undone`}
            title={"Delete event?"}
            onConfirm={() => DeleteEvent({ EventName: EventName })}
            loadingText="Deleting..."
          />
        </div>
      </div>
    </div>
  );
};

export default EventCardView;
