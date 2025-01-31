// components/GradientButton.tsx

import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asChild?: boolean; // Add the `asChild` prop
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = "",
  asChild = false, // Default to false
}) => {
  // If `asChild` is true, render the children directly
  if (asChild) {
    return React.cloneElement(React.Children.only(children) as React.ReactElement, {
      className: `bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 rounded-full shadow-md hover:opacity-90 focus:outline-none flex items-center justify-center ${className}`,
      onClick,
    });
  }

  // Otherwise, render the button as usual
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 rounded-full shadow-md hover:opacity-90 focus:outline-none flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default GradientButton;