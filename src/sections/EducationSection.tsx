import FadeIn from "../components/FadeIn";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

const education = [
  {
    school: "Karpagam College of Engineering",
    degree: "B.E. — Computer Science and Design",
    meta: "Coimbatore, India · 2022–2026 · GPA 7.5/10",
    icon: "🎓",
  },
  {
    school: "Senthil Matriculation Higher Secondary School",
    degree: "HSC — State Board",
    meta: "Dharmapuri, India · 2020–2021 · 78.6%",
    icon: "📚",
  },
  {
    school: "Sri Vijay Vidyalaya Matriculation Higher Secondary School",
    degree: "SSLC — State Board",
    meta: "Dharmapuri, India · 2018–2019 · 77.8%",
    icon: "📖",
  },
];

export default function EducationSection() {
  return (
    <SectionTransitionWrapper>
      <section id="education" className="relative px-6 md:px-12 py-24 md:py-32">
      <FadeIn className="mb-12 md:mb-16 text-center">
        <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow">
          04 — Education
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl">
          Academic <span className="text-holo">background</span>
        </h2>
      </FadeIn>

      <div className="max-w-3xl mx-auto space-y-4">
        {education.map((edu, i) => (
          <FadeIn key={edu.school} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <GlassCard className="p-5 md:p-6 group hover:glow-border transition-all duration-300">
                <div className="flex gap-3">
                  <span className="text-2xl">{edu.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-base md:text-lg group-hover:text-cyan-300 transition-colors">
                      {edu.school}
                    </h3>
                    <p className="text-white/60 text-sm mt-1 group-hover:text-white/80 transition-colors">
                      {edu.degree}
                    </p>
                    <p className="font-mono text-xs text-cyan-300/70 group-hover:text-cyan-300 transition-colors mt-2">
                      {edu.meta}
                    </p>
                  </div>
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