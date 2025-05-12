import Image from "next/image";
import React from "react";
import GrainBackground from "@/images/EventArrangment/LandingPage/grain.jpg";

const testimonials = [
  {
    quote:
      "Smart Share saved me 10 hours per event. The AI facial recognition and QR system make photo distribution effortless.",
    name: "Sarah Johnson",
    title: "Wedding Photographer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  },
  {
    quote:
      "My clients love being able to instantly access their photos. The security features give them confidence their private moments stay private.",
    name: "David Chen",
    title: "Event Photography Studio",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  },
];

const SmartShareTestimonials = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative group p-8 rounded-xl backdrop-blur-md border border-border dark:bg-[#141414] bg-white/80"
          >
            {/* Grain Texture Overlay */}
            <Image
              src={GrainBackground}
              alt="grain-Background"
              height={100}
              width={100}
              className="absolute object-cover top-0 left-0 w-full h-full z-10 opacity-5 pointer-events-none"
              unoptimized
            />
            <div className="flex items-start mb-6">
              <div className="mr-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={100}
                  width={100}
                  className="w-16 h-16 rounded-full object-cover border-2 border-magenta"
                />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-primary">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </div>
            </div>
            <blockquote>
              <p className="text-muted-foreground italic">
                {testimonial.quote}
              </p>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SmartShareTestimonials;
