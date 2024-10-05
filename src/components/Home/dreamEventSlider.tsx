"use client";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { sliderImages } from "@/utils/sliderImages";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import Autoplay from 'embla-carousel-autoplay'

const DreamEventSlider = ({ images }: { images: sliderImages[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({},[Autoplay({delay:2000})]);
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
    <div className="flex flex-col xl:flex-row-reverse lg:flex-row-reverse md:flex-row-reverse">

      {/* Slider and its Buttons */}
      <div className="embla flex-row p-5 flex-1 sm:order-first" ref={emblaRef}>
        <div className="embla__container flex-row max-w-md max-h-56 xl:max-w-xl xl:max-h-max lg:max-w-lg lg:max-h-80 md:max-w-md md:max-h-72">
          {images.map((ele, index) => (
            // Image Slider
            <div
              className={`embla__slide flex flex-col text-center max-w-64 xl:max-w-sm lg:max-w-sm md:max-w-xs overflow-hidden transition-transform duration-500 ease-in-out transform rounded-2xl ${
                currentSlide === index
                  ? "scale-100 opacity-100 z-20" 
                  : "scale-y-75 opacity-60 -z-10"
              }`}
              key={index}
            >
              <Image
                src={ele.src}
                alt={`Slide ${index + 1}`}
                width={256}
                height={256}
                className="object-cover"
              />

              <p className="block mt-10 font-bold text-xl xl:hidden lg:hidden md:hidden">{currentSlide === index ? ele.description :""}</p>
            </div>
          ))}
        </div>
  
        {/* Buttons for Slider */}
        <div className="flex flex-row justify-center gap-14 mt-4">
          <button onClick={scrollPrev} disabled={currentSlide === 0}>
            <IconContext.Provider
              value={{
                className:
                  "rounded-full bg-gradient-to-r from-[#50B2B5] from-33% via-[#235172] via-33% to-[#af7fe2] to-33% border-4 border-transparent bg-clip-border",
              }}
            >
              <FaArrowCircleLeft
                size={45}
                className={`hover:h-12 hover:w-12 transition-all duration-200 ease-in-out ${
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
                className={`hover:h-12 hover:w-12 transition-all duration-200 ease-in-out ${
                  currentSlide === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </IconContext.Provider>
          </button>
        </div>
      </div>

      {/* Vertical Line for other than small devices*/}
      <div className="w-px bg-gradient-to-b from-black via-white via-50% to-black h-auto mx-10 hidden sm:block"></div>
      
      {/* Slider Description for all devices othet then mobile*/}
      <div className="p-4 invisible flex flex-col place-content-evenly xl:visible xl:w-[380px] lg:w-[380px] lg:visible md:w-[300px] md:visible">
        {images.map((ele, index) => (
          <div key={index} className="flex flex-row justify-end mb-2">
            <button
              onClick={() => scrollTo(index)}
              className={`whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ease-in-out ${
                currentSlide === index ? "text-xl xl:text-2xl lg:text-2xl md:text-xl font-bold" : "text-base xl:text-xl lg:text-xl md:text-lg opacity-50"
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

export default DreamEventSlider;
