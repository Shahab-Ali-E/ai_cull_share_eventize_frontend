import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Folder, FolderHeart } from "lucide-react";
import { AnalyticsResponse } from "@/@types/dashboard";
import Overview from "./Overview";

function DashboardPage({
  analyticsData,
}: {
  analyticsData: AnalyticsResponse | undefined;
}) {
  if (!analyticsData) {
    return <div className="text-primary text-3xl">Loading......</div>;
  }
  return (
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
            <div className="text-2xl font-bold">
              {analyticsData.booked_events}
            </div>
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
            <div className="text-2xl font-bold">
              {analyticsData.culling_workspaces}
            </div>
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
            <div className="text-2xl font-bold">
              {analyticsData.smart_share_events}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* chart */}
      <div className="flex w-full">
        <Overview eventAccessData={analyticsData.user_event_access} />
      </div>
    </div>
  );
}

export default DashboardPage;
