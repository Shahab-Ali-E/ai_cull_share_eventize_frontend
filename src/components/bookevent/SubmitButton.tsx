'use client';
import { useFormStatus } from 'react-dom';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';

interface SubmitButtonProps {
  text: string;
}
export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="mt-10 rounded-sm bg-[#8c53fe] hover:bg-[#834bf4] text-primary lg:py-5 lg:text-xl"
      type="submit"
    >
        <span className='text-base'>
            {pending ?<Spinner size="small">Loading...</Spinner> : text}
        </span>
    </Button>
  );
}
