"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import GetStartedButton from "../GetStartedButton";

const HomeHeroSection = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 },
    }),
  };

  // Create floating particles with GSAP
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles: HTMLDivElement[] = [];
    const container = particlesRef.current;
    const COUNT = 40;

    // Create particles
    for (let i = 0; i < COUNT; i++) {
      const particle = document.createElement("div");
      particle.className = `absolute w-1 h-1 md:w-2 md:h-2 rounded-full ${
        isDarkMode ? "bg-white/20" : "bg-gray-400"
      }`;
      container.appendChild(particle);
      particles.push(particle);

      // Random initial position
      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
      });

      // Animate each particle
      animateParticle(particle);
    }

    function animateParticle(particle: HTMLDivElement) {
      gsap.to(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 10,
        ease: "sine.inOut",
        onComplete: () => animateParticle(particle),
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [isDarkMode]);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden"
      ></div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:from-transparent dark:to-background z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center font-inter flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={0}
        >
          All-In-One Event Management & AI Solutions
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-14"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={1}
        >
          Plan, Cull, and Share Your Event Photos Effortlessly
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={2}
        >
          <GetStartedButton href="/dashboard"/>
        </motion.div>
      </div>

      {/* Abstract shapes */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-20 dark:opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0.05, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute w-96 h-96 rounded-full bg-primary/30 blur-3xl -bottom-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-500/30 blur-3xl -bottom-20 left-1/3"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500/30 blur-3xl -bottom-20 right-0"></div>
      </motion.div>
    </section>
  );
};

export default HomeHeroSection;
