import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ElementType, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  y?: number;
  style?: React.CSSProperties;
}

export default function FadeIn({
  children,
  className = "",
  as = "div",
  delay = 0,
  duration = 0.7,
  y = 24,
  style,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px", amount: 0 });

  const MotionTag = motion(as as any);

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}