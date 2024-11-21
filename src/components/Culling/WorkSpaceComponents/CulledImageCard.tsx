import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import React from 'react';

function CulledImageCard({ title, Image, href }: { title: string, Image: React.ReactNode, href:string }) {
  return (
    <div className="flex flex-col rounded-full bg-card shadow-card shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out w-48 h-48 sm:w-72 sm:h-72 text-primary">
      {/* Workspace image */}
      <Link href={href} passHref>
        <div className="relative w-full h-28 sm:h-48 overflow-hidden">
          {Image}
        </div>
      </Link>

      {/* Workspace details */}
      <div className="flex p-4 bg-card h-full items-center justify-center text-center">
        <Label className="text-sm sm:text-lg font-semibold mt-1">{title}</Label>
      </div>
    </div>
  );
}

export default CulledImageCard;
