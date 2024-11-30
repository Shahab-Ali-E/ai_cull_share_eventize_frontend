"use client";

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

// content for slider
import {eventArrangmentSliderImages} from '@/utils/EventArrangmentData'
import CarousalCard from './CarousalCard';
import Autoplay from 'embla-carousel-autoplay';

function EventCarousal() {
  const [api, setApi] = useState<CarouselApi>()
  const [ ,setCurrent] = useState(0)
  const [ ,setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
 

  return (
    <div className="mx-auto w-[75%] sm:w-[70%]">
      <Carousel setApi={setApi} className="w-full" plugins={[Autoplay({delay:2000, stopOnMouseEnter:true})]}>
        <CarouselContent>
          {eventArrangmentSliderImages.map((data, index) => (
            <CarouselItem key={index}>
              <CarousalCard 
                heading={data.heading}
                description={data.description}
                href={data.href}
                image={data.src}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default EventCarousal