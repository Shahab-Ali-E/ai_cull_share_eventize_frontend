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

function StorageCard({
  title,
  totalStorage,
  storageUsed,
}: {
  title: string;
  totalStorage: number;
  storageUsed: number;
}) {
  // Convert total storage to GB
  const totalStorageGB = totalStorage / (1024 * 1024 * 1024); // Bytes to GB
  const usedStorageInMB = storageUsed / (1024 * 1024); // Bytes to MB

  const usedStorage =
    usedStorageInMB >= 1024
      ? `${(usedStorageInMB / 1024).toFixed(2)} GB` // Convert to GB if >= 1024 MB
      : `${usedStorageInMB.toFixed(2)} MB`; // Otherwise, keep it in MB



  const chartData = [{ usage: storageUsed , remaning: totalStorage - storageUsed}]; // Convert to percentage for display
  const chartConfig = {
    storageUsed: {
      label: "StorageUsed",
      color: "#9948EA",
    },
    remaningStorage: {
      label: "RemaningStorage",
      color: "#D7B2FD",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <Card className="flex flex-col bg-primary-foreground">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow items-center -mb-[40px]">
          <ChartContainer className="mx-auto aspect-square size-full" config={chartConfig}>
            <RadialBarChart
              data={chartData}
              startAngle={180} // Ensuring half-circle from bottom to top
              endAngle={0}
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
                            {usedStorage.split(" ")[0].toLocaleString()}{" "}
                            <tspan className=" text-sm">{usedStorage.split(" ")[1]}</tspan>
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
                dataKey="usage"
                stackId="a"
                fill="var(--color-storageUsed)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="remaning"
                stackId="a"
                fill="var(--color-remaningStorage)"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 text-sm">
          {/* Information of total and used space */}
          <h4 className="flex flex-col text-center">
            <span className="text-muted-foreground">Total Space</span>
            <span className="text-base font-semibold">
              {totalStorageGB.toFixed(2)} <span className="text-sm font-medium">GB</span>
            </span>
          </h4>
          <h4 className="flex flex-col text-center">
            <span className="text-muted-foreground">Used Space</span>
            <span className="text-base font-semibold">
              {usedStorage.split(" ")[0]} <span className="text-sm font-medium">{usedStorage.split(" ")[1]}</span>
            </span>
          </h4>
        </CardFooter>
      </Card>
    </div>
  );
}

export default StorageCard;
