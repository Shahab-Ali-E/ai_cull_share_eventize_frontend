import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import UserProfile from "@/components/user-profile"
import { Tally1 } from "lucide-react"
import dynamic from "next/dynamic"
import {BreadCrumbSkeleton} from "@/components/Sidebar/app-sidebar-skeleton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const BreadCrumb = dynamic(()=>import("../../components/Sidebar/bread-crumb") , {
    ssr:false,
    loading:()=><BreadCrumbSkeleton />,
  })
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='flex flex-col w-full bg-secondary space-y-4 pt-4'>
        <header className="flex w-full justify-between items-center px-4">
          <div className="flex items-center">
            <SidebarTrigger className="text-primary hover:bg-primary-foreground"/>
            <Tally1  className="text-gray-600"/>
            <BreadCrumb />
          </div>
          <UserProfile />
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}
