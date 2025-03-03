// components/GradientButton.tsx

import { cn } from "@/lib/utils";
import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asChild?: boolean; // Add the `asChild` prop
}

const GradientButton = ({
  children,
  onClick,
  className = "",
  asChild = false, // Default to false
  ...rest
}:React.ButtonHTMLAttributes<HTMLButtonElement> & GradientButtonProps) => {
  // If `asChild` is true, render the children directly
  if (asChild) {
    return React.cloneElement(React.Children.only(children) as React.ReactElement, {
      className: cn(
        "bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 rounded-full shadow-md hover:opacity-90 focus:outline-none flex items-center justify-center",
        className 
      ),
      onClick,
    });
  }

  // Otherwise, render the button as usual
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 rounded-full shadow-md hover:opacity-90 focus:outline-none flex items-center justify-center",
        className 
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default GradientButton;