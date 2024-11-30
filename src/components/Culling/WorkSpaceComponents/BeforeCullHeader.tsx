'use client';

import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { StartCulling } from '@/lib/actions/StartCulling';
import useCullingStore from '@/zustand/CullingStore';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { GET_TASK_STATUS } from '@/constants/ApiUrls';
import { getTaskUpdateInterface } from '@/utils/Types';
import { Spinner } from '@/components/ui/spinner';

function WorkSpaceBeforeCullHeader({showCullingButton }: {showCullingButton: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const [taskId, setTaskId] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { files, uploadedImagesS3Urls, isImagesUploading, handleUploadImages, setCullingTaskIds, currentActiveWorkSpaceData } = useCullingStore();

  const filesPresentNoUrls = files.length > 0 && uploadedImagesS3Urls?.length === 0;

  console.log("show culling button",showCullingButton)

  // for getting all 4 task id's from the id which we will get culling was started
  useEffect(() => {
    if (taskId) {
      const fetchData = async () => {
        try {
          setLoading(true);  // Start loading when fetching data
          await fetchEventSource(`${GET_TASK_STATUS}/${taskId}`, {
            onmessage(ev) {
              try {
                const parsedData:getTaskUpdateInterface = JSON.parse(ev.data);
                if (parsedData?.result?.task_ids) {
                  const extractedIds = parsedData.result.task_ids;
                  setCullingTaskIds({ workSpaceId: currentActiveWorkSpaceData.id, ids: extractedIds });
                  setLoading(false);
                  router.refresh()
                }
                // Process other states...
              } catch (error) {
                console.error("Error parsing task status:", error);
              }
            },
            onerror(err) {
              console.error('Error fetching event source:', err);
              toast({
                title: 'Failed to start culling',
                description: 'An error occurred while fetching task updates.',
                variant: 'destructive',
              });
            },
          });
        } catch (error) {
          console.error('Error in fetchData:', error);
          toast({
            title: 'Network Error',
            description: 'Unable to start monitoring task status.',
            variant: 'destructive',
          });
        } finally {
          setLoading(false); 
        }
      };
      fetchData();
    }
    
  }, [taskId, currentActiveWorkSpaceData.id, setCullingTaskIds]);

  // for handling uploading images
  const handleUploadImagesToServer = ()=>{
    handleUploadImages({workSpaceId:currentActiveWorkSpaceData.id });
    router.refresh();
  }
  
  // For starting culling
  const handleStartCulling = async () => {
    const imagesUrls = uploadedImagesS3Urls.map((ele) => ele);
  
    try {
      setLoading(true); // Start loading when culling starts
      const { data, error } = await StartCulling({
        workSpaceId: currentActiveWorkSpaceData.id,
        imagesUrl: imagesUrls,
      });
  
      if (error) {
        const errorMessage = Array.isArray(error)
          ? error.map((ele) => ele.msg).join(", ")
          : "Refresh the page, these image links have expired";
  
        toast({
          title: "Server Error",
          description: errorMessage,
          variant: "destructive",
        });
        console.error("Error from backend:", error);
        setLoading(false);
        return;
      }
  
      if (data && data.task_id) {
        setTaskId(data.task_id);
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: String(error),
        variant: "destructive",
      });
      console.error("Network error:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };
  
  
  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner size="large" />
        </div>
      )}

      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <Button onClick={() => { router.back() }} variant='link'>
            <IoChevronBack className='text-primary font-extrabold h-5 w-5 xl:h-8 xl:w-8 lg:h-8 lg:w-8 md:h-5 md:w-5' />
          </Button>
          <Label className='font-bold text-primary text-lg xl:text-4xl lg:text-4xl md:text-2xl'>{currentActiveWorkSpaceData.name}</Label>
        </div>

        <div className='flex items-center space-x-5 pr-5'>
          {filesPresentNoUrls && (
            <GradientButton 
              className='xl:w-48 lg:w-44 md:w-40'
              onClick={() =>handleUploadImagesToServer() }
            >
              {isImagesUploading ? 'Uploading...' : 'Upload Images'}
            </GradientButton>
          )}

          {showCullingButton && (
            <GradientButton 
              className='xl:w-48 lg:w-44 md:w-40'
              onClick={() => handleStartCulling()}
            >
              Start Culling
            </GradientButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceBeforeCullHeader;
