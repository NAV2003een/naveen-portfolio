import FadeIn from "../components/FadeIn";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

const certs = [
  {
    title: "SAP Certified Back-End Developer – ABAP Cloud (SAP BTP)",
    org: "SAP SE",
    date: "Mar 2026",
    icon: "🏆",
  },
  {
    title: "Oracle Certified Foundations Associate",
    org: "Oracle University",
    date: "Oct 2025",
    icon: "⭐",
  },
  {
    title: "AI using Model Context Protocol (MCP)",
    org: "CCBP 4.0 Academy",
    date: "Aug 2025",
    icon: "🤖",
  },
];

export default function CertsSection() {
  return (
    <SectionTransitionWrapper>
      <section id="certs" className="relative px-6 md:px-12 py-24 md:py-32">
        <FadeIn className="mb-12 md:mb-16 text-center">
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow">
            04 — Certifications
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Verified <span className="text-holo">credentials</span>
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-4">
          {certs.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <GlassCard className="p-5 md:p-6 group hover:glow-border transition-all duration-300">
                  <div className="border-beam beam-amber" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <h3 className="font-display font-medium text-base md:text-lg group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-white/50 text-sm mt-1 group-hover:text-white/70 transition-colors">
                          {cert.org}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-cyan-300/80 group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </SectionTransitionWrapper>
  );
}