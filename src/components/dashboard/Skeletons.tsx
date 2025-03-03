import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Folder, FolderHeart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-4 col-span-9">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Booked Events Skeleton */}
        <Skeleton className="bg-primary-foreground p-5 rounded-lg space-y-2">
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <span className="bg-[#d7b2fd] dark:bg-[#3B0764] p-4 rounded-full">
              <Calendar className="size-4 text-primary" />
            </span>
          </div>
          <Skeleton className="h-8 w-16" />
        </Skeleton>

        {/* Culling Workspaces Skeleton */}
        <Skeleton className="bg-primary-foreground p-5 rounded-lg space-y-2">
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <span className="bg-[#BBF7D0] dark:bg-[#052E16] p-4 rounded-full">
              <Folder className="size-4 text-primary" />
            </span>
          </div>
          <Skeleton className="h-8 w-16" />
        </Skeleton>

        {/* Smart Share Events Skeleton */}
        <Skeleton className="bg-primary-foreground p-5 rounded-lg space-y-2">
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <span className="bg-[#C7D2FE] dark:bg-[#1E1B4B] p-4 rounded-full">
              <FolderHeart className="size-4 text-primary" />
            </span>
          </div>
          <Skeleton className="h-8 w-16" />
        </Skeleton>
      </div>

      {/* chart skeleton */}
      <Skeleton className="flex flex-col flex-grow bg-primary-foreground p-8 rounded-lg space-y-4 md:col-span-2 lg:col-span-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
        <div className="h-full w-full bg-primary-foreground rounded-lg">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="h-4 w-96" />
      </Skeleton>
    </div>
  );
}

export default function StorageCardSkeleton() {
  return (
    <div className="flex flex-col gap-5 bg-primary-foreground p-5 rounded-lg">
      {/* Title Skeleton */}
      <Skeleton className="h-6 w-40 mb-4" />

      {/* Chart Skeleton */}
      <div className="flex justify-center items-center h-48">
        <Skeleton className="size-44 rounded-full" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-between mt-4">
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CollapsibleTableSkeleton() {
  return (
    <Card className="w-full sm:p-4 bg-primary-foreground">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-2/3" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-card-foreground/10">
            <TableRow className="text-sm text-primary hover:bg-card-foreground/10 border-none">
              <TableCell className="font-semibold py-5 rounded-s-sm px-4">
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell className="font-semibold px-4">
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell className="font-semibold px-4 rounded-e-sm">
                <Skeleton className="h-5 w-20" />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                className="border-[#c6c6c8] dark:border-[#414147] cursor-pointer hover:bg-card text-primary text-sm"
              >
                <TableCell className="p-4">
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-5 w-48" />
                </TableCell>
                <TableCell className="p-4">
                  <Skeleton className="h-5 w-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
