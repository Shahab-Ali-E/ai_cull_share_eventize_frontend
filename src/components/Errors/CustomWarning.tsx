import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { LuAlertTriangle } from "react-icons/lu";

interface WarningDialogProps {
  triggerButton: React.ReactNode;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const WarningDialog: React.FC<WarningDialogProps> = ({ triggerButton, message, onCancel, onConfirm }) => {
  return (
    <AlertDialog>
      {/* Trigger the dialog with the provided button */}
      <AlertDialogTrigger asChild>
        {triggerButton}
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent className='bg-primary-foreground max-w-xs sm:max-w-lg p-4 sm:p-6 rounded-2xl'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center text-yellow-500 justify-center sm:justify-start'>
            <LuAlertTriangle className='h-7 w-7' />
            <span className='ml-4 text-xl'>Warning</span>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-primary text-base'>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className='bg-gray-500 hover:bg-gray-700 hover:text-white text-white rounded-lg px-4 py-2'
            onClick={onCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className='bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg px-7 py-2'
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WarningDialog;
