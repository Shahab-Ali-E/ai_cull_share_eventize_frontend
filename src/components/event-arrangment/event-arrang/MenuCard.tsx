import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import RevealXAxis from '../../slide-in-x-axis';
import { MenuCardDataType } from '@/@types/Types';


interface MenuCardProps extends MenuCardDataType{
  index: number;
}

const MenuCard = ({ heading, description, href, src, index }: MenuCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col sm:flex-row gap-y-2 sm:gap-y-5 sm:gap-x-12 ${
        isEven ? 'sm:flex-row-reverse' : ''
      }`}
    >
      {/* Dish Information */}
      <RevealXAxis
        className="flex flex-col w-full sm:w-1/2 overflow-hidden"
        direction={isEven ? 'right' : 'left'}
      >
        <Card className="h-full">
          <CardContent className="flex flex-col h-full p-6 sm:p-10 justify-between">
            {/* Heading */}
            <Label className="text-primary text-2xl sm:text-4xl font-bold">
              {heading}
            </Label>
            {/* Description */}
            <Label className="text-accent-foreground font-medium text-sm sm:text-base mt-4">
              {description}
            </Label>
            {/* View Now Button */}
            <div className="mt-6">
              <Link
                href={href}
                className="flex w-fit items-center bg-[#ff4446] hover:bg-[#c33638] p-3 px-4 rounded-sm gap-x-2"
              >
                See more
                <IoIosArrowForward height={20} width={20} className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </RevealXAxis>

      {/* Dish Image */}
      <RevealXAxis
        className="flex w-full sm:w-1/2 overflow-hidden"
        direction={isEven ? 'left' : 'right'}
      >
        <Card className='h-full w-full'>
          <CardContent className="overflow-hidden rounded-sm h-full w-full p-0">
            <Image
              src={src}
              alt={`${heading} image`}
              height={600}
              width={600}
              className="object-cover h-full w-full"
            />
          </CardContent>
        </Card>
      </RevealXAxis>
    </div>
  );
};

export default MenuCard;
