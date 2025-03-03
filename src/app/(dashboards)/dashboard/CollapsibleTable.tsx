"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import VisitorsTable from "../../../components/dashboard/VisitorsTable";
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

export default function CollapsibleTable({
  eventAccessData,
}: {
  eventAccessData: UserEventAccess[] | undefined;
}) {
  // state for handling to show further records of a row
  const [expandedRowData, setExpandedRowData] = useState<VisitorData[] | []>(
    []
  );
  const [toggleRow, setToggleRow] = useState<string | null>();

  if (!eventAccessData) {
    return <div className="text-xl text-primary">loading...</div>;
  }

  // record for the table
  const tableRecord = eventAccessData.map(({ event_id, views, ...rest }) => ({
    ...rest,
    event_id: event_id,
    event_href: `/smart-share-dashboard/${event_id}`,
    views: views.length,
  }));

  // records for per event

  // Records for a specific event
  const recordForPerEvent = (id: string) => {
    // for toggling the view of row on which we click
    setToggleRow(id == toggleRow ? null : id);
    // set the data of that clicked row
    setExpandedRowData(
      eventAccessData
        .filter(({ event_id }) => event_id == id)
        .flatMap(({ views }) => views)
    );
  };

  console.log("row ", expandedRowData);

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
            {tableRecord.length != 0 ? (
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
                      {" "}
                      <p className="inline-flex items-center justify-center ">
                        <SignalHigh className="size-6" />
                        <span className="-mb-2">{record.views}</span>
                      </p>
                    </TableCell>
                  </TableRow>

                  <AnimatePresence>
                    {toggleRow === record.event_id && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                      >
                        <TableCell
                          colSpan={3}
                          className="p-0 bg-card-foreground/5"
                        >
                          {/* Animated div inside TableCell */}
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4">
                              <VisitorsTable visitorsRecord={expandedRowData} />
                            </div>
                          </motion.div>
                        </TableCell>
                      </motion.tr>
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
                  No data avaliable
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
