import React from 'react'

//data's
import {smartCullSliderImages, cullingStepsData, trustedByPhotographerData} from '@/utils/CullingData';
import {cullingStepsDataProps} from '@/@types/Types';

//components
import HowToCullSteps from '@/components/culling-home/howToCullSteps';
import DreamEventSlider from '@/components/culling-home/cullingSlider';
import ScrollingTestimonials from '@/components/animata/container/scrolling-testimonials';
import Navbar from '@/components/navbar';
import TopSection from '@/components/top-section';
import RevelHeading from '@/components/RevelHeading';

const CullingHome =()=> {
  return (
    <section className='flex flex-col bg-primary-foreground min-h-screen px-10 text-primary space-y-10 sm:space-y-20 overflow-hidden'>
      {/* nav bar */}
      <Navbar />

      {/* top section */}
      <TopSection
        title="The fastest way to intelligent culling"
        subtitle="Fast forward the process. Skip the boring."
        buttonText="Get Started"
        buttonHref="/culling-dashboard"
        revelPlaceHolderColor='#00B8B8'
      />

      {/* body section */}
      <section className='flex flex-col space-y-16 sm:space-y-32 p-0 sm:p-24 '>
        <div className='flex flex-col items-center text-center space-y-5 sm:pace-y-10'>
        <RevelHeading
            heading="Elevate Your Post-Processing Workflow"
            description=" Smart Cull will help you speed up and simplify every step of the process—importing, culling, and exporting. Get your time back and use it to focus on important things."
            placeholderColor='#00b8b8'
        />
        </div>

        {/* steps how to perform culling */}
        <div className='flex flex-col mt-0 sm:mt-32 '>
          {cullingStepsData.map((stepData:cullingStepsDataProps, index) => (
            <HowToCullSteps
              index={index}
              key={index}
              title={stepData.title}
              steps={stepData.steps}
              gif={stepData.gif}
            />
          ))}
        </div>

        {/* slider carousal */}
        <div className='flex flex-col justify-center space-y-16'>
          <RevelHeading
            heading="Simple, quick, and feature-packed"
            placeholderColor='#00b8b8'
          />
          {/* carousal */}
          <DreamEventSlider
            images={smartCullSliderImages}
          />
        </div>

        {/* trusted by most of photographer marquee */}
        <div className='flex flex-col space-y-10 sm:space-y-28 overflow-hidden'>

          <RevelHeading
            heading="Trusted by most of photographer"
            placeholderColor='#00b8b8'
          />
          
          <ScrollingTestimonials 
            data={trustedByPhotographerData}
          />
        </div>
      </section>
    </section>
  )
}

export default CullingHome