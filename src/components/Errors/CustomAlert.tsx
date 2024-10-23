import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { TbAlertHexagon  } from "react-icons/tb";

interface CustomAlertProps {
  isOpen: boolean;  // Control whether the alert is open
  onClose: () => void;
  title: string;  // Title for the alert (e.g., Error)
  description: string;  // Error message or description
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isOpen, onClose, title, description }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {/* Dialog Content */}
      <AlertDialogContent className='bg-primary-foreground max-w-xs sm:max-w-lg p-4 sm:p-6 rounded-2xl border-destructive'>
        <AlertDialogHeader>
          {/* Icon and Title */}
          <AlertDialogTitle className='flex items-center text-red-500 justify-center sm:justify-start'>
            <TbAlertHexagon  className='h-10 w-10' />
            <span className='ml-2 text-2xl font-bold'>{title}</span>
          </AlertDialogTitle>
          {/* Description */}
          <AlertDialogDescription className='text-destructive font-medium text-base mt-4'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer with only "Ok" button */}
        <AlertDialogFooter className='flex justify-center'>
          <AlertDialogAction
            onClick={onClose}
            className='bg-red-500 text-white hover:bg-destructive px-6 py-2 rounded-lg font-semibold'
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
