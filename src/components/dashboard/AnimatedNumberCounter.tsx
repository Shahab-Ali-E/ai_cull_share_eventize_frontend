"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberCounterProps {
  n: number; // Final number to count up to
  duration?: number; // Animation duration in seconds (default: 0.8)
}

const AnimatedNumberCounter: React.FC<AnimatedNumberCounterProps> = ({ n, duration = 0.8 }) => {
  const number = n === 0 ? 5 : n;
  const animatedValue = useMotionValue(number * 5); // Start from a larger number
  const roundedValue = useTransform(animatedValue, (latest) => Math.round(latest));
  const [count, setCount] = useState(number * 5);

  useEffect(() => {
    const controls = animate(animatedValue, n, {
      duration,
      ease: "easeInOut",
    });

    const unsubscribe = roundedValue.on("change", (latest) => {
      setCount(latest);
    });

    return () => {
      controls.stop(); // Stop animation on unmount
      unsubscribe();
    };
  }, [n, duration, animatedValue, roundedValue]);

  return <motion.span>{count}</motion.span>;
};

export default AnimatedNumberCounter;
