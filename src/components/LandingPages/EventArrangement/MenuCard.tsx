import Image from "next/image";
import Eyebrow from "./Eyebrow";
import GrainBackground from "@/images/EventArrangment/LandingPage/grain.jpg";
import SlideInFromBottom from "../SlideInFromBottom";
import { MenuCardDataType } from "@/@types/Types";
import { cn } from "@/lib/utils";
import BookEventButton from "./FlyingArrowLinkButton";
import { LuSparkle } from "react-icons/lu";

interface MenuCardProps extends MenuCardDataType {
  index: number;
}

function MenuCard({ index, heading, title, points, href, src }: MenuCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex items-start md:items-center flex-col justify-start md:justify-center",
        isEven
          ? "md:flex-row gap-14 md:gap-32"
          : "md:flex-row-reverse gap-14 md:gap-20"
      )}
    >
      {/* Text Content */}
      <div className="max-w-full md:max-w-md w-full md:w-2/3">
        <div className="space-y-3 flex flex-col items-center md:items-start justify-center md:justify-start">
          <SlideInFromBottom delay={0}>
            <Eyebrow
              heading={heading || "Menu"}
              description={title}
              descriptionClassName="text-2xl md:text-3xl"
              className="text-center md:text-start items-center md:items-start space-y-2 md:space-y-3"
            />
          </SlideInFromBottom>

          <ul className="text-primary space-y-2">
            {points.map((ele, index) => (
              <li key={index}>
                <SlideInFromBottom delay={0.2}>
                  <p className="flex gap-2 items-center">
                    <LuSparkle
                      className="h-3 w-3 text-[#81b1ff]"
                      fill="#81b1ff"
                    />
                    <span className="text-base">{ele}</span>
                  </p>
                </SlideInFromBottom>
              </li>
            ))}
          </ul>
          <div className="!mt-10 w-fit">
            <SlideInFromBottom delay={0.3}>
              <BookEventButton
                href={href}
                label="See more"
                className="py-5 text-sm font-medium"
                arrowSpanClassName="size-8 mr-1.5"
              />
            </SlideInFromBottom>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className=" h-full w-full md:w-2/5">
        <SlideInFromBottom delay={0}>
          <div
            className="relative h-[22rem] w-full rounded-lg overflow-hidden 
  bg-white dark:bg-[#14121C] outline outline-1 outline-gray-100/20 dark:outline-gray-300/15"
          >
            {/* Grain Texture Overlay */}
            <Image
              src={GrainBackground}
              alt="grain-Background"
              height={100}
              width={100}
              className="absolute object-cover top-0 left-0 w-full h-full z-10 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
              unoptimized
            />

            {/* Gradient Backdrop for Depth */}
            <div
              className="absolute inset-0 
    bg-gradient-to-bl from-indigo-200 via-[#dfd0fb] to-transparent opacity-60 
    dark:from-indigo-950 dark:via-[#201434] dark:via-30% dark:to-transparent dark:to-60%"
            ></div>

            {/* Food Image with Strong Shadow */}
            <div
              className={cn(
                "absolute flex bottom-0 w-4/5 h-4/5",
                isEven
                  ? "left-0"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              )}
            >
              <SlideInFromBottom delay={0.3} duration={1}>
                <Image
                  src={src}
                  alt="Menu Image"
                  width={300}
                  height={200}
                  className={cn(
                    "object-cover h-full w-full shadow-lg dark:shadow-2xl dark:shadow-card backdrop-blur-md",
                    isEven ? "rounded-tr-md" : "rounded-md"
                  )}
                />
              </SlideInFromBottom>
            </div>
          </div>
        </SlideInFromBottom>
      </div>
    </div>
  );
}

export default MenuCard;
