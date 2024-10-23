'use client';

import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { Label } from '@/components/ui/label';
import useCullingStore from '@/zustand/CullingStore';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from "react-icons/io5";

function WorkSpaceHeader({ label, showCullingButton }: { label: string, showCullingButton: boolean }) {
  const router = useRouter();

  // Zustand store
  const { files, uploadedImagesS3Urls, isImagesUploading, handleUploadImages } = useCullingStore();

  // Check conditions
  const filesPresentNoUrls = files.length > 0 && uploadedImagesS3Urls.length === 0;
  const noFilesUrlsPresent = files.length === 0 && uploadedImagesS3Urls.length > 0;

  return (
    <div className='flex items-center justify-between p-4 border-b border-primary'>

      {/* Label of the workspace and back button */}
      <div className='flex items-center'>
        <Button onClick={() => { router.push('/culling-dashboard') }} variant='link'>
          <IoChevronBack className='text-primary font-extrabold h-5 w-5 xl:h-8 xl:w-8 lg:h-8 lg:w-8 md:h-5 md:w-5' />
        </Button>
        <Label className='font-bold text-primary text-lg xl:text-4xl lg:text-4xl md:text-2xl'>{label}</Label>
      </div>

      {/* Buttons based on state */}
      <div className='flex items-center space-x-5 pr-5'>
        {/* Render buttons based on Zustand state or explicitly based on the prop */}
        {filesPresentNoUrls && (
          <GradientButton 
            className='xl:w-48 lg:w-44 md:w-40'
            onClick={()=>handleUploadImages({workSpaceName:label})}
            >
           {isImagesUploading ? 'Uploading...':'Upload Images'}
          </GradientButton>
        )}

        {/* Ensure that Start Culling button shows either if there are URLs or the prop is true */}
        {(noFilesUrlsPresent || showCullingButton) && (
          <GradientButton className='xl:w-48 lg:w-44 md:w-40'>
            Start Culling
          </GradientButton>
        )}
      </div>
    </div>
  );
}

export default WorkSpaceHeader;
