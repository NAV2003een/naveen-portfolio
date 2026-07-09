import { useState } from "react";
import FadeIn from "../components/FadeIn";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";
import CertLightbox from "../components/CertLightbox";

const certs = [
  {
    title: "SAP Certified Back-End Developer – ABAP Cloud (SAP BTP)",
    org: "SAP SE",
    date: "Mar 2026",
    icon: "🏆",
    image: "/certs/sap-abap-cloud.jpg",
  },
  {
    title: "Oracle APEX Cloud Developer Certified Professional",
    org: "Oracle University",
    date: "Oct 2025",
    icon: "⭐",
    image: "/certs/oracle-apex-cloud.jpg",
  },
  {
    title: "AI using Model Context Protocol (MCP)",
    org: "CCBP 4.0 Academy",
    date: "Aug 2025",
    icon: "🤖",
    image: "/certs/mcp-project.jpg",
  },
];

export default function CertsSection() {
  const [activeCert, setActiveCert] = useState<{ src: string; alt: string } | null>(null);

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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex gap-3 md:gap-4 items-start">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCert({ src: cert.image, alt: cert.title })
                        }
                        aria-label={`View ${cert.title} certificate`}
                        className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden ring-1 ring-white/15 hover:ring-cyan-300/60 transition-all duration-300 cursor-zoom-in"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-5 h-5 text-white opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <path
                              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div>
                        <h3 className="font-display font-medium text-base md:text-lg group-hover:text-cyan-300 transition-colors">
                          {cert.icon} {cert.title}
                        </h3>
                        <p className="text-white/50 text-sm mt-1 group-hover:text-white/70 transition-colors">
                          {cert.org}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-cyan-300/80 group-hover:text-cyan-300 transition-colors whitespace-nowrap md:ml-4">
                      {cert.date}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <CertLightbox
          src={activeCert?.src ?? null}
          alt={activeCert?.alt ?? ""}
          onClose={() => setActiveCert(null)}
        />
      </section>
    </SectionTransitionWrapper>
  );
}