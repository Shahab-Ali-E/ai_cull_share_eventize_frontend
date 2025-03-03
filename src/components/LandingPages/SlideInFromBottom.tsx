"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

function SlideInFromBottom({
  children,
  duration = 0.6,
  delay = 2,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default SlideInFromBottom;
