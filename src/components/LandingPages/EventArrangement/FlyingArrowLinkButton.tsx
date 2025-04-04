"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FlyingArrowLinkButtonProps {
  href: string;
  label: string;
  className?: string;
  arrowSpanClassName?: string;
}

const FlyingArrowLinkButton: React.FC<FlyingArrowLinkButtonProps> = ({
  href,
  label,
  className = "",
  arrowSpanClassName = "",
}) => {
  return (
    <Link href={href} passHref>
      <Button
        className={cn(
          "flex justify-between text-sm md:text-base font-inter font-semibold p-0 gap-3 py-5 md:py-6 w-fit rounded-[9px] group relative overflow-hidden",
          className
        )}
      >
        <span className="ml-4">{label}</span>
        <span
          className={cn(
            "relative size-8 md:size-10 rounded-[9px] bg-card mr-1 md:mr-1.5 overflow-hidden flex items-center justify-center",
            arrowSpanClassName
          )}
        >
          {/* First arrow moves out */}
          <ArrowUpRight className="absolute h-5 w-5 text-primary transition-transform duration-300 ease-out group-hover:-translate-y-[150%] group-hover:translate-x-[150%]" />

          {/* Second arrow moves in from further away to avoid pre-hover visibility */}
          <ArrowUpRight className="absolute h-5 w-5 text-primary transition-transform duration-300 ease-out translate-y-[150%] -translate-x-[150%] group-hover:translate-y-0 group-hover:translate-x-0" />
        </span>
      </Button>
    </Link>
  );
};

export default FlyingArrowLinkButton;
