import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '../../ui/label';
import Image, { StaticImageData } from 'next/image';
import LeftSideImage from '@/images/EventArrangment/bgCarousalImage.png';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

function CarousalCard({heading, description, href, image}:{heading?:string, description:string, href:string, image:StaticImageData}) {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row items-stretch justify-center p-0 overflow-hidden h-[600px] 2xl:h-[400px]">
        {/* About Event with Overlay */}
        <div className="relative w-full sm:w-1/2">
          {/* Background Image */}
          <Image
            src={LeftSideImage}
            alt="LeftSideImage"
            className="object-cover h-full w-full rounded-s-sm opacity-50"
          />
          {/* Overlay Content */}
          <div className="absolute flex flex-col p-10 justify-center space-y-8 inset-0">
            {/* Heading */}
            <Label className="text-primary text-3xl sm:text-4xl font-bold">
              {heading}
            </Label>
            {/* Description */}
            <Label className="text-accent-foreground font-medium text-sm sm:text-base">
              {description}
            </Label>
            {/* See More Button */}
            <div>
              <Link 
                href={href}
                // variant="secondary"
                className='flex w-fit items-center bg-redishtext text-sm hover:bg-[#c33638] text-white p-3 px-3 sm:px-4 rounded-sm gap-x-2'
              >
                See more
                <IoIosArrowForward height={20} width={20} className='h-4 w-4'/> 
              </Link>
            </div>
          </div>
        </div>

        {/* Image of Event */}
        <div className="w-1/2 hidden sm:block">
          <Image
            src={image}
            alt="image"
            height={400}
            width={400}
            className="object-cover h-full w-full rounded-e-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CarousalCard;
