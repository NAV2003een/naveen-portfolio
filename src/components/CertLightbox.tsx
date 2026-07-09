import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CertLightboxProps {
  src: string | null;
  alt: string;
  onClose: () => void;
}

export default function CertLightbox({ src, alt, onClose }: CertLightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-10 md:p-10"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close certificate preview"
            className="fixed top-5 right-5 md:top-8 md:right-8 z-[101] w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-cyan-300 hover:glow-border transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-full rounded-2xl overflow-hidden glass glow-border"
          >
            <div className="border-beam beam-amber opacity-100 animate-[beam-cw_2.2s_linear_infinite]" />
            <img
              src={src}
              alt={alt}
              className="w-full h-full max-h-[80vh] object-contain bg-black/30"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
