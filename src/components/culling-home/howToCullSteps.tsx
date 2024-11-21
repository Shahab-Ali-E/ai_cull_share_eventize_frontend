import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import yellow_under_lines from '@/images/icons/Yellow_under_line.png';
import { cullingStepsDataProps } from '@/utils/howToStartCullingGuide';
import RevealXAxis from '../slide-in-x-axis';

interface HowToCullStepsProps extends cullingStepsDataProps {
  index: number;
}

const HowToCullSteps = ({ title, steps, gif, index }: HowToCullStepsProps) => {
  // Check if index is even or odd
  const isEven = index % 2 === 0;

  return (
    <section
      className={`mb-8 sm:mb-14 ${
        isEven ? 'lg:flex-row-reverse lg:gap-36' : ''
      } flex flex-col-reverse lg:flex-row items-center lg:items-start`}
    >
      {/* Steps */}
      <RevealXAxis
        className="flex flex-col space-y-5 w-full lg:w-1/2 mt-10 lg:mt-0"
        direction={isEven ? 'right':"left"} // Always reveal from right for all steps in small devices
      >
        <div className={`flex flex-col h-full justify-center`}>
          {/* Heading */}
          <div className="flex flex-col w-fit">
            <Label className="text-2xl sm:text-4xl font-semibold group">
              {title}
            </Label>
            <Image src={yellow_under_lines} alt="underline image" className="w-32 sm:w-48" />
          </div>
          {/* Bullets */}
          <Label className="text-base sm:text-xl mt-4 sm:mt-8">
            Follow these steps to {title.toLowerCase()}:
          </Label>
          <ul className="list-disc ml-5 text-base sm:text-xl space-y-4 pt-2 tracking-wider list-inside">
            {steps.map((step, stepIndex) => (
              <li key={stepIndex}>{step}</li>
            ))}
          </ul>
        </div>
      </RevealXAxis>

      {/* GIF */}
      <RevealXAxis
        className="flex flex-col w-full lg:w-1/2"
        direction={isEven ? 'left':"right"} // Always reveal GIF from left for small devices
      >
        <div className="flex flex-col w-full items-center">
          <Image src={gif} alt={`how to ${title.toLowerCase()} gif`} className='h-56 w-56 sm:h-auto sm:w-auto' />
        </div>
      </RevealXAxis>
    </section>
  );
};

export default HowToCullSteps;
