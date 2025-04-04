import Link from "next/link";
import React from "react";

function CullingGetStartedButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="relative inline-flex h-14 w-64 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform transition-transform duration-300 hover:scale-105"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full text-lg font-semibold font-inter cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-white backdrop-blur-3xl">
        Get Started
      </span>
    </Link>
  );
}

export default CullingGetStartedButton;
