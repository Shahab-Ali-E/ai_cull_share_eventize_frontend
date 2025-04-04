"use client";

import { MousePointer2 } from "lucide-react";
import React, { useEffect } from "react";
import gsap from "gsap";

function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor") as HTMLElement;

    if (!cursor) return;

    // Move cursor
    const onMouseMove = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.1,
        ease: "power2.out",
        opacity: 1, // Ensure cursor is visible when moving inside the window
      });
    };

    // Scale cursor on click
    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.85, duration: 0.1 });
    };

    // Reset cursor scale
    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.1 });
    };

    // Hide cursor when leaving the screen
    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    // Show cursor when re-entering the screen
    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    // Event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="custom-cursor"
    >
      <MousePointer2 className="h-6 w-6 text-primary z-[999999]" fill="#000000" />
    </div>
  );
}

export default CustomCursor;
