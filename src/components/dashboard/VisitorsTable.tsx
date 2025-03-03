import { VisitorData } from "@/@types/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment } from "react";

export default function VisitorsTable({
  visitorsRecord,
}: {
  visitorsRecord: VisitorData[] | [];
}) {
  return (
    <Fragment>
      <Table>
        <TableHeader className="bg-card-foreground/10">
          <TableRow className="text-sm text-primary  border-none">
            <TableCell className="font-semibold py-5 rounded-s-sm px-4">
              Name
            </TableCell>
            <TableCell className="font-semibold px-4">Email</TableCell>
            <TableCell className="font-semibold px-4 rounded-e-sm">
              Accessd At
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitorsRecord.length != 0 ? (
            visitorsRecord.map((visitor) => (
              <TableRow key={visitor.user_id} >
                <TableCell className="px-2 py-2">
                  <div className="inline-flex items-center gap-2">
                    <div className="p-3 rounded-full bg-[#D7B2FD] dark:bg-[#3B0764]">
                      <p className="text-primary font-semibold text-sm">
                        {visitor.first_name.charAt(0).toUpperCase()}
                        {visitor.last_name.charAt(0).toUpperCase()}
                      </p>
                    </div>
                    <span>
                      {visitor.first_name} {visitor.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{visitor.email}</TableCell>
                <TableCell>
                  {new Date(visitor.accessed_at).toLocaleString("en-US", {
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
                No data avaliable
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
}
