"use client";

import React from "react";
import Link from "next/link";
import { FcEmptyTrash } from "react-icons/fc";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming you're using `shadcn` components
import CustomPopupDialog from "../custom-popup-dialog";
import { DeleteWorkSpace } from "@/lib/actions/Culling/DeleteWorkSpace";
import { Button } from "@/components/ui/button";
import { MultipleWorkspaceDataInterface } from "@/@types/smart-culling";

// Function to convert size from bytes to MB or GB
const formatSize = (sizeInBytes: number) => {
  const sizeInMB = sizeInBytes / (1024 * 1024);
  if (sizeInMB < 1023) {
    return `${sizeInMB.toFixed(2)} MB`;
  } else {
    const sizeInGB = sizeInMB / 1024;
    return `${sizeInGB.toFixed(2)} GB`;
  }
};

const WorkspaceTable = ({
  workspaces,
}: {
  workspaces: MultipleWorkspaceDataInterface[];
}) => {
  return (
      <Table>
        <TableHeader>
          <TableRow className="text-sm text-muted-foreground border-gray-500">
            <TableCell className="font-semibold">Workspace Name</TableCell>
            <TableCell className="font-semibold">Created Date</TableCell>
            <TableCell className="font-semibold">Size</TableCell>
            <TableCell className="font-semibold">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((workspace, index) => (
            <TableRow key={index} className="text-primary text-xs border-muted-foreground hover:bg-primary-foreground">
              {/* Workspace Name */}
              <TableCell>
                <Link href={`/culling-dashboard/${workspace.id}`}>
                  <Button variant="link">{workspace.name}</Button>
                </Link>
              </TableCell>

              {/* Created Date */}
              <TableCell>
                {workspace.created_at.split("T")[0]}
              </TableCell>

              {/* Size */}
              <TableCell>{formatSize(workspace.total_size)}</TableCell>

              {/* Actions */}
              <TableCell>
                <CustomPopupDialog
                  triggerButton={
                    <button title="Delete workspace">
                      <FcEmptyTrash className="h-5 w-5" />
                    </button>
                  }
                  message={`This can't be undone`}
                  title={"Delete workspace?"}
                  onConfirm={() =>
                    DeleteWorkSpace({ workSpaceName: workspace.name })
                  }
                  loadingText="Deleting..."
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default WorkspaceTable;
