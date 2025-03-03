"use client";

import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import { FcEmptyTrash } from "react-icons/fc";
import CustomPopupDialog from "../custom-popup-dialog";
import { DeleteEvent } from "@/lib/actions/SmartShare/DeleteEvent";
import Image from "next/image";
import AltCoverImage from "@/images/event-management-slider.jpg";
import { CheckCircle, Clock, AlertCircle } from "lucide-react"; // Import Lucide icons
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface EventCardProps {
  EventName: string;
  createdDate: string;
  coverPhoto: string;
  size: number;
  href: string;
  status: "Not Published" | "Published" | "Pending";
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
  status,
}: EventCardProps) => {
  // Function to get the icon and color based on the status
  const getStatusIcon = () => {
    switch (status) {
      case "Published":
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          color: "bg-green-500/20",
          title: "Published"
        };
      case "Pending":
        return {
          icon: <Clock className="h-6 w-6 text-yellow-500" />,
          color: "bg-yellow-500/20",
          title: "Pending"
        };
      case "Not Published":
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          color: "bg-red-500/20",
          title: "Not Published"
        };
      default:
        return {
          icon: null,
          color: "",
          title: ""
        };
    }
  };

  const { icon, color, title } = getStatusIcon();

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
          {/* Status icon overlay */}
          {icon && (
            <div
              className={`absolute flex p-1.5 top-2 right-2 rounded-full ${color}`}
            >
              <Tooltip >
                <TooltipTrigger>{icon}</TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-primary-foreground max-w-xs p-3 rounded text-primary"
                >
                  {title}
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </Link>

      {/* Event details */}
      <div className="flex flex-row p-4 bg-primary-foreground">
        <div className="flex flex-col w-1/2 justify-between">
          <Label className="text-primary text-base sm:text-xl font-bold">
            {EventName}
          </Label>
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
