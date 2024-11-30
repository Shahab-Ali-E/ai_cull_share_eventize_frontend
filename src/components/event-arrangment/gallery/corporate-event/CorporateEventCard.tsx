"use client";

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RevealYAxis from '@/components/slide-in-y-axis';
import { CorporateEventCardProps } from '@/@types/Types';

const CorporateEventCard: React.FC<CorporateEventCardProps> = ({ heading, description, src }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true); // Set to true after the initial render
    }, []);
  
    if (!isClient) return null; // Render nothing initially on the server
  
    // Calculate how many items should be in each column
    const midIndex = Math.ceil(description.length / 2);
    const firstHalf = description.slice(0, midIndex);
    const secondHalf = description.slice(midIndex);
  
    return (
      <div className="flex flex-col-reverse px-10 sm:px-0 justify-center sm:flex-row gap-5 sm:gap-9">
        {/* Left side card */}
        <RevealYAxis className="flex w-full sm:w-1/3" placeHolderColor="#ff4446">
          <Card className="w-full">
            <CardContent className="p-0 rounded-md overflow-hidden">
              <CardHeader className="text-xl font-bold text-center sm:text-left bg-accent">
                {heading}
              </CardHeader>
              <CardDescription className="space-y-5 p-5 mt-4">
                <Label className="text-lg font-semibold">Services</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2">
                    {firstHalf.map((item, index) => (
                      <li key={index} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
  
                  <ul className="list-disc list-inside space-y-2">
                    {secondHalf.map((item, index) => (
                      <li key={index} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </RevealYAxis>
  
        {/* Right side card */}
        <RevealYAxis className="flex w-full sm:w-1/2" placeHolderColor="#ff4446">
          <Card className="w-full">
            <CardContent className="overflow-hidden rounded-sm h-full w-full p-0">
              <Image
                src={src}
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
    );
  };

export default CorporateEventCard;
