import { RevelingHeadingProps } from "@/@types/Types";
import RevealYAxis from "./slide-in-y-axis";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

const RevelHeading: React.FC<RevelingHeadingProps> = ({
  heading,
  description,
  placeholderColor = '#00B8B8',
  className = '',
  headingClassName = '',
  descriptionClassName = '',
}) => {
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Main Heading */}
      <RevealYAxis className="text-center" placeHolderColor={placeholderColor}>
        <div className="flex items-center justify-center">
          {/* Line before text */}
          <div
            className={cn(
              "flex-grow h-[2.5px] rounded-full hidden sm:block bg-gradient-to-l to-primary-foreground"
            )}
            style={{ background: `linear-gradient(to left, ${placeholderColor}, var(--tw-gradient-to))` }}
          ></div>

          {/* Text */}
          <Label
            className={cn(
              "text-2xl sm:text-4xl uppercase font-semibold px-4 w-fit",
              headingClassName
            )}
            style={{ color: placeholderColor }}
          >
            {heading}
          </Label>

          {/* Line after text */}
          <div
            className={cn(
              "flex-grow h-[2.5px] rounded-full hidden sm:block bg-gradient-to-l to-primary-foreground"
            )}
            style={{ background: `linear-gradient(to right, ${placeholderColor}, var(--tw-gradient-to))` }}
          ></div>
        </div>
      </RevealYAxis>

      {/* Description */}
      {description && (
        <RevealYAxis
          className={`flex self-center w-auto sm:w-1/2 justify-center text-center ${descriptionClassName}`}
          placeHolderColor={placeholderColor}
        >
          <Label
            className="text-sm sm:text-lg text-primary"
          >
            {description}
          </Label>
        </RevealYAxis>
      )}
    </div>
  );
};

export default RevelHeading;
