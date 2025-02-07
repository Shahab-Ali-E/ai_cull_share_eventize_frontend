"use client";

import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { Inbox, Sparkle, ScanFace } from "lucide-react";
import { usePathname } from "next/navigation";

function ServicesSection() {
  const pathname = usePathname();
  
  const items = [
    {
      title: "Event Arrangement",
      url: "/event-arrangment-dashboard",
      icon: Sparkle,
    },
    { title: "Smart Culling", url: "/culling-dashboard", icon: Inbox },
    { title: "Smart Share", url: "/smart-share-dashboard", icon: ScanFace },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`hover:rounded-sm  ${
              `/${pathname.split('/')[1]}` === item.url ? "rounded-sm bg-sidebar-activetab hover:bg-sidebar-activetab hover:text-white text-white" : ""
            }`}
          >
            <Link href={item.url} >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default ServicesSection;