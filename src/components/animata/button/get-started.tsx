import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IGetStartedButtonProps {
  text: string;
  className?: string;
}

export default function GetStartedButton({
  text = "Book a Call",
  className,
}: IGetStartedButtonProps) {
  return (
    <div className="min-h-12 w-auto">
      <button
        className={cn(
          "group flex items-center gap-3 rounded-xl bg-white px-4 py-2 text-black font-medium border border-gray-300 shadow-md transition-all hover:shadow-lg",
          className
        )}
      >
        <span>{text}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black p-1 transition-all">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </button>
    </div>
  );
}
