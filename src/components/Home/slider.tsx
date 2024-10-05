"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { sliderImages } from '@/utils/sliderImages';
import ShiningButton from '@/components/animata/button/shining-button';
import JumpingTextInstagram from '../animata/text/jumping-text-instagram';

export default function Slider({ slides }: { slides: sliderImages[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const checkScreenSize = useCallback(() => {
        setIsSmallScreen(window.innerWidth < 768); // sm screen (less than 768px)
    }, []);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [checkScreenSize]);

    const scrollPrev = useCallback(() => {
        if (emblaApi && !isSmallScreen) {
            emblaApi.scrollPrev();
        }
    }, [emblaApi, isSmallScreen]);

    const scrollNext = useCallback(() => {
        if (emblaApi && !isSmallScreen) emblaApi.scrollNext();
    }, [emblaApi, isSmallScreen]);

    useEffect(() => {
        if (!emblaApi || isSmallScreen) return;
        const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, isSmallScreen]);

    return (
        <>
            <div className="overflow-hidden" ref={!isSmallScreen ? emblaRef : null}>
                <div className={`embla__container flex ${isSmallScreen ? '' : 'flex-shrink'}`}>
                    {slides.map((ele, index) => (
                        <div 
                            className={`embla__slide ${isSmallScreen && index !== 0 ? 'hidden' : ''}`} 
                            key={index}
                        >
                            <div className="absolute top-1/2 left-10 md:left-44">
                                {/* Jumping main bold text */}
                                <JumpingTextInstagram
                                    text={`${ele.description.split(':')[0]}`}
                                    mode="word"
                                    className="text-white font-bold xl:text-6xl lg:text-4xl md:text-3xl sm:text-xl leading-tight"
                                    animate={activeIndex === index}
                                />

                                {/* Jumping text for description */}
                                <JumpingTextInstagram
                                    text={`${ele.description.split(',')[0].replace(/.*?:\s*/, "")}`}
                                    mode="word"
                                    className="invisible xl:visible lg:visible md:visible  mt-5 text-white font-semibold xl:text-xl lg:text-lg md:text-base"
                                    animate={activeIndex === index}
                                />

                                {/* Additional jumping texts */}
                                {ele.description.split(',').slice(1).map((desc, idx) => (
                                    <JumpingTextInstagram
                                        key={idx}
                                        text={desc}
                                        mode="word"
                                        className="invisible xl:visible lg:visible md:visible mt-5 text-white font-semibold xl:text-xl lg:text-lg md:text-base sm:text-sm"
                                        animate={activeIndex === index}
                                    />
                                ))}

                                {/* Learn more button */}
                                <ShiningButton label="Learn more" href="/tabs" />
                            </div>

                            {/* Image */}
                            <Image src={ele.src} alt={`slide ${index}`} />
                        </div>
                    ))}
                </div>

                {/* Hide navigation buttons on small screens */}
                {!isSmallScreen && (
                    <>
                        <button className="invisible md:visible lg:visible xl:visible absolute top-1/2 left-7" onClick={scrollPrev}>
                            <FaArrowCircleLeft
                                size={28}
                                className="text-white hover:text-gray-300 hover:h-10 hover:w-10 duration-150 transition-all"
                            />
                        </button>
                        <button className="invisible md:visible lg:visible xl:visible absolute top-1/2 right-7" onClick={scrollNext}>
                            <FaArrowCircleRight
                                size={28}
                                className="text-white hover:text-gray-300 hover:h-10 hover:w-10 duration-150 transition-all"
                            />
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
