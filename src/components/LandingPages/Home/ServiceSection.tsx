"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { Calendar, Image, Share } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Event Arrangement",
      description:
        "Plan your events effortlessly. Fill out forms, review, and let us handle the rest process.",
      icon: Calendar,
      link: "/event-arrangement",
    },
    {
      title: "Smart Culling",
      description:
        "Automate your culling process with AI-powered tools that help identify the best photos with precision and efficiency.",
      icon: Image,
      link: "/smart-culling",
    },
    {
      title: "Smart Share",
      description:
        "Share your precious moments securely and elegantly with customizable galleries and advanced sharing features.",
      icon: Share,
      link: "/smart-share",
    },
  ];

  return (
    <section id="services" className="py-20 relative px-5 md:px-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our suite of integrated tools designed to streamline your
            workflow and enhance your digital experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
