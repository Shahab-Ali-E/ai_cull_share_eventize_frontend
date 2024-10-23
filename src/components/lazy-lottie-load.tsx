import { useQuery } from '@tanstack/react-query';
import { LottieComponentProps } from 'lottie-react';
import Lottie from 'lottie-react';
import { Skeleton } from './ui/skeleton';

interface LottieProps<T extends Record<string, unknown>> {
  getAnimationData: () => Promise<T>;
  id: string;
}

export function LottieComponent<T extends Record<string, unknown>>({
  getAnimationData,
  id,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: getAnimationData,
    enabled: typeof window !== 'undefined',
  });

  if (!data){
    return(
      <Skeleton className='h-32 w-32 rounded-full border-2'/>
    )
  } 
  return <Lottie animationData={data} {...props} />;
}
