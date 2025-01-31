import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";

export function SideBarHelpSectionSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 4 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function SideBarServicesSectionSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 3 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function SidebarThemeToggleSkeleton()
  {
  return (
    <div className={`flex items-center justify-between p-2`}>
      {/* Icon Placeholder */}
      <Skeleton className="h-7 w-7 rounded-full" />
      {/* Label Placeholder */}
      <Skeleton className="h-6 w-12 rounded-sm" />
      {/* Switch Placeholder */}
      <Skeleton className="h-6 w-10 rounded-full" />
    </div>
  );
}

export function BreadCrumbSkeleton(){
  return (
    <div className={`flex space-x-2 p-2`}>
      {/* Icon Placeholder */}
      <Skeleton className="h-5 w-28 rounded-sm" />
      {/* Label Placeholder */}
      <Skeleton className="h-5 w-5 rounded-sm" />
      {/* Switch Placeholder */}
      <Skeleton className="h-5 w-28 rounded-sm" />
    </div>
  )
}
