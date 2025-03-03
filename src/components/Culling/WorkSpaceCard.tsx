"use client";

import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import { FcEmptyTrash } from "react-icons/fc";
import CustomPopupDialog from "../custom-popup-dialog";
import { DeleteWorkSpace } from "@/lib/actions/Culling/DeleteWorkSpace";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CheckCircle } from "lucide-react";

interface WorkspaceCardProps {
  workspaceName: string;
  createdDate: string;
  size: number;
  initials: string;
  href: string;
  disabled?: boolean;
  cullingDone?: boolean;
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

const WorkspaceCard = ({
  workspaceName,
  createdDate,
  size,
  initials,
  href,
  disabled = false,
  cullingDone = false,
}: WorkspaceCardProps) => {
  return (
    <div
      className={`relative flex flex-col rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-muted hover:shadow-xl w-44 sm:w-[225px] ${
        disabled ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      {disabled && (
        <Skeleton className="absolute inset-0 z-10 pointer-events-none text-center text-primary text-2xl font-semibold"></Skeleton>
      )}
      {/* Workspace initials */}
      <Link href={href} passHref>
        <div
          className={`w-full h-20 md:h-28 relative border-white text-center pb-4 bg-gradient-to-tr from-purple-500 to-teal-300 hover:cursor-pointer ${
            disabled ? "" : ""
          }`}
        >
          {disabled ? (
            <Label className="text-white w-full font-bold absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-base sm:text-xl animate-pulse">
              Culling in progress...
            </Label>
          ) : (
            <Label className="text-white text-7xl sm:text-8xl font-bold opacity-90">
              {initials}
            </Label>
          )}
        </div>
        {/* Status icon overlay */}
        {cullingDone && (
          <div className="absolute flex p-1.5 top-2 right-2 rounded-full bg-green-600/40">
            <Tooltip>
              <TooltipTrigger>
                <CheckCircle className="h-6 w-6 text-green-700" />
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-primary-foreground text-primary max-w-xs p-3 rounded shadow-md"
              >
                Culling Done
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </Link>
      {/* Workspace details */}
      <div className="flex flex-row p-4 bg-primary-foreground">
        <div className="flex flex-col w-1/2 justify-between">
          <Label
            className={`text-primary text-base sm:text-xl font-bold ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            {workspaceName}
          </Label>
          <Label
            className={`text-muted-foreground text-xs ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            Size: {formatSize(size)}
          </Label>
        </div>
        <div className="flex flex-col items-end justify-between space-y-5 w-1/2">
          <Label
            className={`text-muted-foreground text-xs ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            {createdDate}
          </Label>

          {/* Delete warning button with confirmation */}
          <CustomPopupDialog
            triggerButton={
              <button
                className={`text-primary ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
                title="Delete workspace"
                disabled={disabled}
              >
                <FcEmptyTrash
                  className={`h-6 w-6 hover:bg-opacity-90 ${
                    disabled ? "cursor-not-allowed" : "hover:scale-110"
                  }`}
                />
              </button>
            }
            message={`This can't be undone`}
            title={"Delete workspace?"}
            onConfirm={() => DeleteWorkSpace({ workSpaceName: workspaceName })}
            loadingText="Deleting..."
            successMessage="Deleted successfully"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
