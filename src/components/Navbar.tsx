import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Hero",      href: "#hero",      color: "#5CF4E0", shadow: "rgba(92,244,224,0.5)"  },
  { label: "Stack",     href: "#stack",     color: "#38BDF8", shadow: "rgba(56,189,248,0.5)"  },
  { label: "Projects",  href: "#projects",  color: "#A855F7", shadow: "rgba(168,85,247,0.5)"  },
  { label: "Education", href: "#education", color: "#00FF88", shadow: "rgba(0,255,136,0.5)"   },
  { label: "Certs",     href: "#certs",     color: "#FFAB40", shadow: "rgba(255,171,64,0.5)"  },
  { label: "Contact",   href: "#contact",   color: "#FF006E", shadow: "rgba(255,0,110,0.5)"   },
];

export default function Navbar() {
  const [active, setActive]     = useState("hero");
  const [hovered, setHovered]   = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];
    LINKS.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });
    return () => observersRef.current.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg,#5CF4E0,#A855F7,#FF006E)",
            boxShadow: "0 0 8px #5CF4E0, 0 0 16px rgba(92,244,224,0.4)",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-[2px] left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4"
        style={{ background: "transparent" }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          className="font-display text-sm md:text-base tracking-widest uppercase hover:opacity-80 transition-opacity"
          style={{ textShadow: "0 0 20px rgba(92,244,224,0.4)" }}
        >
          Naveen<span className="text-holo">.dev</span>
        </a>

        {/* Desktop pill buttons */}
        <ul className="hidden md:flex gap-2 lg:gap-3">
          {LINKS.map((link) => {
            const id       = link.href.replace("#", "");
            const isActive = active === id;
            const isHovered = hovered === id;
            const lit      = isActive || isHovered;   // ← glow on EITHER
            const rgb      = hexToRgb(link.color);
            return (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative block font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-all duration-200 overflow-hidden"
                  style={{
                    color: lit ? link.color : "rgba(255,255,255,0.45)",
                    background: lit
                      ? `rgba(${rgb},0.12)`
                      : "rgba(255,255,255,0.04)",
                    border: lit
                      ? `1px solid ${link.color}88`
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: lit
                      ? `0 0 12px ${link.shadow}, 0 0 24px ${link.shadow}55, inset 0 0 12px rgba(${rgb},0.15)`
                      : "none",
                    textShadow: lit ? `0 0 8px ${link.color}` : "none",
                    transform: isHovered && !isActive ? "scale(1.08) translateY(-1px)" : "scale(1)",
                  }}
                >
                  {/* Running beam on active OR hover */}
                  {lit && (
                    <span
                      className="border-beam"
                      style={{
                        "--beam-r": parseInt(link.color.slice(1, 3), 16),
                        "--beam-g": parseInt(link.color.slice(3, 5), 16),
                        "--beam-b": parseInt(link.color.slice(5, 7), 16),
                      } as React.CSSProperties}
                    />
                  )}
                  {link.label}
                </motion.a>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: menuOpen ? "rgba(92,244,224,0.08)" : "rgba(5,8,15,0.5)",
            border: "1px solid rgba(92,244,224,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.22 }}
            className="block w-5 h-[1.5px] bg-cyan-300 rounded-full origin-center" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.18 }}
            className="block w-5 h-[1.5px] bg-cyan-300 rounded-full" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.22 }}
            className="block w-5 h-[1.5px] bg-cyan-300 rounded-full origin-center" />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[58px] left-4 right-4 z-40 rounded-2xl overflow-hidden md:hidden"
            style={{
              background: "rgba(5,8,15,0.92)",
              border: "1px solid rgba(92,244,224,0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 0 40px rgba(92,244,224,0.06), 0 24px 60px rgba(0,0,0,0.7)",
            }}
          >
            <ul className="flex flex-col p-2 gap-1">
              {LINKS.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                const rgb = hexToRgb(link.color);
                return (
                  <motion.li key={link.href}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200"
                      style={{
                        color: isActive ? link.color : "rgba(255,255,255,0.5)",
                        background: isActive ? `rgba(${rgb},0.1)` : "transparent",
                        border: isActive ? `1px solid ${link.color}44` : "1px solid transparent",
                        boxShadow: isActive ? `0 0 12px ${link.shadow}33` : "none",
                        textShadow: isActive ? `0 0 6px ${link.color}` : "none",
                      }}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: isActive ? link.color : "rgba(255,255,255,0.15)",
                          boxShadow: isActive ? `0 0 6px ${link.color}` : "none",
                        }} />
                      {link.label}
                      {isActive && (
                        <span className="ml-auto font-mono text-[8px] px-2 py-0.5 rounded-full"
                          style={{ color: link.color, background: `rgba(${rgb},0.15)`, border: `1px solid ${link.color}30` }}>
                          ACTIVE
                        </span>
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="px-4 py-3 mx-2 mb-2 rounded-xl flex items-center gap-2"
              style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.1)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88" }} />
              <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "rgba(0,255,136,0.6)" }}>
                Naveen Kumar G · Open to work
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}