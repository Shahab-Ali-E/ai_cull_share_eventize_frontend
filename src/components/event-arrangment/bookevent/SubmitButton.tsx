'use client';
import { useFormStatus } from 'react-dom';
import { Spinner } from '../../ui/spinner';
import { Button } from '../../ui/button';
import { IoIosArrowForward } from 'react-icons/io';

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="mt-14 rounded-sm bg-headingtext hover:bg-teal-400 text-white lg:py-5 lg:text-xl flex items-center justify-center"
      type="submit"
    >
      <span className='text-base flex items-center'>
        {pending ? (
          <Spinner size="small" className="mr-2">Loading...</Spinner>
        ) : (
          <div className='flex items-center'>
            <span>{text}</span>
            <IoIosArrowForward className="h-4 w-4 ml-2" />
          </div>
        )}
      </span>
    </Button>
  );
}