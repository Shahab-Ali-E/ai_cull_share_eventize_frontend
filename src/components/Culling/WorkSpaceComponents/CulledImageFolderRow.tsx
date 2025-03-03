import { Label } from '@/components/ui/label';
import { TableCell, TableRow } from '@/components/ui/table';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function CulledImageFolderRow({ title, href }: { title: string; href: string }) {
  return (
    <TableRow className="hover:bg-primary-foreground transition-colors border-gray-500">
      <TableCell className="py-4 px-6 cursor-pointer">
        <Link href={href} passHref >
          <Label className="flex items-center space-x-4 text-primary w-fit cursor-pointer">
            <Folder className="text-sidebar-activetab w-6 h-6" />
            <span className="font-medium text-sm">{title}</span>
          </Label>
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default CulledImageFolderRow;
