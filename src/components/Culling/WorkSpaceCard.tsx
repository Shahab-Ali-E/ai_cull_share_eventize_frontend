'use client'

import React from 'react';
import { Label } from '../ui/label';
import Link from 'next/link';
import { FcEmptyTrash } from 'react-icons/fc';
import WarningDialog from '../Errors/CustomWarning';


interface WorkspaceCardProps {
  workSpaceId: number;
  workspaceName: string;
  createdDate: string;
  size: number;
  initials: string;
  href: string;
  onDelete: (id: number) => void; // Add onDelete prop
}

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

const WorkspaceCard = ({ workSpaceId, workspaceName, createdDate, size, initials, href, onDelete }: WorkspaceCardProps) => {

  const handleDelete = () => {
    onDelete(workSpaceId);
  };

  return (
      <div className='flex flex-col rounded-lg bg-gray-200 dark:bg-primary-foreground shadow-lg shadow-card overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out'>
        {/* Workspace initials */}
          <Link href={href} passHref>
            <div className='w-full text-center bg-gradient-to-bl from-[#9b85e9] to-[#81f0e6] p-2 hover:cursor-pointer'>
                <Label className='text-white text-9xl font-bold opacity-90 hover:cursor-pointer'>{initials}</Label>
            </div>
          </Link>
        {/* Workspace details */}
        <div className='flex flex-row p-4'>
          <div className='flex flex-col w-1/2 space-y-2'>
            <Label className='text-primary text-2xl font-bold'>{workspaceName}</Label>
            <Label className='text-muted-foreground text-xs'>Size: {formatSize(size)}</Label>
          </div>
          <div className='flex flex-col items-end justify-between space-y-5 w-1/2'>
            <Label className='text-muted-foreground text-xs'>{createdDate}</Label>

            {/* Delete warning button with confirmation */}
            <WarningDialog
              triggerButton={
                <button className='text-primary' title='Delete workspace'>
                  <FcEmptyTrash className='h-7 w-7 hover:scale-125 transition-all ease-in-out duration-150' />
                </button>
              }
              message={`This action cannot be undone. This will permanently delete the workspace '${workspaceName}'.`}
              onCancel={() => console.log('Cancel clicked')}
              onConfirm={handleDelete}
            />
          </div>
        </div>
      </div>
  );
};

export default WorkspaceCard;
