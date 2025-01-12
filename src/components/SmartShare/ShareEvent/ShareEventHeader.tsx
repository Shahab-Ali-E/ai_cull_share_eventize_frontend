'use client';

import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from "react-icons/io5";

function ShareEventHeader({eventName}:{eventName:string}) {
    const router = useRouter()
  
  return (
    <div className="relative shadow-md shadow-card p-2">

      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <Button onClick={() => { router.back() }} variant='link'>
            <IoChevronBack className='text-primary font-extrabold h-5 w-5 xl:h-8 xl:w-8 lg:h-8 lg:w-8 md:h-5 md:w-5' />
          </Button>
          <Label className='font-bold text-primary text-lg xl:text-4xl lg:text-4xl md:text-2xl'>{eventName}</Label>
        </div>

        <div className='flex items-center space-x-5 pr-5'>
            <GradientButton 
              className='xl:w-48 lg:w-44 md:w-40 rounded-sm'
              onClick={() => console.log("sharing event")}
            >
              Publish Event
            </GradientButton>
        </div>
      </div>
    </div>
  );
}

export default ShareEventHeader;
