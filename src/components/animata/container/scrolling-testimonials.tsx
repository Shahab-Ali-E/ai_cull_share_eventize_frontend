import Marquee from "@/components/animata/container/marquee";
import Image from "next/image";

export interface Testimonial {
  name: string;
  image: string;
  description: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

function TestimonialCard({
  testimonial: { image, name, description },
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className="flex h-44 w-80 sm:w-64 sm:h-auto sm:flex-col overflow-hidden rounded-xl border bg-background dark:border-zinc-700"
      key={name}
    >
      <div className="relative h-full w-32 flex-shrink-0 overflow-hidden sm:w-full sm:h-40">
        <image src={image} alt={name} width={100} height={100} className="h-full w-full object-cover" />
      </div>
      <div className="px-4 py-2 sm:p-4 sm:text-center">
        <span className="block text-lg font-bold text-foreground sm:text-base">
          {name}
        </span>
        <span className="-mt-1 mb-1 block text-sm font-medium leading-loose text-muted-foreground sm:text-xs">
          Founder of BAC
        </span>
        <span className="block text-sm text-foreground sm:text-xs">
          {description} 
        </span>
      </div>
    </div>
  );
}

export default function ScrollingTestimonials({ data }: TestimonialProps) {
  return (
    <div className="w-full">
      <Marquee className="[--duration:25s]" pauseOnHover applyMask={false}>
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </Marquee>

      <Marquee
        reverse
        className="[--duration:25s]"
        pauseOnHover
        applyMask={false}
      >
        {data.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </Marquee>
    </div>
  );
}
