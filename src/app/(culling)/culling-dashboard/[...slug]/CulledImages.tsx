import CulledImageRow from '@/components/Culling/WorkSpaceComponents/CulledImageRow';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'; // Assuming you’re using `shadcn` components
import React from 'react';

function CulledImages({ workSpaceId }: { workSpaceId: string }) {
  const folders = [
    { title: 'Blur Images', href: `/culling-dashboard/${workSpaceId}/Blur` },
    { title: 'Closed Eye Images', href: `/culling-dashboard/${workSpaceId}/ClosedEye` },
    { title: 'Duplicate Images', href: `/culling-dashboard/${workSpaceId}/Duplicate` },
    { title: 'Fine Collection', href: `/culling-dashboard/${workSpaceId}/FineCollection` },
  ];

  return (
    <div className="min-h-screen">
      <Table>
        <TableHeader>
          <TableRow className="text-lg text-primary">
            <TableCell className="font-semibold px-7">Folder</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder, idx) => (
            <CulledImageRow key={idx} title={folder.title} href={folder.href} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CulledImages;
