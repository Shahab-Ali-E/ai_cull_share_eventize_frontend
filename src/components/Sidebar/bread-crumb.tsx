"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { useUser } from "@clerk/nextjs";
import useCullingStore from "@/zustand/CullingStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import useSmartShareStore from "@/zustand/SmartShare";

// to get the path segments
function getPathSegments(pathname: string) {
  return pathname.split("/").filter((segment) => segment.length > 0);
}

// to map the active dashboard with proper nmae
function mapActiveDashboardName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  activePath: string
) {
  // userName = userName
  //   ? userName.charAt(0).toUpperCase() + userName.slice(1)
  //   : "loading...";

  switch (activePath) {
    case "culling-dashboard":
      return `${firstName} ${lastName}'s Culling`;
    case "event-arrangment-dashboard":
      return `${firstName} ${lastName}'s Booked Event`;
    case "smart-share-dashboard":
      return `${firstName} ${lastName}'s Event`;
    case "dashboard":
      return `${firstName} ${lastName}'s Dashboard`;
  }
}

export default function BreadCrumb() {
  const pathname = usePathname();
  const pathSegments = getPathSegments(pathname);
  const { user } = useUser();
  const { workspacesData } = useCullingStore();
  const { eventsData } = useSmartShareStore();
  const initialName = mapActiveDashboardName(
    user?.firstName,
    user?.lastName,
    pathSegments[0]
  );

  // Generate breadcrumbs dynamically
  const breadcrumbs = pathSegments
    .slice(1) // Start from index 1, skipping the 0th index
    .map((segment, index) => {
      const isLast = index === pathSegments.length - 2; // Adjust the last index check since we sliced the array
      const href = `/${pathSegments.slice(0, index + 2).join("/")}`; // Include segments from 1 to the current index + 1

      let label = segment;

      if (pathSegments[0] === "culling-dashboard") {
        // Replace UUID with corresponding workspace name if it exists
        const matchingWorkspace = workspacesData.find(
          (workspace) => workspace.id === segment
        );
        if (matchingWorkspace) {
          label = matchingWorkspace.name;
        }
      } else if (pathSegments[0] === "smart-share-dashboard") {
        // Replace UUID with corresponding event name if it exists
        const matchingEvent = eventsData.find((event) => event.id === segment);
        if (matchingEvent) {
          label = matchingEvent.name;
        }
      }

      return { href, label, isLast };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-primary text-base sm:text-2xl font-semibold">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${pathSegments[0]}`}>{initialName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map(({ href, label, isLast }, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator>
              <ChevronRight className="font-bold" size={20} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {isLast ? (
                <span>{label}</span>
              ) : (
                <BreadcrumbLink>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
