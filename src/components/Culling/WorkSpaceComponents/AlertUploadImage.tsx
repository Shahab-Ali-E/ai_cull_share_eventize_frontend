import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface AlertUploadImageProps {
  isOpen: boolean;
  onPreview: () => void;
  onUploadToServer: () => void;
}

const AlertUploadImage: React.FC<AlertUploadImageProps> = ({
  isOpen,
  onPreview,
  onUploadToServer,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onPreview}>
      {/* Trigger Button for Opening Dialog */}

      {/* Dialog Content */}
      <AlertDialogContent className="bg-primary-foreground max-w-xs sm:max-w-sm rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <AlertDialogHeader className="flex flex-row bg-accent justify-between items-center px-6 py-3">
          <AlertDialogTitle className="text-lg font-semibold text-primary">
            Want to preview?
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Description */}
        <AlertDialogDescription className="text-sm text-muted-foreground px-6 py-2">
          Image acquired. Preview or upload for culling.
        </AlertDialogDescription>

        {/* Footer */}
        <AlertDialogFooter className="flex justify-end space-x-4 px-5 py-3">
          <AlertDialogCancel className="px-4 py-2 rounded-sm bg-accent text-primary hover:bg-card border hover:border-primary">
            Preview
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onUploadToServer}
            className="px-4 py-2 bg-accent text-primary rounded-sm hover:bg-card border hover:border-primary"
          >
            Upload
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertUploadImage;
