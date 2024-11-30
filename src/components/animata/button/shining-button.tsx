import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ShiningButtonProps {
  label: string;
  href?: string;
  className?: string;
  gradientColorLeft?: string;
  gradientColorRight?: string;
}

export default function ShiningButton({
  label,
  href = "#",
  className,
  gradientColorLeft = "#6095eb",
  gradientColorRight = "#F2B3C2",
}: ShiningButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group mt-6 inline-flex rounded-full border-4 p-1 border-transparent bg-transparent transition-all duration-500 hover:border-primary",
        className
      )}
    >
      <div
        style={{
          background: `linear-gradient(to top left, ${gradientColorLeft} 30%, ${gradientColorRight})`,
        }}
        className={cn(
          "relative flex items-center gap-2 overflow-hidden rounded-full font-bold text-white sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-5 md:py-3 lg:text-lg lg:px-6 lg:py-4 xl:text-xl xl:px-7 xl:py-4"
        )}
      >
        {label}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
          )}
        />
      </div>
    </Link>
  );
}
