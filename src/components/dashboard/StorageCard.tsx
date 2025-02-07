"use client";

import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [{ storageUsed: 1.4, totalStorage: 2 }];
const chartConfig = {
  storageUsed: {
    label: "StorageUsed",
    color: "#9948EA",
  },
  totalStorage: {
    label: "TotalStorage",
    color: "#D7B2FD",
  },
} satisfies ChartConfig;

function StorageCard() {
  const storageUsed = chartData[0].storageUsed;

 
  return (
    <div>
      <Card className="flex flex-col bg-primary-foreground">
        <CardHeader className="text-lg">
          <CardTitle>Smart Culling Storage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center -mb-28">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square size-full"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={90}
              outerRadius={190}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-primary text-2xl font-bold"
                          >
                            {storageUsed.toLocaleString()}{" "}
                            <tspan className=" text-sm">GB</tspan>
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground text-base"
                          >
                            Used
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="totalStorage"
                stackId="a"
                fill="var(--color-totalStorage)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="storageUsed"
                stackId="a"
                fill="var(--color-storageUsed)"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 text-sm">
          {/* information of total and used space */}
          <h4 className="flex flex-col text-center">
            <span className="text-muted-foreground">Total Space</span>
            <span className="text-lg font-semibold">
              125 <span className="text-sm font-medium">GB</span>
            </span>
          </h4>
          <h4 className="flex flex-col text-center">
            <span className="text-muted-foreground">Used Space</span>
            <span className="text-lg font-semibold">
              86 <span className="text-sm font-medium">GB</span>
            </span>
          </h4>
        </CardFooter>
      </Card>
    </div>
  );
}

export default StorageCard;
