import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

/**
 * Subtle scroll-reveal wrapper. framer-motion automatically honours
 * prefers-reduced-motion at the OS level via the reduced-motion setting,
 * and our global CSS collapses transition/animation durations too.
 */
export default function Reveal({
  children,
  delay = 0,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
