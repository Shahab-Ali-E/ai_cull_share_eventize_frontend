import { Label } from '@/components/ui/label';
import React from 'react';

import '@/app/globals.css';


function ImageBlendHeading({firstLetter, secondLetter, thirdLetter}:{firstLetter:string, secondLetter:string, thirdLetter:string}) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-primary">
      {/* main heading */}
      <Label className="flex items-center text-3xl sm:text-8xl font-bold font-SpeedeeBold uppercase tracking-wide">
        <span>{firstLetter}</span>
        <span
          className="font-SpeedeeBold text-5xl sm:text-9xl inline-block scale-y-150 p-2 bg-clip-text text-transparent"
          style={{
            backgroundImage: "url('/images/contenetalFood.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {secondLetter}
        </span>
        <span>{thirdLetter}</span>
      </Label>
    </div>
  );
}

export default ImageBlendHeading;
