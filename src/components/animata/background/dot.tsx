import { cn } from "@/lib/utils";

interface DotProps {
  /**
   * Color of the dot
   */
  color?: string;

  /**
   * Size of the dot in pixels
   */
  size?: number;

  /**
   * Spacing between dots
   */
  spacing?: number;

  /**
   * Content of the component
   */
  children?: React.ReactNode;

  /**
   * Class name
   */
  className?: string;

  style?: React.CSSProperties;
}

function Placeholder() {
  return (
    <div className="flex h-full min-h-64 w-full min-w-72 items-center justify-center">
      <div className="rounded px-4 py-2">This has dot background</div>
    </div>
  );
}

export default function Dot({
  color = "#cacaca",
  size = 1,
  spacing = 10,
  children,
  className,
  style = {
    backgroundColor: "transparent",
  },
}: DotProps) {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `
          linear-gradient(to top, transparent, rgba(0, 0, 0, 0.2) 50%),
          linear-gradient(to right, transparent, rgba(0, 0, 0, 0.2) 50%),
          linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2) 50%),
          linear-gradient(to left, transparent, rgba(0, 0, 0, 0.2) 50%),
          radial-gradient(${color} ${size}px, transparent ${size}px)
        `,
        backgroundSize: `calc(${spacing} * ${size}px) calc(${spacing} * ${size}px)`,
        backgroundPosition: "top left, top right, bottom left, bottom right, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat, repeat",
      }}
      className={cn(
        "",
        className
      )}
    >
      {children ?? <Placeholder />}
    </div>
  );
}
