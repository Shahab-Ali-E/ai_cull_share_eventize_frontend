"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { IoSparkles } from "react-icons/io5";

function Logo() {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();


  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";
  return (
    <Link href="/" className="flex items-center text-primary gap-2">
      <IoSparkles className="h-10 w-10 text-primary" fill={isDarkMode?"#ffffff" : "#000000" }/>
      <span className="text-base md:text-2xl font-bold font-inter">
        SnapCull Ai
      </span>
    </Link>
  );
}

export default Logo;
