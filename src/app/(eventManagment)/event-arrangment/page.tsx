import MenuCard from "@/components/event-arrangment/event-arrang/MenuCard";
import { menuCardData } from "@/utils/EventArrangmentData";
import React from "react";
import EventArrangementHeroSection from "@/components/LandingPages/EventArrangement/hero-section";
import Eyebrow from "@/components/LandingPages/EventArrangement/Eyebrow";
import SlideInFromBottom from "@/components/LandingPages/SlideInFromBottom";
import HowItWorks from "@/components/LandingPages/EventArrangement/HowItWorks";
import About from "@/components/LandingPages/EventArrangement/About";
import WhyChooseUs from "@/components/LandingPages/EventArrangement/WhyChooseUs";
import {
  FaUserShield,
  FaCalendarAlt,
  FaCameraRetro,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { TbPresentationFilled } from "react-icons/tb";

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
      icon: <FaUserShield className="h-8 w-8 text-primary" />,
      title: "Secure Data",
      description: "Your personal and event data are safe with us.",
    },
    {
      id: 3,
      icon: <FaCalendarAlt className="h-8 w-8 text-primary" />,
      title: "Automated Scheduling",
      description: "Never miss an important event with smart scheduling.",
    },
    {
      id: 4,
      icon: <FaCameraRetro className="h-8 w-8 text-primary" />,
      title: "AI-Powered Photography",
      description: "Capture perfect moments with AI-enhanced photos.",
    },
    {
      id: 5,
      icon: <FaCloudUploadAlt className="h-8 w-8 text-primary" />,
      title: "Cloud Backup",
      description: "Securely store and access event memories anytime.",
    },
  ];

  return (
    <section
      className="flex flex-col space-y-10 md:space-y-32 px-3 md:px-20 text-primary"
      id="smooth-wrapper"
    >
      {/* Top section */}
      <EventArrangementHeroSection />

      {/* Body */}
      <section className="flex flex-col items-center space-y-56">
        {/* How it works */}
        <div className="flex flex-col space-y-20 items-center w-full">
          <SlideInFromBottom delay={0}>
            <Eyebrow
              heading="How It Works"
              description="Plan your event effortlessly fill out the form, review, and we’ll handle
        the rest."
            />
          </SlideInFromBottom>
          <HowItWorks />
        </div>

        {/* About */}
        <div className="flex flex-col space-y-14 relative h-full">
          <About words="Event Arrangement will provide a seamless experience for customers to explore events across Asia and enhance their event planning through an easy-to-use interface." />
        </div>

        {/* Our gallery */}
        <div className="flex flex-col space-y-14 w-full">
          <SlideInFromBottom delay={0}>
            <Eyebrow heading="Benifits" description="Why choose us ?" />
          </SlideInFromBottom>
          <SlideInFromBottom delay={0.3}>
            <div className="grid grid-cols-12 gap-6 w-full">
              {benefitsData.map((item, index) => (
                <div
                  key={item.id}
                  className={`${index < 3 ? "col-span-4" : "col-span-6"}`}
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
      </section>
    </section>
  );
}

export default Page;
