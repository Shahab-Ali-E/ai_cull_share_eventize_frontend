import React from 'react';
import { Label } from '../../ui/label';
import Image from 'next/image';
import RevealYAxis from '../../slide-in-y-axis';
import { HowItWorksDataType } from '@/@types/Types';

function HowItWorks({data}:{data:HowItWorksDataType[]}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-20 sm:space-y-0">
      {data.map((data, index) => (
        <div key={index}>
            <RevealYAxis placeHolderColor='#ff4446'>
                {/* Image */}
                <div className="flex justify-center items-center">
                    <Image 
                    src={data.src} 
                    alt="Sign-up icon" 
                    height={200} 
                    width={200} 
                    />
                </div>
            </RevealYAxis>
            {/* Heading and description */}
            <div className="flex flex-col text-center space-y-5 max-w-xs">
                <RevealYAxis placeHolderColor='#ff4446'>
                    {/* Heading */}
                    <Label className="text-primary text-2xl font-bold">
                        {data.heading}
                    </Label>
                </RevealYAxis>
                <RevealYAxis placeHolderColor='#ff4446'>
                    {/* Description */}
                    <Label className="text-primary text-sm tracking-wide">
                        {data.description}
                    </Label>
                </RevealYAxis>
            </div>
        </div>
      ))}
    </div>
  );
}

export default HowItWorks;
