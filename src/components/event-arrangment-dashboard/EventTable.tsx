"use client";

import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";


interface EventTableProps {
  events: {
    id: number;
    name: string;
    email: string;
    budget: number;
    eventType: string;
    country: string;
    bookedDate: string;
  }[];
}

const EventTable = ({ events }: EventTableProps) => {
  const router = useRouter();

  return (
    <Table className="w-full">
      {/* Table Header */}
      <TableHeader className="bg-primary-foreground">
        <TableRow className="text-sm text-primary hover:bg-primary-foreground border-none">
          <TableCell className="font-semibold py-5 rounded-s-sm px-4">
            Name
          </TableCell>
          <TableCell className="font-semibold px-4">Email</TableCell>
          <TableCell className="font-semibold px-4">Budget</TableCell>
          <TableCell className="font-semibold px-4">Event Type</TableCell>
          <TableCell className="font-semibold px-4">Destination</TableCell>
          <TableCell className="font-semibold px-4 rounded-e-sm">
            Booked Date
          </TableCell>
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={event.id}
            className="border-[#c6c6c8] dark:border-[#414147] cursor-pointer hover:bg-primary/10 text-primary text-sm"
            onClick={() => router.push(`event-arrangment-dashboard/${event.id}`)}
          >
            {/* Name */}
            <TableCell className="px-4 py-4">{event.name}</TableCell>

            {/* Email */}
            <TableCell className="px-4 py-4">{event.email}</TableCell>

            {/* Phone */}
            <TableCell className="px-4 py-4">{event.budget}</TableCell>

            {/* Event Type */}
            <TableCell className="px-4 py-4">{event.eventType}</TableCell>

            {/* Country */}
            <TableCell className="px-4 py-4">{event.country}</TableCell>

            {/* Booked Date */}
            <TableCell className="px-4 py-4">{event.bookedDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;