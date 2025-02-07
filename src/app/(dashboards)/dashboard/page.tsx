import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/Overview";
import { Calendar, Folder, FolderHeart } from "lucide-react";
import StorageCard from "@/components/dashboard/StorageCard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="grid grid-cols-1 md:grid-cols-12 pt-6 p-8">
        <div className="flex flex-col gap-4 col-span-9">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            {/* total booked event card */}
            <Card className="bg-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium text-primary self-start mt-1">
                  Booked Events
                </CardTitle>
                <span className="bg-[#d7b2fd] dark:bg-[#3B0764] p-4 rounded-full">
                  <Calendar className="size-4 text-primary" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100</div>
              </CardContent>
            </Card>

            {/* total culling workspace card */}
            <Card className="bg-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium text-primary self-start mt-1">
                  Culling Workspaces
                </CardTitle>
                <span className="bg-[#BBF7D0] dark:bg-[#052E16] p-4 rounded-full">
                  <Folder className="size-4 text-primary" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
              </CardContent>
            </Card>

            {/* total smart share events card */}
            <Card className="bg-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium text-primary self-start mt-1">
                  Smart Share Events
                </CardTitle>
                <span className="bg-[#C7D2FE] dark:bg-[#1E1B4B] p-4 rounded-full">
                  <FolderHeart className="size-4 text-primary" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
              </CardContent>
            </Card>
          </div>

          {/* chart */}
          <div className="flex w-full">
            <Overview />
          </div>
        </div>

        {/* storage card */}
        <div className="col-span-3 pt-4 md:pt-0 pl-0 md:pl-4 flex flex-col gap-4">
          <StorageCard />
          <StorageCard />
        </div>
      </div>
    </div>
  );
}
