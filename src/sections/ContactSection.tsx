import { useState } from "react";
import FadeIn from "../components/FadeIn";
import ContactCharacters from "../components/ContactCharacters";
import { motion } from "framer-motion";
import SectionTransitionWrapper from "../components/SectionTransitionWrapper";

const LINKS = [
  {
    label: "Email Me",
    icon: "✉️",
    href: "mailto:naveenkumargp2003@gmail.com",
    color: "#5CF4E0",
    shadow: "rgba(92,244,224,0.4)",
    key: "email",
  },
  {
    label: "Call Me",
    icon: "📞",
    href: "tel:+918489952154",
    color: "#A855F7",
    shadow: "rgba(168,85,247,0.4)",
    key: "phone",
  },
  {
    label: "LinkedIn",
    icon: "💼",
    href: "https://www.linkedin.com/in/naveenkumarg2003",
    color: "#38BDF8",
    shadow: "rgba(56,189,248,0.4)",
    key: "linkedin",
    target: "_blank",
  },
  {
    label: "GitHub",
    icon: "🐙",
    href: "https://github.com/NAV2003een",
    color: "#ffffff",
    shadow: "rgba(255,255,255,0.2)",
    key: "github",
    target: "_blank",
  },
];

export default function ContactSection() {
  const [emailClicked, setEmailClicked] = useState(false);
  const [linkedInClicked, setLinkedInClicked] = useState(false);
  const [droidActive, setDroidActive] = useState(false);

  const handleClick = (key: string) => {
    if (key === "email") setEmailClicked((v) => !v);
    if (key === "linkedin") setLinkedInClicked((v) => !v);
  };

  const handleDroidSend = () => {
    setDroidActive(true);
    setTimeout(() => setDroidActive(false), 3000);
  };

  return (
    <SectionTransitionWrapper>
      <section
        id="contact"
        className="relative px-6 md:px-12 py-24 md:py-32 text-center overflow-hidden"
      >
        {/* Background blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-cyan-300 to-violet-400 opacity-5 blur-3xl pointer-events-none"
          animate={{ x: [0, 80, 0], y: [0, 80, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-to-r from-green-400 to-cyan-300 opacity-5 blur-3xl pointer-events-none"
          animate={{ x: [0, -60, 0], y: [0, -60, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <FadeIn>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 mb-3 neon-glow">
            05 — Contact
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl md:text-5xl mb-4"
          >
            Let&rsquo;s build something{" "}
            <span className="text-holo">extraordinary</span>
          </motion.h2>
          <p className="text-white/60 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Open to SAP BTP / ABAP Cloud and MERN stack developer roles,
            freelance projects, and innovative collaborations.
          </p>
        </FadeIn>

        {/* Characters row */}
        <FadeIn delay={0.05}>
          <ContactCharacters
            onEmailClick={emailClicked}
            onLinkedInClick={linkedInClicked}
            onDroidSend={handleDroidSend}
          />
        </FadeIn>

        {/* Hint text */}
        <p className="font-mono text-[10px] text-white/30 text-center mt-3 mb-2 uppercase tracking-widest">
          ↑ click email or linkedin buttons to interact with UNIT-NV01
        </p>

        {/* Buttons */}
        <FadeIn delay={0.15} className="mt-10 flex flex-wrap justify-center gap-4">
          {LINKS.map((link) => (
            <motion.a
              key={link.key}
              href={link.href}
              target={"target" in link ? link.target : undefined}
              rel={"target" in link ? "noopener noreferrer" : undefined}
              onClick={() => handleClick(link.key)}
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-wider px-6 py-3 rounded-full font-medium transition-all duration-300 glass relative overflow-hidden"
              style={{ border: `1px solid ${link.color}44`, color: link.color }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${link.shadow}, 0 0 40px ${link.shadow}`;
                (e.currentTarget as HTMLElement).style.borderColor = link.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = `${link.color}44`;
              }}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
              <div className="border-beam" style={{
                "--beam-r": parseInt(link.color.slice(1,3), 16) || 92,
                "--beam-g": parseInt(link.color.slice(3,5), 16) || 244,
                "--beam-b": parseInt(link.color.slice(5,7), 16) || 224,
              } as React.CSSProperties} />
            </motion.a>
          ))}
        </FadeIn>

        {/* Droid confirmation */}
        {droidActive && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs mt-4"
            style={{ color: "#00FF88", textShadow: "0 0 8px #00FF88" }}
          >
            📨 Message received by COMM-DROID — Naveen will reply soon!
          </motion.p>
        )}

        {/* Footer */}
        <FadeIn delay={0.25} className="mt-16 font-mono text-xs text-white/30">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            © 2026 Naveen Kumar G · Coimbatore, India
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-2 text-cyan-300/50"
          >
            Building Clean Core solutions, one line at a time.
          </motion.p>
        </FadeIn>
      </section>
    </SectionTransitionWrapper>
  );
}