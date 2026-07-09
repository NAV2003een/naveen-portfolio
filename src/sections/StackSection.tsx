import FadeIn from "../components/FadeIn";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

const stackGroups = [
  {
    title: "SAP Core",
    items: ["ABAP RAP", "OO ABAP", "CDS Views", "EML", "OData V2/V4", "Fiori Elements", "S/4HANA Cloud"],
    icon: "⚙️",
  },
  {
    title: "MERN Stack",
    items: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "JavaScript / TypeScript"],
    icon: "🚀",
  },
  {
    title: "SAP Tools",
    items: ["BTP Cockpit", "ADT (Eclipse)", "BAPI/BADI", "RFC", "AMDP", "SAP UI5"],
    icon: "🛠️",
  },
  {
    title: "Cloud & DevOps",
    items: ["Docker", "Jenkins", "Kubernetes", "AWS (EC2, S3, IAM, VPC)"],
    icon: "☁️",
  },
  {
    title: "Databases",
    items: ["SAP HANA", "MySQL", "MongoDB"],
    icon: "🗄️",
  },
  {
    title: "Automation & AI",
    items: ["Selenium", "MCP", "Make (Integromat)", "Google Gemini AI"],
    icon: "🤖",
  },
];

export default function StackSection() {
  return (
    <SectionTransitionWrapper>
      <section id="stack" className="relative px-6 md:px-12 py-24 md:py-32 bg-gradient-to-b from-void to-void">
        <motion.div
          className="absolute top-0 left-0 right-0 h-[45vh] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(92,244,224,0.14), transparent 70%)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          aria-hidden="true"
        />
      <FadeIn className="mb-12 md:mb-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow"
        >
          01 — Tech Stack
        </motion.p>
        <h2 className="font-display font-bold text-3xl md:text-5xl">
          What I work <span className="text-holo">with</span>
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
        {stackGroups.map((group, i) => (
          <FadeIn key={group.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <GlassCard className="p-6 md:p-8 h-full group hover:glow-border transition-all duration-300">
                <div className="border-beam beam-cyan" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{group.icon}</span>
                  <h3 className="font-display font-semibold text-lg md:text-xl text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, idx) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="font-mono text-[11px] md:text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/70 bg-white/[0.03] group-hover:border-cyan-300/30 group-hover:text-cyan-300/90 transition-all duration-300"
                    >
                      {item}
                    </motion.span>
                  ))}
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