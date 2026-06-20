import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionTransitionWrapperProps {
  children: ReactNode;
  isActive?: boolean;
  delay?: number;
}

export default function SectionTransitionWrapper({
  children,
  isActive = false,
  delay = 0,
}: SectionTransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, skewX: -8, filter: "blur(4px)" }}
      whileInView={{
        opacity: 1,
        skewX: 0,
        filter: "blur(0px)",
      }}
      exit={{ opacity: 0, skewX: 8, filter: "blur(4px)" }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 15,
        delay,
      }}
      viewport={{ once: true, margin: "0px", amount: 0.3 }}
      style={{
        filter: isActive
          ? "drop-shadow(0 0 20px rgba(92, 244, 224, 0.6))"
          : "drop-shadow(0 0 10px rgba(92, 244, 224, 0.3))",
      }}
    >
      {children}
    </motion.div>
  );
}