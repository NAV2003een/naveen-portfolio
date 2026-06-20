import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
}

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (onClick) onClick();
    emitSmoke();
  };

  const emitSmoke = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const newParticles: SmokeParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
      y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 60,
    }));
    setSmokeParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setSmokeParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 600);
  };

  const className = `
    magnetic-btn font-mono text-xs md:text-sm uppercase tracking-wider 
    px-6 py-3 rounded-full font-medium transition-all duration-300
    relative overflow-hidden
    ${
      variant === "primary"
        ? "gradient-btn text-void"
        : "glass glow-border text-white hover:text-cyan-300"
    }
  `;

  const motionProps = {
    style: {
      x: position.x,
      y: position.y,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <>
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={className}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          {...motionProps}
        >
          {children}
        </motion.a>
        {smokeParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-white to-gray-400 pointer-events-none"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y + (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={handleClick}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        {...motionProps}
      >
        {children}
      </motion.button>
      {smokeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-white to-gray-400 pointer-events-none blur-sm"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}