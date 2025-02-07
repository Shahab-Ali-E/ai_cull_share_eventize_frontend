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
const chartData = [
  { month: "January", desktop: 200 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#D7B2FD",
  },
} satisfies ChartConfig;

export function Overview() {
  return (
    <Card className="h-full w-full bg-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg">Event Access Insights</CardTitle>
        <CardDescription>
          Number of people who accessed shared events (Jan - Jun
          2024).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px] w-full">
          <BarChart accessibilityLayer data={chartData} >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="desktop" tickLine={false} height={10}/>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="bg-secondary" />
              }
            />
            <Bar
              dataKey="desktop"
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
