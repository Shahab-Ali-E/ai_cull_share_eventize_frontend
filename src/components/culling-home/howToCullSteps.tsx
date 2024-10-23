import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import yellow_under_lines from '@/images/icons/Yellow_under_line.png'
import { cullingStepsDataProps } from '@/utils/howToStartCullingGuide';
import RevealXAxis from '../slide-in-x-axis';

interface HowToCullStepsProps extends cullingStepsDataProps {
    index: number; 
}


const HowToCullSteps = ({ title, steps, gif, index }:HowToCullStepsProps) => {
    // Check if index is even or odd
    const isEven = index % 2 === 0;
    return (
        <section className={`flex flex-row mb-14 ${isEven ? 'flex-row-reverse gap-36' : ''}`}>
            {/* Steps */}
            <RevealXAxis className='flex flex-col space-y-5 w-1/2' direction={isEven ? 'right' : 'left'}>
                <div className={`flex flex-col h-full justify-center`}>
                    {/* Heading */}
                    <div className='flex flex-col w-fit'>
                        <Label className='text-4xl font-semibold group'>{title}</Label>
                        <Image src={yellow_under_lines} alt='underline image' className='w-48' />
                    </div>
                    {/* Bullets */}
                    <Label className='text-xl mt-8'>Follow these steps to {title.toLowerCase()}:</Label>
                    <ul className='list-disc ml-5 text-xl space-y-4 pt-2 tracking-wider list-inside'>
                        {steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                        ))}
                    </ul>
                </div>
            </RevealXAxis>

            {/* gif */}
            <RevealXAxis className='flex flex-col w-1/2' direction={isEven ? 'left' : 'right'}>
                <div className='flex flex-col w-full items-center'>
                <Image src={gif} alt={`how to ${title.toLowerCase()} gif`} />
                </div>
            </RevealXAxis>
        </section>
    );
};

export default HowToCullSteps;
