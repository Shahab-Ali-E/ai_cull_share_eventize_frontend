"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Component to handle copying email to clipboard
const HelpSection = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0].emailAddress || "loading...";

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        toast.success("Email copied to the clipboard");
      });
    } else {
      // Handle the case where clipboard API is not supported
      toast.warning("Copying to clipboard is not supported on your device.");
    }
  };

  const helpCollapsibleContent = [
    { title: "Help", url: "/help", icon: ExternalLink },
    { title: "Support", url: "/support", icon: ExternalLink },
    {
      title: "Terms and Conditions",
      url: "/terms-and-conditions",
      icon: ExternalLink,
    },
  ];

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleCopy}>
        <Copy />
        <span>{email}</span>
      </SidebarMenuButton>
      {/* Wrap nested menu items in a <ul> */}
      <ul>
        {helpCollapsibleContent.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url || "#"} target="_blank">
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </ul>
    </SidebarMenuItem>
  );
};

export default HelpSection;
