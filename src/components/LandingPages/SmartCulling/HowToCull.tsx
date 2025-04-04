import SlideInFromBottom from "../SlideInFromBottom";
import { cn } from "@/lib/utils";
import { LuSparkle } from "react-icons/lu";


interface HowToCullProps {
  index: number;
  heading: string;
  description?: string;
  points: string[];
  videoSrc: string;
}

function HowToCull({ index, heading, videoSrc, points }: HowToCullProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex items-start md:items-center flex-col justify-start md:justify-center",
        isEven
          ? "md:flex-row gap-14 md:gap-32"
          : "md:flex-row-reverse gap-14 md:gap-28"
      )}
    >
      {/* Text Content */}
      <div className="max-w-full md:max-w-md w-full md:w-1/2">
        <div className="space-y-3 flex flex-col font-inter items-center md:items-start justify-center md:justify-start">
          <SlideInFromBottom delay={0.1}>
            <h2 className="text-2xl text-start md:text-3xl text-primary dark:text-[#DEDFEE] font-bold">{heading}</h2>
          </SlideInFromBottom>

          <ul className="text-primary space-y-3">
            {points.map((ele, index) => (
              <li key={index}>
                <SlideInFromBottom delay={0.2}>
                  <p className="flex gap-2 items-center">
                    <LuSparkle
                      className="h-3 w-3 text-[#81b1ff]"
                      fill="#81b1ff"
                    />
                    <span className="text-sm md:text-lg text-muted-foreground">{ele}</span>
                  </p>
                </SlideInFromBottom>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video card */}
      <div className="h-full w-full md:w-[37%] px-10 md:px-0">
        <SlideInFromBottom delay={0.5} duration={0.8}>
          <div
            className="relative h-[36rem] w-full rounded-3xl overflow-hidden p-3 border border-muted-foreground/15
  bg-white dark:bg-[#14121C] outline outline-1 outline-gray-100/20 dark:outline-gray-300/15"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-transparent blur-3xl"></div>
            <video
              src={videoSrc}
              controls 
              autoPlay
              loop
              muted
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        </SlideInFromBottom>
      </div>
    </div>
  );
}

export default HowToCull;
