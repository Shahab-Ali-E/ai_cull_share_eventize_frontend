import {
  ChevronDown,
  ChartNoAxesCombined,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import dynamic from "next/dynamic";
import React from "react";
import {SideBarHelpSectionSkeleton, SidebarThemeToggleSkeleton, SideBarServicesSectionSkeleton} from "./app-sidebar-skeleton";

// Dynamically load client components
const SidebarThemeToggle = dynamic(() => import("./app-sidebar-theme-toggle"), {
  ssr: false,
  loading: () => <SidebarThemeToggleSkeleton />,
});

const ServicesSection = dynamic(()=> import("./services-section"), {
  ssr:false,
  loading:()=><SideBarServicesSectionSkeleton />,
});

const HelpSection = dynamic(()=> import("./help-section"), {
  ssr:false,
  loading:()=><SideBarHelpSectionSkeleton />,
});


export async function AppSidebar() {
 

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/overview">
                    <ChartNoAxesCombined />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
           <ServicesSection />
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarMenuButton asChild>
              <CollapsibleTrigger className="hover:bg-secondary">
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarMenuButton>
            <CollapsibleContent>
              <SidebarMenuSub>
                <HelpSection />
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="pb-3">
        <SidebarThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
