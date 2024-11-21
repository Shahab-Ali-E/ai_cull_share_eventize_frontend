'use client';

import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from "react-icons/io5";

function WorkSpaceAfterCullHeader({heading }: {heading: string }) {
    const getHeadingByStatus = (status: string) => {
        switch (status) {
          case "Blur":
            return "Blur Images";
          case "ClosedEye":
            return "Closed Eye Images";
          case "Duplicate":
            return "Duplicate Images";
          case "FineCollection":
            return "Fine Collection";
          default:
            return "Images";
        }
    };
      
    const router = useRouter()
  
  return (
    <div className="relative">

      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <Button onClick={() => { router.back() }} variant='link'>
            <IoChevronBack className='text-primary font-extrabold h-5 w-5 xl:h-8 xl:w-8 lg:h-8 lg:w-8 md:h-5 md:w-5' />
          </Button>
          <Label className='font-bold text-primary text-lg xl:text-4xl lg:text-4xl md:text-2xl'>{getHeadingByStatus(heading)}</Label>
        </div>

        <div className='flex items-center space-x-5 pr-5'>
            <GradientButton 
              className='xl:w-48 lg:w-44 md:w-40'
              onClick={() =>{console.log("download")}}
            >
              Download
            </GradientButton>

        </div>
      </div>
    </div>
  );
}

export default WorkSpaceAfterCullHeader;
