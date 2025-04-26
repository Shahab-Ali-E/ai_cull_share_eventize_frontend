"use client";

import { useEffect, useState } from "react";

interface CircularProgressBarProps {
  /** 0–100%; ignored if indeterminate is true */
  progress?: number;
  /** diameter in pixels */
  size?: number;
  /** stroke width in pixels */
  strokeWidth?: number;
  /** color of the progress arc */
  primaryColor?: string;
  /** color of the background circle */
  backgroundColor?: string;
  /** center text color */
  textColor?: string;
  /** if true, spin infinitely & show “Starting soon…” */
  indeterminate?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress = 0,
  size = 150,
  strokeWidth = 10,
  primaryColor = "#4CAF50",
  backgroundColor = "#E0E0E0",
  textColor = "#000000",
  indeterminate = false,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!indeterminate) {
      const valid = Math.min(Math.max(progress, 0), 100);
      setCurrentProgress(valid);
    }
  }, [progress, indeterminate]);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // For determinate: dashoffset based on currentProgress
  // For indeterminate: static arc length with spin animation
  const dashArray = indeterminate
    ? `${circumference * 0.3} ${circumference}`
    : `${circumference}`;
  const strokeDashoffset = indeterminate
    ? 0
    : circumference - (currentProgress / 100) * circumference;

  // Classes
  const svgClass = indeterminate
    ? "transform -rotate-90"
    : "transform -rotate-90";
  const circleClass = indeterminate
    ? "animate-spin origin-center"
    : "transition-all duration-500 ease-in-out";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={svgClass}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : currentProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={
          indeterminate
            ? "Starting soon…"
            : `Progress: ${currentProgress}%`
        }
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={backgroundColor}
          fill="transparent"
        />

        {/* Progress / spinner arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={primaryColor}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={strokeDashoffset}
          className={circleClass}
        />
      </svg>

      {/* Center text */}
      <div
        className="absolute flex items-center justify-center"
        style={{ color: textColor }}
      >
        {indeterminate ? (
          <span className="text-base font-inter font-medium">Starting soon…</span>
        ) : (
          <span className="text-2xl font-inter font-semibold">
            {Math.round(currentProgress)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularProgressBar;
