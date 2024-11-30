"use client";

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import RevealYAxis from '@/components/slide-in-y-axis';
import { BirthdayEventCardProps } from '@/@types/Types';
import altImage from "@/images/EventArrangment/birthdayimages/birthday_1.jpg";

const BirthdayEventCard= ({data}:{data:BirthdayEventCardProps[]}) => { 

    return (
      <div className="flex flex-col px-10 sm:px-0 justify-center ">
        
        <div className='flex flex-col-reverse sm:flex-row gap-5 sm:gap-24'>
            {/* Left side card */}
            {/* 1st card */}
            <div className='flex flex-col space-y-10 w-full'>
                <RevealYAxis className="" placeHolderColor="#ff4446">
                <Card className="w-full">
                    <CardContent className="p-0 rounded-md overflow-hidden">
                    <CardHeader className="text-xl font-bold text-center sm:text-left bg-accent">
                        {data[0].heading}
                    </CardHeader>
                    <CardDescription className="space-y-5 p-6 ">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ul className="list-disc list-inside space-y-2">
                            {data[0].bullets?.map((item, index) => (
                            <li key={index} className="tracking-wider text-muted-foreground text-sm sm:text-base">{item}</li>
                            ))}
                        </ul>
                        </div>
                    </CardDescription>
                    </CardContent>
                </Card>
                </RevealYAxis>

                {/* 2nd card */}
                <RevealYAxis className="" placeHolderColor="#ff4446">
                <Card className="w-full">
                    <CardContent className="p-0 rounded-md overflow-hidden">
                    <CardHeader className="text-xl font-bold text-center sm:text-left bg-accent">
                        {data[1].heading}
                    </CardHeader>
                    <CardDescription className="space-y-5 p-6 text-sm sm:text-base">
                        {data[1].description}
                    </CardDescription>
                    </CardContent>
                </Card>
                </RevealYAxis>
            </div>
    
            {/* Right side card */}
            <div  className="flex flex-col justify-center w-full " >
                <RevealYAxis placeHolderColor="#ff4446">
                <Card className="w-full">
                    <CardContent className="overflow-hidden rounded-sm h-full w-full p-0">
                    <Image
                        src={data[0]?.src || altImage}
                        alt="image"
                        height={600}
                        width={600}
                        className="object-cover h-full w-full"
                        unoptimized
                    />
                    </CardContent>
                </Card>
                </RevealYAxis>
            </div>
        </div>
      </div>
    );
  };

export default BirthdayEventCard;
