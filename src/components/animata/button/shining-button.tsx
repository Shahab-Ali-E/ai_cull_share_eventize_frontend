import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ShiningButtonProps {
  label: string;
  href?: string;
  className?: string;
}

export default function ShiningButton({ label, href, className }: ShiningButtonProps) {
  return (
    <Link
      href={href ? href : ""}
      className={cn(
        "group mt-6 inline-flex rounded-full border-4 p-1 border-transparent bg-transparent transition-all duration-500 hover:border-white",
        className
      )}
    >
      <div className="relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-tl from-[#6095eb] from-30% to-[#F2B3C2] font-bold text-white xl:text-xl xl:px-7 xl:py-4 lg:text-xl lg:px-6 lg:py-4 md:text-lg md:px-5 md:py-3 sm:text-base">
        {label}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
          )}
        />
      </div>
    </Link>
  );
}
