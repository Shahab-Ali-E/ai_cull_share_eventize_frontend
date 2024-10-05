import React from "react";
interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;
  childern?:React.ReactNode,
  heading?:string
  className?: string;

}

export default function GlowingCard({
  fromColor = "#00B4B5",
  viaColor = "#EEB1CB",
  toColor = "#EEB1CB",
  children,
  className

}: GlowCardProps) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-r p-0.5 hover:shadow-[#00B4B5] hover:shadow-glow hover:brightness-150 ${className}`}
      style={{
        transition: " box-shadow 0.5s ease",
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
      }}
    >
      <div className="flex-1 flex-col gap-2 rounded-3xl bg-blue-950">
        <div className="flex-1 text-sm font-medium text-gray-100 text-opacity-80">
          {children}
        </div>
      </div>
    </div>
  );
}
