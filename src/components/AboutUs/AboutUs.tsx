"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Settings } from "lucide-react";
import Navbar from "../navbar";
import Footer from "../footer";
import Image from "next/image";

// images
import shahabAliImage from "@/images/Shahab_ali.jpg";
import EmanImage from "@/images/Eman.jpg";

const AboutUs = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-inherit text-primary">
      <Navbar />
      <main className="container mx-auto px-4 py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              About AICSE
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with artistic vision to
              transform how professionals manage, curate, and share visual
              content.
            </p>
          </motion.div>

          {/* Our Story */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-border">
              Our Story
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Founded in 2025, AICSE emerged from a simple observation:
                creative professionals were spending more time managing their
                content than creating it. Our founders, with backgrounds
                spanning photography, event management, and software
                development, set out to build tools that would give time back to
                creators.
              </p>
              <p className="mt-4">
                What started as a simple tool for photographers to organize
                events has evolved into a comprehensive platform serving
                professionals across various creative industries. Our mission
                remains unchanged: to simplify workflows and amplify creative
                potential through intelligent technology.
              </p>
            </div>
          </motion.section>

          {/* Our Services */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 border-b pb-2 border-border">
              Our Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Event Arrangement */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card rounded-lg p-6 shadow-sm border border-border"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Event Arrangement</h3>
                <p className="text-muted-foreground">
                  Streamline event planning with our intuitive forms and
                  automated workflows. We handle the logistics so you can focus
                  on creating memorable experiences.
                </p>
              </motion.div>

              {/* Smart Culling */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card rounded-lg p-6 shadow-sm border border-border"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Culling</h3>
                <p className="text-muted-foreground">
                  Our AI-powered culling tools analyze your photos based on
                  technical quality and artistic elements, saving you hours of
                  manual selection work.
                </p>
              </motion.div>

              {/* Smart Share */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card rounded-lg p-6 shadow-sm border border-border"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Share</h3>
                <p className="text-muted-foreground">
                  Share your work securely with elegant, customizable galleries.
                  Control access, gather feedback, and deliver final assets all
                  from one platform.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Our Approach */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-border">
              Our Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Technology With Heart
                </h3>
                <p className="text-muted-foreground">
                  We believe that the best technology feels invisible. Our tools
                  work quietly in the background, learning from your preferences
                  and adapting to your workflow. But behind every algorithm is a
                  deep understanding of creative professionals needs and
                  challenges.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">
                  Continuous Innovation
                </h3>
                <p className="text-muted-foreground">
                  The creative landscape is constantly evolving, and so are we.
                  We invest heavily in research and development, collaborating
                  with professionals across industries to anticipate needs and
                  push the boundaries of whats possible.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Why Choose Us */}
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-border">
              Why Choose AICSE
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <span className="block h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold">Time Savings</h4>
                  <p className="text-muted-foreground">
                    Our clients report saving 5-15 hours per week on
                    administrative tasks.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <span className="block h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold">Intuitive Design</h4>
                  <p className="text-muted-foreground">
                    Beautiful, user-friendly interfaces that require minimal
                    training.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <span className="block h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold">Personalized Support</h4>
                  <p className="text-muted-foreground">
                    Our dedicated team is always ready to help you make the most
                    of our platform.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <span className="block h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold">Continuous Improvement</h4>
                  <p className="text-muted-foreground">
                    Regular updates based on user feedback and emerging
                    technologies.
                  </p>
                </div>
              </li>
            </ul>
          </motion.section>

          {/* Our Team */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 border-b pb-2 border-border">
              Meet Our Team
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="w-32 h-32 rounded-full mx-auto mb-4">
                  <Image
                    alt="shahab ali"
                    src={shahabAliImage}
                    className="rounded-full object-contain "
                    height={200}
                    width={200}
                  />
                </div>
                <h3 className="font-bold text-lg">Shahab Ali Hassan</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>

              <div>
                <div className="w-32 h-32 rounded-full mx-auto mb-4">
                  <Image
                    alt="Eman"
                    src={EmanImage}
                    className="rounded-full object-contain "
                    height={200}
                    width={200}
                  />
                </div>
                <h3 className="font-bold text-lg">Eman Sadiq</h3>
                <p className="text-muted-foreground">
                  Chief Technology Officer
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
