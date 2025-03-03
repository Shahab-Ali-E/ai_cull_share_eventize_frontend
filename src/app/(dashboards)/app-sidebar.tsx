import {
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import dynamic from "next/dynamic";
import React from "react";
import {SideBarHelpSectionSkeleton, SidebarThemeToggleSkeleton, SideBarServicesSectionSkeleton, SideBarDashboardSectionSkeleton} from "../../components/Sidebar/app-sidebar-skeleton";

// Dynamically load client components
const SidebarThemeToggle = dynamic(() => import("@/components/Sidebar/app-sidebar-theme-toggle"), {
  ssr: false,
  loading: () => <SidebarThemeToggleSkeleton />,
});

const ServicesSection = dynamic(()=> import("@/components/Sidebar/services-section"), {
  ssr:false,
  loading:()=><SideBarServicesSectionSkeleton />,
});

const HelpSection = dynamic(()=> import("@/components/Sidebar/help-section"), {
  ssr:false,
  loading:()=><SideBarHelpSectionSkeleton />,
});

const DashboardSection = dynamic(()=> import("@/components/Sidebar/dashboard-section"), {
  ssr:false,
  loading:()=><SideBarDashboardSectionSkeleton />,
});

export async function AppSidebar() {
 

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <DashboardSection />
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
