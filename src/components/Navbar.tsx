import { motion } from "framer-motion";

const links = [
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5"
    >
      <div className="font-display text-sm md:text-base tracking-widest uppercase">
        Naveen<span className="text-holo">.dev</span>
      </div>
      <ul className="flex gap-5 md:gap-8 font-mono text-xs md:text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-white/60 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}