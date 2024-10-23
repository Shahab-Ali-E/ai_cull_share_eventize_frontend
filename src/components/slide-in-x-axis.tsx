'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface RevealXAxisProps {
  children: React.JSX.Element;
  className?: string;
  direction?: 'left' | 'right'; // New prop to specify direction
}

function RevealXAxis({ children, className, direction = 'left' }: RevealXAxisProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.1 1", "0.9 1"]
  });

  // Set x-transform based on direction
  const xStart = direction === 'left' ? -180 : 180;
  const x = useTransform(scrollYProgress, [0, 1], [xStart, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        opacity
      }}
      className={`${className} transition-all`} // Increased duration for smoother animation
    >
      {children}
    </motion.div>
  );
}

export default RevealXAxis;
