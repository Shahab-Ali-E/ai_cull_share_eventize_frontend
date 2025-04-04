"use client";

import { useEffect, useState } from "react";

const CircularProgressBar = ({
    progress = 0,
    size = 150,
    strokeWidth = 10,
    primaryColor = "#4CAF50",
    backgroundColor = "#E0E0E0",
    textColor = "#000000"
}) => {
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        // Validate progress value
        const validProgress = Math.min(Math.max(progress, 0), 100);
        setCurrentProgress(validProgress);
    }, [progress]);

    // Calculate SVG parameters
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
                role="progressbar"
                aria-valuenow={currentProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${currentProgress}%`}
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={backgroundColor}
                    fill="transparent"
                    className="transition-all duration-300 ease-in-out"
                />

                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={primaryColor}
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500 ease-in-out"
                />
            </svg>

            {/* Percentage text */}
            <div 
                className="absolute flex items-center justify-center"
                style={{ color: textColor }}
            >
                <span className="text-2xl font-semibold">
                    {Math.round(currentProgress)}%
                </span>
            </div>

            {/* Focus ring for accessibility */}
            <div className="absolute inset-0 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
        </div>
    );
};

export default CircularProgressBar;