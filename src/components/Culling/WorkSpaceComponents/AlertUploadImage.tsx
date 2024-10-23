import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
  } from '@/components/ui/alert-dialog';
  import React from 'react';
  
  interface AlertUploadImageProps {
    isOpen: boolean;
    onPreview: () => void;
    onUploadToServer: () => void;
  }
  
  function AlertUploadImage({ isOpen, onPreview, onUploadToServer }: AlertUploadImageProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onPreview}>
        <AlertDialogContent className='bg-card'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-primary'>Image Aquired Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your image has been aquired. You can either preview it or upload it for culling.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onPreview} className='bg-primary'>Preview</AlertDialogAction>
            <AlertDialogAction onClick={onUploadToServer} className='bg-primary'>Upload to Server</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  export default AlertUploadImage;
  