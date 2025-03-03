"use client";

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
import { SignalHigh } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserEventAccess, VisitorData } from "@/@types/dashboard";
import Link from "next/link";
import { CollapsibleTableSkeleton } from "@/components/dashboard/Skeletons";

export default function CollapsibleTable({
  eventAccessData,
}: {
  eventAccessData: UserEventAccess[] | undefined;
}) {
  const [expandedRowData, setExpandedRowData] = useState<VisitorData[] | []>(
    []
  );
  const [toggleRow, setToggleRow] = useState<string | null>(null);

  if (!eventAccessData) {
    return <CollapsibleTableSkeleton />;
  }

  const tableRecord = eventAccessData.map(({ event_id, views, ...rest }) => ({
    ...rest,
    event_id: event_id,
    event_href: `/smart-share-dashboard/${event_id}`,
    views: views.length,
  }));

  const recordForPerEvent = (id: string) => {
    setToggleRow(id === toggleRow ? null : id);
    setExpandedRowData(
      eventAccessData
        .filter(({ event_id }) => event_id === id)
        .flatMap(({ views }) => views)
    );
  };

  console.log("event data in collap", expandedRowData);

  return (
    <Card className="w-full sm:p-4 bg-primary-foreground">
      <CardHeader>
        <CardTitle>Smart Share Event Access Overview</CardTitle>
        <CardDescription>
          Detailed insights into user engagement with Smart Share events. Click
          on any event to view individual visitor data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-card-foreground/10">
            <TableRow className="text-sm text-primary hover:bg-card-foreground/10 border-none">
              <TableCell className="font-semibold py-5 rounded-s-sm px-4">
                Name
              </TableCell>
              <TableCell className="font-semibold px-4">Link</TableCell>
              <TableCell className="font-semibold px-4 rounded-e-sm">
                Views
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRecord.length !== 0 ? (
              tableRecord.map((record) => (
                <React.Fragment key={record.event_id}>
                  <TableRow
                    className="border-[#c6c6c8] dark:border-[#414147] cursor-pointer hover:bg-card text-primary text-sm"
                    onClick={() => recordForPerEvent(record.event_id)}
                  >
                    <TableCell className="p-4">{record.event_name}</TableCell>
                    <TableCell className="p-4">
                      <Link
                        href={record.event_href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted px-5 py-1.5 rounded-sm"
                      >
                        {record.event_href}
                      </Link>
                    </TableCell>
                    <TableCell className="p-4 text-muted-foreground">
                      <p className="inline-flex items-center justify-center">
                        <SignalHigh className="size-6" />
                        <span className="-mb-2">{record.views}</span>
                      </p>
                    </TableCell>
                  </TableRow>

                  <AnimatePresence>
                    {toggleRow === record.event_id && (
                      <TableRow>
                        <TableCell colSpan={3} className="p-0">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <Table>
                              <TableHeader className="bg-card-foreground/10">
                                <TableRow className="text-sm text-primary border-none">
                                  <TableCell className="font-semibold py-5 rounded-s-sm px-4">
                                    Name
                                  </TableCell>
                                  <TableCell className="font-semibold px-4">
                                    Email
                                  </TableCell>
                                  <TableCell className="font-semibold px-4 rounded-e-sm">
                                    Accessed At
                                  </TableCell>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {expandedRowData.length !== 0 ? (
                                  expandedRowData.map((visitor) => (
                                    <TableRow key={visitor.user_id}>
                                      <TableCell className="px-2 py-2">
                                        <div className="inline-flex items-center gap-2">
                                          <div className="flex items-center justify-center size-10 outline outline-2 outline-[#9948EA] dark:outline-[#D7B2FD] text-center rounded-full bg-[#D7B2FD] dark:bg-[#3B0764]">
                                            <p className="text-primary font-semibold text-sm">
                                              {visitor.first_name
                                                ? visitor.first_name.split(" ")
                                                    .length > 1
                                                  ? `${visitor.first_name
                                                      .split(" ")[0]
                                                      .charAt(0)
                                                      .toUpperCase()}${visitor.first_name
                                                      .split(" ")[1]
                                                      .charAt(0)
                                                      .toUpperCase()}`
                                                  : visitor.first_name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : ""}
                                              {visitor.last_name
                                                ? visitor.last_name
                                                    .charAt(0)
                                                    .toUpperCase()
                                                : ""}
                                            </p>
                                          </div>
                                          <span>
                                            {visitor.first_name}{" "}
                                            {visitor.last_name}
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell>{visitor.email}</TableCell>
                                      <TableCell>
                                        {new Date(
                                          visitor.accessed_at
                                        ).toLocaleString("en-US", {
                                          timeZone: "UTC",
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          timeZoneName: "short",
                                        })}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell
                                      colSpan={3}
                                      className="text-primary font-semibold text-base text-center"
                                    >
                                      No data available
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-primary font-semibold text-base text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
