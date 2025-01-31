"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { FaCheck } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { IoClose } from "react-icons/io5";

export interface TimelineEvent {
  id: string;
  title: string;
  status?: "Pending" | "Progress" | "Completed" | "Retry" | "Failed";
  progress?: number;
  [key: string]: unknown;
}

interface TimelineItemProps {
  event: TimelineEvent;
  isFirst: boolean;
  isLast: boolean;
  index: number;
  activeIndex: number | undefined;
  styles: TimelineStyles;
}

export interface TimelineStyles {
  lineColor: string;
  activeLineColor: string;
  dotColor: string;
  activeDotColor: string;
  dotSize: string;
  titleColor: string;
  descriptionColor: string;
  dateColor: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isLast,
  index,
  activeIndex,
  styles,
}) => {
  const isActive = event.status === "Progress";
  const isRetry = event.status === "Retry";
  const isCompleted = event.status === "Completed";
  const isFailed = event.status === "Failed";

  const fillDelay = activeIndex !== null ? Math.max(0, (index - 1) * 0.1) : 0;
  const fillDuration = activeIndex !== null ? Math.max(0.2, 0.5 - index * 0.1) : 0.5;

  return (
    <motion.div
      className="flex last:mb-0 space-x-28 sm:space-x-64"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={cn("flex flex-col flex-grow text-primary", !isLast && "mb-7")}>
        <Label className="text-sm font-semibold" style={{ color: styles.titleColor }}>
          {event.title}
        </Label>
        <div className={cn("text-muted-foreground", isFailed && "text-red-600")}>
          <Label style={{ color: styles.descriptionColor }} className="text-xs sm:text-sm">
            {event.status || "pending"} {event.progress?.toFixed(1)}
          </Label>
        </div>
      </div>
      <div className="relative flex flex-col items-center">
        <div
          className={`absolute ${isLast ? "hidden" : "block"} bottom-0 top-0 w-1`}
          style={{ backgroundColor: isFailed ? "red" : styles.lineColor }}
        >
          <motion.div
            className="w-full origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive || isCompleted ? 1 : 0 }}
            transition={{ duration: fillDuration, delay: fillDelay }}
            style={{
              height: "100%",
              backgroundColor: isFailed ? "red" : styles.activeLineColor,
            }}
          />
        </div>
        <motion.div
          className="relative z-10 rounded-full border-4 flex items-center justify-center"
          style={{
            width: styles.dotSize,
            height: styles.dotSize,
            borderColor: isFailed ? "red" : isRetry ? "yellow" : isActive || isCompleted ? styles.activeDotColor : styles.dotColor,
            backgroundColor: isFailed ? "red" : isRetry ? "yellow" : isActive || isCompleted ? styles.activeDotColor : "Background",
          }}
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={{ duration: fillDuration, delay: fillDelay }}
        >
          {isActive || isRetry ? (
            <Spinner size="small" show={true} className="text-white" />
          ) : isCompleted ? (
            <FaCheck color="white" />
          ) : isFailed ? (
            <IoClose color="white" />
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
};

interface AnimatedTimelineProps {
  events: TimelineEvent[];
  className?: string;
  styles?: Partial<TimelineStyles>;
  initialActiveIndex?: number;
}

const defaultStyles: TimelineStyles = {
  lineColor: "#d1d5db",
  activeLineColor: "#22c55e",
  dotColor: "#d1d5db",
  activeDotColor: "#22c55e",
  dotSize: "1.5rem",
  titleColor: "inherit",
  descriptionColor: "inherit",
  dateColor: "inherit",
};

export function AnimatedTimeline({
  events,
  className = "",
  styles: customStyles = {},
  initialActiveIndex,
}: AnimatedTimelineProps) {
  const styles = { ...defaultStyles, ...customStyles };

  return (
    <div className={`relative py-4 ${className}`}>
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          isFirst={index === 0}
          isLast={index === events.length - 1}
          index={index}
          activeIndex={initialActiveIndex}
          styles={styles}
        />
      ))}
    </div>
  );
}
