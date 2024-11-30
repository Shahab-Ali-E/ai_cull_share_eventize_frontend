"use client";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BaseDataType } from "@/@types/Types";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import Autoplay from 'embla-carousel-autoplay'

const CullingSlider = ({ images }: { images: BaseDataType[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay({ delay: 2000 })]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row-reverse sm:justify-center">
      
      {/* Slider and its Buttons */}
      <div className="embla flex-1 sm:mt-0 mt-10 sm:pl-24" ref={emblaRef}>
        <div className="embla__container flex-row items-center max-w-sm sm:max-w-md max-h-56 xl:max-w-xl xl:max-h-max lg:max-w-lg lg:max-h-80 md:max-w-lg md:max-h-96">
          {images.map((ele, index) => (
            <div
              className={`embla__slide flex flex-col text-center overflow-hidden transition-transform duration-500 ease-in-out transform rounded-2xl ${
                currentSlide === index
                  ? "opacity-100 z-20" // Active slide
                  : currentSlide === index - 1
                  ? "-translate-x-1/3 -rotate-3 z-10 opacity-70" // Left slide
                  : currentSlide === index + 1
                  ? "translate-x-1/3 rotate-3 z-10 opacity-70" // Right slide
                  : "translate-x-1/2 z-0 opacity-0" // Farthest slide
              }`}
              key={index}
            >
              <Image src={ele.src} alt={`Slide ${index + 1}`}/>
              <p className="block mt-10 font-bold text-xl xl:hidden lg:hidden md:hidden">
                {currentSlide === index ? ele.description : ""}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons for Slider */}
        <div className="flex flex-row justify-center gap-10 mt-4 sm:mt-6">
          <button onClick={scrollPrev} disabled={currentSlide === 0}>
            <IconContext.Provider
              value={{
                className:
                  "rounded-full bg-gradient-to-r from-[#50B2B5] from-33% via-[#235172] via-33% to-[#af7fe2] to-33% border-4 border-transparent bg-clip-border",
              }}
            >
              <FaArrowCircleLeft
                size={45}
                className={`hover:opacity-85 transition-all duration-200 ease-in-out ${
                  currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </IconContext.Provider>
          </button>
          <button onClick={scrollNext} disabled={currentSlide === images.length - 1}>
            <IconContext.Provider
              value={{
                className:
                  "rounded-full bg-gradient-to-r from-[#50B2B5] from-33% via-[#235172] via-33% to-[#af7fe2] to-33% border-4 border-transparent bg-clip-border",
              }}
            >
              <FaArrowCircleRight
                size={45}
                className={`hover:opacity-85 transition-all duration-200 ease-in-out ${
                  currentSlide === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </IconContext.Provider>
          </button>
        </div>
      </div>

      {/* Vertical Line for larger devices */}
      <div className="w-px xl:h-[40rem] lg:h-[35rem] md:h-[16rem] bg-gradient-to-b from-black via-white via-50% to-black mx-10 hidden sm:block"></div>

      {/* Slider Description for larger devices */}
      <div className="hidden sm:flex flex-col xl:space-y-24 lg:space-y-14 md:space-y-8 xl:w-[380px] lg:w-[250px] md:w-[200px]">
        {images.map((ele, index) => (
          <div key={index} className="flex flex-row justify-end mb-2">
            <button
              onClick={() => scrollTo(index)}
              className={`whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ease-in-out ${
                currentSlide === index
                  ? "text-xl xl:text-2xl lg:text-xl md:text-sm font-bold"
                  : "text-base xl:text-xl lg:text-lg md:text-xs opacity-50 font-light"
              }`}
            >
              {ele.description}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CullingSlider;
