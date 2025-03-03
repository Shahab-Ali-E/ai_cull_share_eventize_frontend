"use client";

import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";
import { usePathname } from "next/navigation";

function DashboardSection() {
  const pathname = usePathname();
  
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`hover:rounded-sm  ${
              `/${pathname.split('/')[1]}` === item.url ? "rounded-sm bg-sidebar-activetab hover:bg-sidebar-activetab hover:text-primary text-primary" : ""
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

export default DashboardSection;