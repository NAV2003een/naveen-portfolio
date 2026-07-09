import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";
import HolographicCore from "../components/HolographicCore";

const consoleLines = [
  "booting premium console...",
  "initializing: Naveen Kumar G",
  "stack: ABAP Cloud | MERN | Clean Core",
  "mode: enterprise-grade",
  "status: ready_to_build ✓",
];

export default function HeroSection() {
  return (
    <SectionTransitionWrapper>
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void pointer-events-none" />

        <HolographicCore />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(5,8,15,0.55), transparent 70%)" }}
        />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300 mb-6 glass glow-border rounded-full px-5 py-2 neon-glow text-center"
          >
            SAP Certified · ABAP Cloud · MERN Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="font-display font-bold text-center leading-[1.05] text-[12vw] md:text-[7vw] lg:text-[6vw] text-holo neon-glow"
          >
            Naveen Kumar G
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="text-holo font-display font-semibold text-center text-xl md:text-3xl lg:text-4xl mt-4"
          >
            ABAP Cloud Developer &amp; MERN Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="text-white/60 text-center max-w-2xl mt-6 text-sm md:text-base leading-relaxed"
          >
            Building enterprise solutions on SAP BTP with ABAP RAP, CDS Views and
            Clean Core principles. Full-stack web developer with MongoDB, Express,
            React and Node.js. Fast, scalable, and production-ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
            className="flex flex-wrap gap-4 justify-center mt-12"
          >
            <MagneticButton href="#projects" variant="primary">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">Get in Touch</MagneticButton>
            <motion.a
              href="/717822D133-Naveenkumar G SD (2).pdf"
              download="Naveen_Kumar_G_Resume.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 glass"
              style={{
                border: "1px solid rgba(168,85,247,0.4)",
                color: "#A855F7",
                boxShadow: "0 0 0 0 rgba(168,85,247,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(168,85,247,0.4)";
              }}
            >
              ⬇ Download CV
            </motion.a>
          </motion.div>

          {/* Console — fixed: no double > */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
            className="glass glow-border rounded-2xl mt-16 px-6 py-5 font-mono text-xs md:text-sm w-full max-w-md mx-auto backdrop-blur-xl"
          >
            {consoleLines.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                className="text-cyan-300 mb-1.5 last:mb-0 neon-glow"
              >
                <span className="text-violet-400">{">"}</span> {line}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-cyan-300/50 text-xs font-mono uppercase tracking-widest">
            Scroll to explore
          </div>
        </motion.div>
      </section>
    </SectionTransitionWrapper>
  );
}