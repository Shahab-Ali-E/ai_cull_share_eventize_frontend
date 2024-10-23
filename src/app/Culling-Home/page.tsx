import React from 'react'
//video
import Video from 'next-video';
import cullingVideo from '../../../videos/AlgoCull.mp4'

//data's
import sliderImagesMetaData from '@/utils/sliderImages'; //slider carousal data
import {cullingStepsData,cullingStepsDataProps} from '@/utils/howToStartCullingGuide'//static data for culling steps
import {trustedByPhotographerData} from '@/utils/trustedByPhotographer' //trusted by photographer data

//components
import { Label } from '@/components/ui/label'
import ShiningButton from '@/components/animata/button/shining-button';
import HowToCullSteps from '@/components/culling-home/howToCullSteps';
import DreamEventSlider from '@/components/culling-home/cullingSlider';
import RevealYAxis from '@/components/slide-in-y-axis';
import ScrollingTestimonials from '@/components/animata/container/scrolling-testimonials';
import Navbar from '@/components/navbar';

const CullingHome =()=> {
  return (
    <section className='flex flex-col bg-primary-foreground min-h-screen px-10 text-primary space-y-20 overflow-hidden'>
      {/* nav bar */}
      <Navbar />

      {/* head */}
      <section className='flex'>
        {/* some text and get started button */}
        <div className='flex flex-col justify-center w-full'>
          {/* some text */}
          <RevealYAxis className='w-fit'>
            <Label className='font-bold text-4xl uppercase'>The fastest way to <br />
            intelligent culling</Label>
          </RevealYAxis>
          <RevealYAxis className='w-fit'>
            <Label className='text-2xl mt-4'>Fast forward the process. Skip the boring.</Label>
          </RevealYAxis>

          {/* get started button */}
          <div>
            <ShiningButton
              label='Get Started' 
            />
          </div>
        </div>

        {/* video */}
        <div className='flex flex-col w-full justify-center'>
          {/* <Video src={cullingVideo} controls={false} loop={true} autoPlay={true} className=''/> */}
        </div>
      </section>

      {/* body section */}
      <section className='flex flex-col space-y-32 p-24'>
        <div className='flex flex-col items-center text-center space-y-10'>
          <RevealYAxis className='w-full'>
            <div className="flex items-center text-center">
              
              {/* Line before text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-l from-headingtext to-white mx-2"></div>

              {/* Text */}
              <Label className='text-4xl uppercase font-semibold text-headingtext px-4'>
                Elevate Your Post-Processing Workflow
              </Label>

              {/* Line after text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-r from-headingtext to-white mx-2"></div>
            </div>
          </RevealYAxis>

          <RevealYAxis className='w-[35rem]'>
            <Label className='text-xl'>
              Smart Cull will help you speed up and simplify every step of the process—importing, culling, and exporting. Get your time back and use it to focus on important things.
            </Label>
          </RevealYAxis>
        </div>



        {/* steps how to perform culling */}
        <div className='flex flex-col mt-32'>
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
        <div className='flex flex-col justify-center space-y-28'>
          <RevealYAxis className='text-center'>
            <div className="flex items-center justify-center"> {/* Removed extra space between elements */}
              {/* Line before text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-l from-headingtext to-white hidden sm:block"></div>

              {/* Text */}
              <Label className='text-4xl uppercase font-semibold text-headingtext px-4 w-fit'> {/* Added px-4 for padding around text */}
                Simple, quick, and packed <br /> with features you&#39;ll love
              </Label>

              {/* Line after text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-r from-headingtext to-white hidden sm:block"></div>
            </div>
          </RevealYAxis>
          <DreamEventSlider
            images={sliderImagesMetaData[2]}
          />
        </div>

        {/* trusted by most of photographer marquee */}
        <div className='flex flex-col space-y-28 overflow-hidden'>

          <RevealYAxis className='text-center'>
            <div className="flex items-center justify-center">
              {/* Line before text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-l from-headingtext to-white hidden sm:block"></div>

              {/* Text */}
              <Label className='text-4xl uppercase font-semibold text-headingtext px-4 w-fit'> {/* Added px-4 for padding around text */}
                Trusted by most of photographer
              </Label>

              {/* Line after text */}
              <div className="flex-grow h-[2.5px] rounded-full bg-gradient-to-r from-headingtext to-white hidden sm:block"></div>
            </div>
          </RevealYAxis>

          <ScrollingTestimonials 
            data={trustedByPhotographerData}
          />
        </div>
      </section>
    </section>
  )
}

export default CullingHome