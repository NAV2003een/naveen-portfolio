import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface HolomorphicMorphProps {
  className?: string;
  children?: ReactNode;
}

export default function HolographicMorph({ className = "", children }: HolomorphicMorphProps) {
  return (
    <motion.div
      className={`holographic-morph ${className}`}
      initial={{ opacity: 0.95 }}
      animate={{ rotate: [0, 1, -1, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}

      <style>{`
        .holographic-morph {
          position: relative;
          display: inline-block;
          padding: 14px 22px;
          border-radius: 16px;
          color: inherit;
          background: linear-gradient(120deg, rgba(0,246,255,0.12), rgba(155,76,255,0.12), rgba(255,239,107,0.08));
          background-size: 300% 300%;
          box-shadow: 0 8px 30px rgba(15,23,42,0.6);
          overflow: hidden;
          backdrop-filter: blur(6px) saturate(120%);
          -webkit-backdrop-filter: blur(6px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.04);
          animation: moveGradient 8s ease infinite;
        }

        .holographic-morph::before {
          content: "";
          position: absolute;
          inset: -20% -10% -20% -10%;
          background: linear-gradient(60deg, rgba(0,246,255,0.06), rgba(155,76,255,0.06), rgba(255,239,107,0.04));
          mix-blend-mode: overlay;
          filter: blur(18px);
          transform: translateZ(0);
          animation: morph 6s ease-in-out infinite;
        }

        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes morph {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.9; }
          50% { transform: translateY(-6px) rotate(-2deg) scale(1.02); opacity: 0.95; }
          100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.9; }
        }

        /* small helper to make text readable when placed inside */
        .holographic-morph > * { position: relative; z-index: 2; }
      `}</style>
    </motion.div>
  );
}
