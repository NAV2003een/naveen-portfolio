import FadeIn from "../components/FadeIn";
import MagneticButton from "../components/MagneticButton";
import SignatureCore from "../components/SignatureCore";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

export default function ContactSection() {
  return (
    <SectionTransitionWrapper>
      <section id="contact" className="relative px-6 md:px-12 py-24 md:py-32 text-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-cyan-300 to-violet-400 opacity-5 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <FadeIn>
        <SignatureCore className="w-72 h-72 md:w-96 md:h-96 mb-2" />
        <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow">
          05 — Contact
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl md:text-5xl mb-4"
        >
          Let&rsquo;s build something <span className="text-holo">extraordinary</span>
        </motion.h2>
        <p className="text-white/60 max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed">
          Open to SAP BTP / ABAP Cloud and MERN stack developer roles, freelance
          projects, and innovative collaborations. Let's create something amazing.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-4">
        <MagneticButton href="mailto:naveenkumargp2003@gmail.com" variant="primary">
          ✉️ Email Me
        </MagneticButton>
        <MagneticButton href="tel:+918489952154" variant="secondary">
          📞 Call Me
        </MagneticButton>
        <MagneticButton href="https://www.linkedin.com/in/naveenkumarg2003" variant="secondary" target="_blank" rel="noopener noreferrer">
          💼 LinkedIn
        </MagneticButton>
        <MagneticButton href="https://github.com/NAV2003een" variant="secondary" target="_blank" rel="noopener noreferrer">
          🐙 GitHub
        </MagneticButton>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-16 font-mono text-xs text-white/30">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          © 2026 Naveen Kumar G · Coimbatore, India
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-cyan-300/50"
        >
          Building Clean Core solutions, one line at a time.
        </motion.p>
      </FadeIn>
    </section>
    </SectionTransitionWrapper>
  );
}