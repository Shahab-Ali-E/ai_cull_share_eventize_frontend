import React from "react";
import EventArrangementHeroSection from "@/components/LandingPages/EventArrangement/hero-section";
import Eyebrow from "@/components/LandingPages/EventArrangement/Eyebrow";
import SlideInFromBottom from "@/components/LandingPages/SlideInFromBottom";
import HowItWorks from "@/components/LandingPages/EventArrangement/HowItWorks";
import About from "@/components/LandingPages/EventArrangement/About";
import WhyChooseUs from "@/components/LandingPages/EventArrangement/WhyChooseUs";
import { FaGlobeAfrica } from "react-icons/fa";
import { TbPresentationFilled } from "react-icons/tb";
import { PiNutFill } from "react-icons/pi";
import { BiSolidZap } from "react-icons/bi";
import { SlidersVertical } from "lucide-react";
import MenuCard from "@/components/LandingPages/EventArrangement/MenuCard";
import { menuCardData } from "@/utils/EventArrangmentData";
import AskAnyQuestion from "@/components/LandingPages/EventArrangement/AskAnyQuestion";

function Page() {
  const benefitsData = [
    {
      id: 1,
      icon: <TbPresentationFilled className="h-8 w-8 text-primary" />,
      title: "Seamless Planning",
      description: "Effortlessly book events with a user-friendly interface.",
    },
    {
      id: 2,
      icon: <SlidersVertical className="h-8 w-8 text-primary" />,
      title: "Customized Experience",
      description: "Tailor every detail, from themes to destinations.",
    },
    {
      id: 3,
      icon: <FaGlobeAfrica className="h-8 w-8 text-primary" />,
      title: "Global Destinations",
      description:
        "Choose from top locations like Pakistan, Turkey, Dubai, and more.",
    },
    {
      id: 4,
      icon: <PiNutFill className="h-8 w-8 text-primary" />,
      title: "Expert Execution",
      description: "Professional event planners ensure a flawless experience.",
    },
    {
      id: 5,
      icon: <BiSolidZap className="h-8 w-8 text-primary" />,
      title: "Hassle Free Process",
      description:
        "Fill out a simple form, review, and let us handle the rest!.",
    },
  ];

  return (
    <section
      className="flex flex-col text-primary"
      id="smooth-wrapper"
    >
      {/* Top section */}
      <EventArrangementHeroSection />

      {/* Body */}
      <section className="flex flex-col items-center space-y-56 px-3 md:px-16 mt-28">
        {/* How it works */}
        <div className="flex flex-col space-y-28 items-center w-full">
          <SlideInFromBottom delay={0}>
            <Eyebrow
              heading="How It Works"
              description="Plan your event effortlessly fill out the form, review, and we’ll handle
        the rest."
              descriptionClassName="font-semibold"
            />
          </SlideInFromBottom>
          <HowItWorks />
        </div>

        {/* About */}
        <div className="flex flex-col space-y-14 relative h-full ">
          <About words="Event Arrangement will provide a seamless experience for customers to explore events across Asia and enhance their event planning through an easy-to-use interface." />
        </div>

        {/* Why Choose Us ? */}
        <div className="flex flex-col space-y-14 w-full">
          <SlideInFromBottom delay={0}>
            <Eyebrow
              heading="Benifits"
              description="Why choose us ?"
              descriptionClassName="font-semibold"
            />
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <div className="grid grid-cols-12 gap-6 w-full">
              {benefitsData.map((item, index) => (
                <div
                  key={item.id}
                  className={`${
                    index < 3
                      ? "col-span-12 md:col-span-6 lg:col-span-4"
                      : "col-span-12 md:col-span-6 lg:col-span-6"
                  }`}
                >
                  <WhyChooseUs
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </SlideInFromBottom>
        </div>

        {/* our menus */}
        <div className="flex flex-col space-y-36 w-full pt-10">
          <SlideInFromBottom delay={0}>
            <Eyebrow
              heading="Discover our menus"
              description="Explore our curated menus with diverse cuisines and presentation styles for any event."
              descriptionClassName="max-w-full md:max-w-4xl font-semibold mt-2"
            />
          </SlideInFromBottom>
          <div className="flex flex-col space-y-48 md:space-y-60">
            {menuCardData.map((item, index) => (
              <div key={item.id}>
                <MenuCard
                  id={item.id}
                  index={index}
                  heading={item.heading}
                  title={item.title}
                  points={item.points}
                  href={item.href}
                  src={item.src}
                />
              </div>
            ))}
          </div>
        </div>

        {/* feel free to ask any question */}
        <div className="w-full h-full">
          <AskAnyQuestion />
        </div>
      </section>
    </section>
  );
}

export default Page;
