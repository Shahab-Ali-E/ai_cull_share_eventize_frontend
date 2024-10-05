import { motion } from "framer-motion";

const splitText = (text: string, word = false) => {
  return word ? String(text).split(/(\s+)/) : String(text).split("");
};

export default function JumpingTextInstagram({
  text = "This is a jumping text effect",
  mode = "word",
  className,
  animate = false,
}: {
  text: string;
  className?: string;
  mode?: "word" | "character";
  animate?: boolean;
}) {
  const isWordMode = mode === "word";
  const nodes = splitText(text, isWordMode);

  return (
    <div className={className} key={text}>
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          initial={{ translateY: 30, rotate: -30, opacity: 0 }}
          animate={animate ? {
            opacity: [0, 0.5, 1],
            translateY: [30, -30, 0],
            rotate: [-30, 30, 0],
            transition: {
              type: "spring",
              damping: 8, // Reduced damping
              mass: 1,    // Reduced mass
              delay: (isWordMode ? 0.03 : 0.01) * index, // Reduced delay
              duration: 0.5, // Fixed duration
            },
          } : {}}
          className="inline-block origin-center"
          style={{ willChange: 'transform, opacity' }} // Optimize rendering
        >
          {node === " " ? "\u00A0" : node}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </div>
  );
}
