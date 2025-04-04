import { cn } from "@/lib/utils";
import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
}

const GradientButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & GradientButtonProps
>(
  (
    { children, onClick, className = "", asChild = false, ...rest },
    ref
  ) => {
    // If `asChild` is true, render the children directly, forwarding the ref.
    if (asChild) {
      return React.cloneElement(
        React.Children.only(children) as React.ReactElement,
        {
          className: cn(
            "bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 rounded-full shadow-md hover:opacity-90 focus:outline-none flex items-center justify-center",
            className
          ),
          onClick,
          ref,
          ...rest,
        }
      );
    }
  
    // Otherwise, render the button as usual, with the ref attached.
    return (
      <button
        ref={ref}
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
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
