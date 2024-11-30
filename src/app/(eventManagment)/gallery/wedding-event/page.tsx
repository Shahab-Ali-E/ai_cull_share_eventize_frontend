import ImagesGallery from '@/components/event-arrangment/gallery/wedding-event/ImagesGallery'
import RevealYAxis from '@/components/slide-in-y-axis'
import { Label } from '@/components/ui/label'
import { mirrorWeddingGalleryData, rainForestWeddingGalleryData, birdWeddingGalleryData, winterWeddingGalleryData } from '@/utils/EventArrangmentData'
import Image from 'next/image'
import React from 'react'
import weddingcelebration from '@/images/EventArrangment/wedding_celebration.png';
import RevelHeading from '@/components/RevelHeading'


function page() {
    const dataForGallery = [
        { label: 'RAINFOREST THEME', data: rainForestWeddingGalleryData },
        { label: 'MIRROR THEME', data:mirrorWeddingGalleryData  },
        { label: 'BIRD THEME', data: birdWeddingGalleryData },
        { label: 'WINTER THEME', data: winterWeddingGalleryData }
    ];

  return (
    <section className='flex flex-col min-h-screen relative w-full'>
        {/* image */}
        <div className="w-full relative">
            <Image 
                src={weddingcelebration}
                alt="celebration"
                unoptimized 
                className="absolute w-full"
            />
        </div>

        {/* other content */}
        <div className='flex flex-col space-y-20 sm:space-y-7 mt-2'>
            <div className='flex flex-col justify-center items-center'>
                {/* heading */}
                <RevelHeading
                    heading="Wedding Gallery"
                    placeholderColor="#ff4446"
                    description="We take care of each and every detail of your dream for the marriage.
                        To make it perfect as your plan we have various options to work-out,
                        and precisely FOUR amazing themes for the amazing event."
                />

            </div>

            {/* themes */}
            <div>
                {
                    dataForGallery.map((data,index)=>(
                        <div key={index} className='flex flex-col space-y-5'>
                            <div className='flex flex-col justify-center items-center'>
                                <RevealYAxis className='text-center w-fit p-4' placeHolderColor='#ff4446'>
                                    <Label className='text-lg sm:text-3xl text-center font-bold text-redishtext'>
                                        {data.label}
                                    </Label>
                                </RevealYAxis>
                            </div>

                            {/* Images */}
                            <div>
                                <ImagesGallery 
                                    images={data.data}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    </section>
  )
}

export default page