import React from "react";

//data's
const howToCullData = [
  {
    index: 0,
    heading: "Create Your Workspace",
    points: [
      "Click on the Create Workspace button.",
      "Enter a unique name for your workspace.",
      "Click on the Create button.",
    ],
    videoSrc: "/videos/video1.mp4",
  },
  {
    index: 1,
    heading: "Upload Images",
    description:
      "Choose the images you want to include in the culling process.",
    points: [
      "Open your image folder.",
      "Select images based on criteria.",
      "Move selected images to a new folder.",
    ],
    videoSrc: "/videos/video2.mp4",
  },
  {
    index: 2,
    heading: "Review and Cull",
    description: "Review the selected images and remove unwanted ones.",
    points: [
      "Examine each image carefully.",
      "Delete duplicates or poor quality images.",
      "Keep only the best images.",
    ],
    videoSrc: "/videos/video3.mp4",
  },
  {
    index: 3,
    heading: "Finalize and Save",
    description: "Finalize your selection and save the culled images.",
    points: [
      "Double-check your selection.",
      "Save the final set of images.",
      "Backup your images.",
    ],
    videoSrc: "/videos/video4.mp4",
  },
];

//components
import Navbar from "@/components/navbar";
import CullingHeroSection from "@/components/LandingPages/SmartCulling/CullingHeroSection";

import Image from "next/image";

// after hero section shadow images
import leftShadowImage from "@/images/LandingPages/SmartCulling/hero_left_blur.png";
import middleShadowImage from "@/images/LandingPages/SmartCulling/hero_middle_blur.png";
import BlueishBlurBackground from "@/images/LandingPages/SmartCulling/AfterHeroSectionImage.jpeg";
import ShrinkingVideoCard from "@/components/LandingPages/SmartCulling/ShrinkingVideoCard";
import CullingEyebrow from "@/components/LandingPages/SmartCulling/CullingEyebrow";
import HowToCull from "@/components/LandingPages/SmartCulling/HowToCull";
import { Carousel } from "@/components/ui/carousel";

import carouselImage1 from "@/images/LandingPages/SmartCulling/blurimage.jpg";
import carouselImage2 from "@/images/LandingPages/SmartCulling/closedeye.png";
import carouselImage3 from "@/images/LandingPages/SmartCulling/duplicate.jpg";
import carouselImage4 from "@/images/LandingPages/SmartCulling/AfterCullFolders.png";
import SlideInFromBottom from "@/components/LandingPages/SlideInFromBottom";
import CullingGetStartedButton from "@/components/LandingPages/GetStartedButton";

const slideData = [
  {
    title: "Blurred",
    src: carouselImage1,
  },
  {
    title: "Closed Eyes",
    src: carouselImage2,
  },
  {
    title: "Duplicate",
    src: carouselImage3,
  },
  {
    title: "Organized",
    src: carouselImage4,
  },
];

const CullingHome = () => {
  return (
    <section className="flex flex-col space-y-10 md:space-y-20 overflow-hidden pb-56">
      {/* nav bar */}
      <Navbar />

      {/* body section */}
      <section className="flex flex-col space-y-16 md:space-y-32">
        {/* hero section */}
        <div className="flex flex-col w-full h-full relative z-0">
          <CullingHeroSection />
          {/* images after hero section */}

          {/* bottom shadow images */}
          <div className="flex w-full relative z-20 -mt-12">
            <div className="w-[15%]">
              <Image
                src={leftShadowImage}
                alt="Left shadow"
                width={500}
                height={500}
                className="w-full h-full"
                unoptimized
              />
            </div>
            <div className="w-[75%]">
              <Image
                src={middleShadowImage}
                alt="Middle shadow"
                width={1000}
                height={500}
                className="w-full h-full"
                unoptimized
              />
            </div>
            <div className="w-[15%]">
              <Image
                src={leftShadowImage}
                alt="Right shadow"
                width={500}
                height={500}
                className="w-full h-full"
                style={{ transform: "scaleX(-1)" }}
                unoptimized
              />
            </div>
          </div>

          {/* a blueish blur background - moved upward */}
          <div className="flex w-full relative -z-20 -mt-64 h-[800px] md:h-[1300px]">
            <Image
              src={BlueishBlurBackground}
              alt="Blueish blur background"
              width={500}
              height={500}
              className="w-full h-full opacity-20"
              unoptimized
            />
          </div>

          <ShrinkingVideoCard />
        </div>

        {/* how to Cull */}
        <div className="flex flex-col justify-center w-full space-y-14 md:space-y-32">
          <SlideInFromBottom delay={0}>
            <CullingEyebrow
              heading="How to perform culling"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            />
          </SlideInFromBottom>
          <div className="flex flex-col gap-24 md:space-y-40">
            {howToCullData.map((data) => (
              <HowToCull
                key={data.index}
                index={data.index}
                heading={data.heading}
                description={data.description}
                points={data.points}
                videoSrc={data.videoSrc}
              />
            ))}
          </div>
        </div>

        {/* what culling does */}
        <div className="flex flex-col justify-center w-full space-y-20 md:space-y-32 pt-24 md:pt-40">
          <SlideInFromBottom delay={0}>
            <CullingEyebrow
              heading="How AI Culling Works"
              description="AI Culling removes blurry, closed-eye, and duplicate photos to highlight the best shots."
            />
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <Carousel slides={slideData} />
          </SlideInFromBottom>
        </div>

        {/* get started section */}
        <div className="flex flex-col justify-center items-center text-center w-full space-y-10 md:space-y-20 pt-24 md:pt-40">
          <SlideInFromBottom delay={0}>
            <h1 className="text-3xl md:text-4xl max-w-md md:max-w-2xl font-semibold text-primary">
              Optimize your photo collection effortlessly. Start culling for
              free today.
            </h1>
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <CullingGetStartedButton href="/culling-dashboard" />
          </SlideInFromBottom>
        </div>
      </section>
    </section>
  );
};

export default CullingHome;
