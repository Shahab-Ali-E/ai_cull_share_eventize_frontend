// components/ui/LearnMoreButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LearnMoreButton {
  href: string;
  label: string;
}

const LearnMoreButton: React.FC<LearnMoreButton> = ({ href, label }) => {
  return (
    <Link href={href} passHref>
      <Button
        className={cn(
          "flex items-center text-sm font-medium py-2 px-3 rounded-lg gap-2 overflow-hidden relative group",
          "bg-primary text-card"
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "relative flex items-center justify-center w-6 h-6 rounded-full bg-card overflow-hidden"
          )}
        >
          {/* Arrow exiting */}
          <ArrowUpRight
            className="absolute w-4 h-4 text-primary transform transition-transform duration-300 ease-out
              group-hover:-translate-y-4 group-hover:translate-x-4"
          />
          {/* Arrow entering */}
          <ArrowUpRight
            className="absolute w-4 h-4 text-primary transform translate-y-3 -translate-x-3 transition-transform duration-300 ease-out
              group-hover:translate-y-0 group-hover:translate-x-0"
          />
        </span>
      </Button>
    </Link>
  );
};

export default LearnMoreButton;
