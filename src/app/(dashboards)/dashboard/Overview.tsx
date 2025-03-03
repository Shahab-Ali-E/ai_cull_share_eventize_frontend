"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTheme } from "next-themes";
import { UserEventAccess } from "@/@types/dashboard";

export default function Overview({
  eventAccessData,
}: {
  eventAccessData: UserEventAccess[];
}) {
  const { theme } = useTheme();
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: theme === "light" ? "#D7B2FD" : "#9948EA",
    },
  } satisfies ChartConfig;

  const chartData = eventAccessData.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ event_id, created_at, views, ...rest }) => ({
      ...rest,
      views: views.length,
    })
  );

  // Find the max value in the "views" field
  const maxViews = (Math.max(...chartData.map((d) => d.views), 0) * 1.4 ) ; 

  return (
    <Card className="flex flex-col flex-grow bg-primary-foreground">
      <CardHeader>
        <CardTitle>Event Access Insights</CardTitle>
        <CardDescription>
          Number of people who accessed shared events (Jan - Jun 2024).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-auto w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis dataKey="desktop" tickLine={false} height={10} domain={[0,maxViews]}/>
            <XAxis
              dataKey="event_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="bg-secondary" />
              }
            />
            <Bar
              dataKey="views"
              fill="var(--color-desktop)"
              barSize={60}
              radius={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          This chart visualizes how many people accessed shared events over
          time. Higher bars indicate more views.
        </div>
      </CardFooter>
    </Card>
  );
}
