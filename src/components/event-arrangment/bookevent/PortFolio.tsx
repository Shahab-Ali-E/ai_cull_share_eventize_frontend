'use client'

import React from 'react';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '../../ui/responsive-modal';
import { Button } from '../../ui/button';
import Image, { StaticImageData } from 'next/image';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';

function PortFolio({
  buttonTitle,
  heading,
  imagesData,
  selectedPortfolio,
  setSelectedPortfolio
}: {
  buttonTitle: string;
  heading: string;
  imagesData: { name: string; path: StaticImageData }[];
  selectedPortfolio: string | null;
  setSelectedPortfolio: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-muted p-5 rounded-sm border border-muted-foreground text-primary"
        >
          {selectedPortfolio ? selectedPortfolio : buttonTitle}
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="min-w-fit bg-muted text-primary p-10">
        {/* Title */}
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="text-center text-3xl">
            {heading}
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>

        {/* Images */}
        <ResponsiveModalDescription className="grid grid-cols-2 gap-10">
          {imagesData?.map((data, index) => (
            <Label
              key={index}
              className={`h-fit w-fit relative cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out group ${
                selectedPortfolio === data.name ? 'border-4 border-primary rounded-2xl' : ''
              }`}
            >
              <Input
                type="radio"
                name="portfolio"
                value={data.name}
                className="hidden"
                onChange={() => setSelectedPortfolio(data.name)}
              />
              <Label className="absolute bottom-1/4 left-[10%] text-3xl font-bold text-white z-10 uppercase">
                {data.name}
              </Label>
              <Image
                src={data.path}
                alt={`${index}`}
                height={300}
                width={300}
                className={`object-cover rounded-xl h-64 w-64 transition-all duration-150 ease-in-out overflow-hidden ${
                  selectedPortfolio === data.name ? 'opacity-100' : 'opacity-60 group-hover:opacity-85'
                }`}
                unoptimized
              />
            </Label>
          ))}
        </ResponsiveModalDescription>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default PortFolio;
