import React from "react";

const howToShareData = [
  {
    index: 0,
    heading: "Create an Event",
    points: [
      "Click on the 'Create Event' button.",
      "Enter event details such as name and date.",
      "Click on 'Create' to generate your event.",
    ],
    videoSrc: "/videos/smartshare1.mp4",
  },
  {
    index: 1,
    heading: "Upload Images",
    description: "Add the event photos for guests to access.",
    points: [
      "Open your photo folder.",
      "Select and upload the event images.",
      "Organize them into albums if needed.",
    ],
    videoSrc: "/videos/smartshare2.mp4",
  },
  {
    index: 2,
    heading: "Generate QR Code",
    description: "Allow guests to scan a secure QR code to view their images.",
    points: [
      "Navigate to your event page.",
      "Click on 'Generate QR Code'.",
      "Share the QR with event guests.",
    ],
    videoSrc: "/videos/smartshare3.mp4",
  },
  {
    index: 3,
    heading: "Facial Recognition Login",
    description:
      "Guests verify their identity using facial recognition for access.",
    points: [
      "Guests scan the QR code.",
      "They verify via facial recognition.",
      "They get secure, personalized image access.",
    ],
    videoSrc: "/videos/smartshare4.mp4",
  },
];

import Navbar from "@/components/navbar";
import Image from "next/image";
import leftShadowImage from "@/images/LandingPages/SmartCulling/hero_left_blur.png";
import middleShadowImage from "@/images/LandingPages/SmartCulling/hero_middle_blur.png";
import BlueishBlurBackground from "@/images/LandingPages/SmartCulling/AfterHeroSectionImage.jpeg";
import ShrinkingVideoCard from "@/components/LandingPages/SmartCulling/ShrinkingVideoCard";
import CullingEyebrow from "@/components/LandingPages/SmartCulling/CullingEyebrow";
import HowToCull from "@/components/LandingPages/SmartCulling/HowToCull";
import SlideInFromBottom from "@/components/LandingPages/SlideInFromBottom";
import CullingGetStartedButton from "@/components/LandingPages/GetStartedButton";
import SmartShareHeroSection from "@/components/LandingPages/SmartShare/SmartShareHeroSection";
import SmartShareTestimonials from "@/components/LandingPages/SmartShare/SmartShareTestimonials";
import SmartShareFeatures from "@/components/LandingPages/SmartShare/SmartShareFeatures";

const SmartShareHome = () => {
  return (
    <section className="flex flex-col space-y-10 md:space-y-20 overflow-hidden pb-56">
      <Navbar />
      <section className="flex flex-col space-y-16 md:space-y-32">
        <div className="flex flex-col w-full h-full relative z-0">
          <SmartShareHeroSection />
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

        <div className="flex flex-col justify-center w-full space-y-14 md:space-y-32">
          <SlideInFromBottom delay={0}>
            <CullingEyebrow
              heading="How to Use Smart Share"
              description="Follow these steps to create events, upload images, and provide secure guest access via QR and facial recognition."
            />
          </SlideInFromBottom>
          <div className="flex flex-col gap-24 md:space-y-40">
            {howToShareData.map((data) => (
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

        {/* features */}
        <div className="flex flex-col justify-center w-full space-y-14 md:space-y-20 px-3 md:px-16">
          <SlideInFromBottom delay={0}>
            <CullingEyebrow
              heading="Power-Packed Features"
              description="Everything you need to streamline event photography distribution"
            />
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <SmartShareFeatures />
          </SlideInFromBottom>
        </div>

        {/* what user says about us */}
        <div className="flex flex-col justify-center w-full space-y-14 md:space-y-20">
          <SlideInFromBottom delay={0}>
            <CullingEyebrow
              heading="What Our Users Say"
              description="See how Smart Share is revolutionizing event photo sharing"
            />
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <SmartShareTestimonials />
          </SlideInFromBottom>
        </div>

        <div className="flex flex-col justify-center items-center text-center w-full space-y-10 md:space-y-20 pt-24 md:pt-40">
          <SlideInFromBottom delay={0}>
            <h1 className="text-3xl md:text-4xl max-w-md md:max-w-2xl font-semibold text-primary">
              Make photo sharing seamless and secure. Try Smart Share today.
            </h1>
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <CullingGetStartedButton href="/smartshare-dashboard" />
          </SlideInFromBottom>
        </div>
      </section>
    </section>
  );
};

export default SmartShareHome;
