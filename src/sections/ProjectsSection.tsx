import FadeIn from "../components/FadeIn";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

interface Project {
  num: string;
  title: string;
  date: string;
  tags: string[];
  points: string[];
}

const projects: Project[] = [
  {
    num: "01",
    title: "SAP BTP Asset Management System",
    date: "Apr 2026",
    tags: ["SAP BTP", "ABAP RAP", "CDS Views", "OData V2", "Fiori Elements"],
    points: [
      "Custom Validations and Actions in RAP enforcing consistent asset status transitions.",
      "Dynamic Fiori Elements dashboard via OData V2 for real-time asset monitoring.",
      "Analytical CDS Views aggregating maintenance costs and depreciation data.",
    ],
  },
  {
    num: "02",
    title: "SAP BTP Cloud-Native Expense Management System",
    date: "Apr 2026",
    tags: ["SAP BTP", "ABAP RAP", "OData V4", "EML"],
    points: [
      "Automated Approval Workflow using RAP Actions and Side Effects with real-time UI updates.",
      "Authorization checks and field control logic protecting sensitive financial data.",
    ],
  },
  {
    num: "03",
    title: "AI Workflows & Social Media Automation",
    date: "Jan 2026",
    tags: ["Make (Integromat)", "Google Gemini AI", "Telegram API"],
    points: [
      "End-to-end AI automation engine distributing content across LinkedIn, Facebook and Telegram.",
      "Gemini AI integration for content summarization and post generation with parallel processing.",
      "Error-handling with retry mechanisms ensuring 100% workflow reliability.",
    ],
  },
  {
    num: "04",
    title: "AI Workflow Integration using MCP",
    date: "Aug 2025",
    tags: ["MCP", "Cursor IDE", "Pipedream", "REST APIs"],
    points: [
      "Scalable AI toolchain integrating MCP Servers with Cursor IDE and Pipedream.",
      "Context-aware automation improving response accuracy by 25%.",
      "API-driven toolchains reducing manual SDLC effort by 30%.",
    ],
  },
];

function ProjectCard({
  project,
  index,
  side,
}: {
  project: Project;
  index: number;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <GlassCard className="p-6 md:p-8 h-full flex flex-col group hover:glow-border transition-all duration-300">
          {isLeft ? (
            <div className="border-beam-ccw beam-pink" />
          ) : (
            <div className="border-beam" />
          )}

          <div className="flex justify-between items-start mb-4">
            <span className="font-display font-extrabold text-4xl md:text-5xl text-white/10 group-hover:text-cyan-300/20 transition-colors">
              {project.num}
            </span>
            <span className="font-mono text-xs text-cyan-300/70 group-hover:text-cyan-300 transition-colors">
              {project.date}
            </span>
          </div>

          <h3 className="font-display font-semibold text-lg md:text-2xl mb-3 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                className="font-mono text-[10px] md:text-xs px-2.5 py-1 rounded-full border border-cyan-300/20 text-cyan-300/80 bg-cyan-300/5 group-hover:border-cyan-300/50 group-hover:text-cyan-300 transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <ul className="space-y-2 mt-auto">
            {project.points.map((point) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-white/60 text-sm flex gap-2 group-hover:text-white/80 transition-colors"
              >
                <span
                  className={`mt-0.5 transition-colors ${
                    isLeft
                      ? "text-pink-500 group-hover:text-neon-pink"
                      : "text-violet-400 group-hover:text-purple-300"
                  }`}
                >
                  ▸
                </span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
    </FadeIn>
  );
}

export default function ProjectsSection() {
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 !== 0);

  return (
    <SectionTransitionWrapper>
      <section id="projects" className="relative px-6 md:px-12 py-24 md:py-32">
        <FadeIn className="mb-12 md:mb-16 text-center">
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow">
            02 — Selected Work
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Projects &amp; <span className="text-holo">builds</span>
          </h2>
          <div className="flex justify-center gap-6 mt-4">
            <span className="font-mono text-[10px] text-pink-400/70 flex items-center gap-1.5">
              <span className="inline-block w-3 h-[2px] bg-pink-500 rounded" />
              
            </span>
            <span className="font-mono text-[10px] text-violet-400/70 flex items-center gap-1.5">
              <span className="inline-block w-3 h-[2px] bg-violet-400 rounded" />
              
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col gap-5 md:gap-6">
            {leftProjects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i * 2} side="left" />
            ))}
          </div>
          <div className="flex flex-col gap-5 md:gap-6 md:mt-10">
            {rightProjects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i * 2 + 1} side="right" />
            ))}
          </div>
        </div>
      </section>
    </SectionTransitionWrapper>
  );
}