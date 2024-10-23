'use client';

import { LottieComponent } from '@/components/lazy-lottie-load';
import { 
  AlertDialog,
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CiWarning } from "react-icons/ci";

function UploadImagesToServerLoading({isOpen}:{isOpen:boolean}) {
  const client = new QueryClient();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className='bg-primary-foreground border border-card-foreground rounded-lg shadow-lg w-[25rem] sm:w-[40rem] max-w-none'>
        <AlertDialogHeader className='flex flex-row justify-between items-center p-4 w-full'>
          {/* Text section */}
          <div className='flex flex-col space-y-2'>
            <AlertDialogTitle className="text-base sm:text-xl font-bold text-primary">
              Upload in Progress
            </AlertDialogTitle>
            <AlertDialogDescription className='text-xs sm:text-sm text-muted-foreground'>
              Your images are being uploaded to the server. Please wait as the upload progresses based on your internet speed. Thank you for your patience.
            </AlertDialogDescription>
          </div>

          {/* Animation section */}
          <div className='flex items-center'>
            <QueryClientProvider client={client}>
              <LottieComponent  
                getAnimationData={()=>
                  import('../../../images/animated-icons/animation_2.json')
                }
                loop
                id="upload-animation"
                className="h-36 w-36 sm:h-48 sm:w-48"
              />
            </QueryClientProvider>
          </div>
        </AlertDialogHeader>

        {/* indeterminated progress bar */}
        <div className='w-full'>
          <Progress 
            className="w-full h-1 progress-infinite" 
            indeterminate={true}
          />
        </div>
        
        {/* Alert footer */}
        <AlertDialogFooter className='flex items-center'>
          {/* Warning message with icon */}
            <CiWarning className="w-5 h-5 text-yellow-500" />
            <p className="text-xs text-yellow-500">
              Please do not close or refresh this window until the upload is complete.
            </p>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UploadImagesToServerLoading;
