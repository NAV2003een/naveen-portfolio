import { useEffect, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";

/* ── helpers ── */
function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useGitHubStats() {
  const [stats, setStats] = useState({ repos: "—", followers: "—" });
  useEffect(() => {
    fetch("https://api.github.com/users/NAV2003een")
      .then((r) => r.json())
      .then((d) =>
        setStats({
          repos: String(d.public_repos ?? "—"),
          followers: String(d.followers ?? "—"),
        })
      )
      .catch(() => {});
  }, []);
  return stats;
}

/* ═══════════════════════════════════════════
   1. CYBER ROBOT
   ═══════════════════════════════════════════ */
interface RobotProps {
  onEmailClick: boolean;
  onLinkedInClick: boolean;
}

export function CyberRobot({ onEmailClick, onLinkedInClick }: RobotProps) {
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [wave, setWave] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setEye({ x: dx * 4, y: dy * 4 });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWave(true);
      setTimeout(() => setWave(false), 1000);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!onEmailClick) return;
    setWave(true);
    setTimeout(() => setWave(false), 1200);
  }, [onEmailClick]);

  useEffect(() => {
    if (!onLinkedInClick) return;
    setThumbsUp(true);
    setTimeout(() => setThumbsUp(false), 1500);
  }, [onLinkedInClick]);

  const ledFlash = onEmailClick || onLinkedInClick;

  return (
    <div ref={robotRef} className="flex flex-col items-center select-none">
      <svg
        width="120" height="160" viewBox="0 0 120 160" fill="none"
        style={{ filter: "drop-shadow(0 0 18px #5CF4E0) drop-shadow(0 0 40px rgba(92,244,224,0.4))" }}
      >
        <line x1="60" y1="8" x2="60" y2="24" stroke="#5CF4E0" strokeWidth="2" />
        <circle cx="60" cy="6" r="4" fill="#5CF4E0">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <rect x="28" y="24" width="64" height="50" rx="10" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
        <ellipse cx="44" cy="46" rx="10" ry="10" fill="#05080F" stroke="#5CF4E0" strokeWidth="1" />
        <ellipse cx="76" cy="46" rx="10" ry="10" fill="#05080F" stroke="#5CF4E0" strokeWidth="1" />
        <circle cx={44 + eye.x} cy={46 + eye.y} r="5" fill="#5CF4E0" style={{ transition: "cx 0.08s,cy 0.08s" }}>
          <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={76 + eye.x} cy={46 + eye.y} r="5" fill="#5CF4E0" style={{ transition: "cx 0.08s,cy 0.08s" }}>
          <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={46 + eye.x} cy={44 + eye.y} r="1.5" fill="white" opacity="0.8" />
        <circle cx={78 + eye.x} cy={44 + eye.y} r="1.5" fill="white" opacity="0.8" />
        <rect x="38" y="63" width="44" height="5" rx="2.5" fill="#05080F" stroke="#5CF4E0" strokeWidth="1" />
        <rect x="38" y="63" width="10" height="5" rx="2.5" fill="#5CF4E0" opacity="0.8">
          <animate attributeName="x" values="38;70;38" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="52" y="74" width="16" height="10" rx="3" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1" />
        <rect x="20" y="84" width="80" height="52" rx="10" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
        <rect x="34" y="94" width="52" height="30" rx="6" fill="#05080F" stroke="#5CF4E0" strokeWidth="1" opacity="0.8" />
        <circle cx="46" cy="104" r="4" fill={ledFlash ? "#ffffff" : "#5CF4E0"}>
          <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="104" r="4" fill={ledFlash ? "#ffffff" : "#A855F7"}>
          <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="74" cy="104" r="4" fill={ledFlash ? "#ffffff" : "#5CF4E0"}>
          <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <rect x="38" y="114" width="44" height="4" rx="2" fill="#05080F" stroke="#5CF4E0" strokeWidth="0.5" />
        <rect x="38" y="114" width="20" height="4" rx="2" fill="#5CF4E0" opacity="0.6">
          <animate attributeName="width" values="5;44;5" dur="3s" repeatCount="indefinite" />
        </rect>
        <g style={{
          transformOrigin: "20px 92px",
          transform: wave ? "rotate(-38deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}>
          <rect x="4" y="84" width="16" height="40" rx="8" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
          <circle cx="12" cy="128" r="6" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1" />
        </g>
        <g style={{
          transformOrigin: "108px 92px",
          transform: thumbsUp ? "rotate(-30deg) translateY(-8px)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}>
          <rect x="100" y="84" width="16" height="40" rx="8" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
          <circle cx="108" cy="128" r="6" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1" />
          {thumbsUp && (
            <text x="100" y="80" fontSize="14" textAnchor="middle" fill="#5CF4E0">👍</text>
          )}
        </g>
        <rect x="34" y="136" width="20" height="20" rx="5" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
        <rect x="66" y="136" width="20" height="20" rx="5" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1.5" />
        <rect x="30" y="152" width="26" height="8" rx="4" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1" />
        <rect x="62" y="152" width="26" height="8" rx="4" fill="#0D1B2A" stroke="#5CF4E0" strokeWidth="1" />
      </svg>
      <p className="font-mono text-[10px] mt-2 tracking-widest"
        style={{ color: "#5CF4E0", textShadow: "0 0 8px #5CF4E0" }}>
        {wave ? "👋 HI THERE!" : thumbsUp ? "👍 GREAT!" : "UNIT-NV01"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. STATUS FOX
   ═══════════════════════════════════════════ */
export function StatusFox() {
  const [hovered, setHovered] = useState(false);
  const [tick, setTick] = useState(0);
  const istTime = useISTClock();
  const gh = useGitHubStats();

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const sway = Math.sin(tick * 0.08) * 4;
  const tailSway = Math.sin(tick * 0.12) * 16;
  const isAvailable = true;
  const statusColor = isAvailable ? "#00FF88" : "#FF006E";
  const statusLabel = isAvailable ? "● OPEN TO WORK" : "● UNAVAILABLE";

  return (
    <div
      className="flex flex-col items-center select-none cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="100" height="120" viewBox="0 0 110 130" fill="none"
        style={{
          filter: `drop-shadow(0 0 14px ${statusColor}) drop-shadow(0 0 30px ${statusColor}66)`,
          transform: `rotate(${sway * 0.3}deg)`,
          transition: "transform 0.1s ease",
        }}>
        <g style={{ transformOrigin: "55px 115px", transform: `rotate(${tailSway}deg)`, transition: "transform 0.15s ease" }}>
          <polygon points="55,115 30,100 40,80 55,95 70,80 80,100" fill="#FF6B00" opacity="0.9" />
          <polygon points="55,115 40,95 55,90 70,95" fill="#FFD700" opacity="0.8" />
        </g>
        <polygon points="55,115 22,100 28,65 55,72 82,65 88,100" fill="#FF8C00" />
        <polygon points="55,72 35,85 55,115 75,85" fill="#FF6B00" />
        <polygon points="55,72 42,88 55,95 68,88" fill="#FFE0A0" opacity="0.9" />
        <polygon points="55,32 28,55 55,68 82,55" fill="#FF8C00" />
        <polygon points="55,32 38,50 55,58 72,50" fill="#FF6B00" />
        <polygon points="35,38 22,12 42,32" fill="#FF6B00"
          style={{ transformOrigin: "35px 38px", transform: hovered ? "rotate(-15deg) scaleY(1.3)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
        <polygon points="75,38 88,12 68,32" fill="#FF6B00"
          style={{ transformOrigin: "75px 38px", transform: hovered ? "rotate(15deg) scaleY(1.3)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
        <polygon points="35,36 26,18 40,33" fill="#FF006E" opacity="0.7" />
        <polygon points="75,36 84,18 70,33" fill="#FF006E" opacity="0.7" />
        <ellipse cx="43" cy="50" rx="5" ry="5" fill="#05080F" />
        <ellipse cx="67" cy="50" rx="5" ry="5" fill="#05080F" />
        <circle cx="44.5" cy="48.5" r="1.8" fill="white" opacity="0.9" />
        <circle cx="68.5" cy="48.5" r="1.8" fill="white" opacity="0.9" />
        <polygon points="55,56 47,62 55,66 63,62" fill="#FFE0A0" opacity="0.9" />
        <circle cx="55" cy="58" r="3" fill="#FF006E" opacity="0.8" />
        <circle cx="55" cy="90" r="6" fill={statusColor}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="30" cy="112" rx="10" ry="6" fill="#FF8C00" />
        <ellipse cx="80" cy="112" rx="10" ry="6" fill="#FF8C00" />
      </svg>

      <div className="mt-1 text-center">
        <p className="font-mono text-[9px] tracking-widest font-bold"
          style={{ color: statusColor, textShadow: `0 0 8px ${statusColor}` }}>
          {statusLabel}
        </p>
        {hovered && (
          <div className="mt-2 rounded-lg px-3 py-2 text-left"
            style={{
              background: "rgba(5,8,15,0.9)",
              border: `1px solid ${statusColor}55`,
              boxShadow: `0 0 12px ${statusColor}33`,
              minWidth: "140px",
            }}>
            <p className="font-mono text-[8px] text-white/50 mb-1">IST · COIMBATORE</p>
            <p className="font-mono text-[11px]" style={{ color: statusColor }}>{istTime}</p>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <p className="font-mono text-[8px] text-white/40">GITHUB STATS</p>
              <p className="font-mono text-[9px] text-white/70">{gh.repos} repos · {gh.followers} followers</p>
            </div>
          </div>
        )}
      </div>
      <p className="font-mono text-[9px] mt-1 tracking-widest text-white/30">
        {hovered ? "hover for stats" : "STATUS-FOX"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. COMM-DROID
   ═══════════════════════════════════════════ */
const AUTO_LINES = [
  "> system: NAVEEN PORTFOLIO v2.0",
  "> status: ONLINE · IST",
  "> role: SAP BTP + MERN Dev",
  "> email: naveenkumargp2003@gmail.com",
  "> type a message below ↓",
];

const BOT_REPLIES = [
  ">> message received! Naveen will reply soon ✓",
  ">> noted! expect a response within 24h ✓",
  ">> 📨 message logged. talk soon! ✓",
  ">> transmission successful. stay tuned ✓",
];

export function CommDroid({ onSend }: { onSend?: () => void }) {
  const [lines, setLines] = useState<string[]>([""]);
  const [autoIdx, setAutoIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [autoDone, setAutoDone] = useState(false);
  const [input, setInput] = useState("");
  const [blink, setBlink] = useState(true);
  const [sending, setSending] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoDone) return;
    if (autoIdx >= AUTO_LINES.length) { setAutoDone(true); return; }
    const line = AUTO_LINES[autoIdx];
    if (charIdx < line.length) {
      const id = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[autoIdx] = line.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, 30);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setAutoIdx((i) => i + 1);
        setCharIdx(0);
        setLines((prev) => [...prev, ""]);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [autoIdx, charIdx, autoDone]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setInput("");
    setSending(true);
    setLines((prev) => [...prev, `> you: ${msg}`, ">> sending..."]);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS is not configured");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          message: msg,
          name: "Portfolio Visitor",
          time: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        publicKey
      );
      setLines((prev) => {
        const next = [...prev];
        next[next.length - 1] = ">> ✓ message sent to Naveen directly!";
        return next;
      });
    } catch {
      setLines((prev) => {
        const next = [...prev];
        next[next.length - 1] = ">> ✓ message logged. Naveen will reply soon!";
        return next;
      });
    }

    setSending(false);
    if (onSend) onSend();
  }, [input, sending, onSend]);

  return (
    <div className="flex flex-col items-center select-none">
      <svg width="65" height="65" viewBox="0 0 70 70" fill="none"
        style={{ filter: "drop-shadow(0 0 10px #00FF88) drop-shadow(0 0 24px rgba(0,255,136,0.3))" }}>
        <line x1="35" y1="3" x2="35" y2="14" stroke="#00FF88" strokeWidth="1.5" />
        <circle cx="35" cy="2" r="3" fill="#00FF88">
          <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <rect x="12" y="14" width="46" height="38" rx="8" fill="#0D1B2A" stroke="#00FF88" strokeWidth="1.5" />
        <rect x="18" y="24" width="12" height="8" rx="3" fill="#05080F" stroke="#00FF88" strokeWidth="1" />
        <rect x="40" y="24" width="12" height="8" rx="3" fill="#05080F" stroke="#00FF88" strokeWidth="1" />
        <rect x="20" y="26" width="4" height="4" rx="1" fill="#00FF88">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="42" y="26" width="4" height="4" rx="1" fill="#00FF88">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="22" y="38" width="26" height="5" rx="2.5" fill="#05080F" stroke="#00FF88" strokeWidth="1" />
        <rect x="22" y="38" width="8" height="5" rx="2.5" fill="#00FF88" opacity="0.7">
          <animate attributeName="x" values="22;38;22" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="4" y="22" width="8" height="14" rx="4" fill="#0D1B2A" stroke="#00FF88" strokeWidth="1" />
        <rect x="58" y="22" width="8" height="14" rx="4" fill="#0D1B2A" stroke="#00FF88" strokeWidth="1" />
        <rect x="29" y="52" width="12" height="8" rx="3" fill="#0D1B2A" stroke="#00FF88" strokeWidth="1" />
      </svg>

      <div className="mt-1 rounded-xl overflow-hidden" style={{
        width: "210px",
        background: "rgba(5,8,15,0.95)",
        border: "1px solid rgba(0,255,136,0.45)",
        boxShadow: "0 0 16px rgba(0,255,136,0.25), 0 0 40px rgba(0,255,136,0.08), inset 0 0 20px rgba(0,255,136,0.04)",
      }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5"
          style={{ background: "rgba(0,255,136,0.07)", borderBottom: "1px solid rgba(0,255,136,0.18)" }}>
          <div className="w-2 h-2 rounded-full bg-red-500 opacity-70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-70" />
          <div className="w-2 h-2 rounded-full" style={{ background: "#00FF88", opacity: 0.7 }} />
          <span className="font-mono text-[8px] ml-1" style={{ color: "rgba(0,255,136,0.45)" }}>contact.sh</span>
          <a href="https://github.com/NAV2003een" target="_blank" rel="noopener noreferrer"
            className="ml-auto font-mono text-[8px] hover:opacity-100 transition-opacity"
            style={{ color: "rgba(0,255,136,0.5)" }}>
            GitHub ↗
          </a>
        </div>

        <div ref={termRef} className="p-2.5 overflow-y-auto" style={{ maxHeight: "120px" }}>
          {lines.map((line, i) => (
            <div key={i} className="font-mono text-[8.5px] leading-relaxed"
              style={{ color: line.startsWith(">>") ? "#FFD700" : "#00FF88" }}>
              {line}
              {i === lines.length - 1 && !autoDone && (
                <span style={{ opacity: blink ? 1 : 0 }}>▋</span>
              )}
            </div>
          ))}
        </div>

        {autoDone && (
          <div className="px-2.5 pb-2.5">
            <div className="flex gap-1.5 items-center rounded-lg px-2 py-1.5"
              style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.25)" }}>
              <span className="font-mono text-[8px]" style={{ color: "#00FF88" }}>{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="type a message..."
                maxLength={60}
                className="flex-1 bg-transparent outline-none font-mono text-[8.5px] placeholder-white/20"
                style={{ color: "#00FF88" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || sending}
                className="font-mono text-[8px] px-1.5 py-0.5 rounded transition-all"
                style={{
                  background: input.trim() ? "rgba(0,255,136,0.2)" : "transparent",
                  color: input.trim() ? "#00FF88" : "rgba(0,255,136,0.3)",
                  border: "1px solid rgba(0,255,136,0.3)",
                }}>
                {sending ? "…" : "SEND"}
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="font-mono text-[9px] mt-1.5 tracking-widest"
        style={{ color: "#00FF88", textShadow: "0 0 8px #00FF88" }}>
        COMM-DROID
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */
interface ContactCharactersProps {
  onEmailClick: boolean;
  onLinkedInClick: boolean;
  onDroidSend?: () => void;
}

export default function ContactCharacters({ onEmailClick, onLinkedInClick, onDroidSend }: ContactCharactersProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-end justify-center gap-6 md:gap-12 flex-wrap">
        <div style={{ animation: "floatFox 4s ease-in-out infinite" }}>
          <StatusFox />
        </div>
        <div style={{ animation: "floatRobot 3.5s ease-in-out infinite" }}>
          <CyberRobot onEmailClick={onEmailClick} onLinkedInClick={onLinkedInClick} />
        </div>
        <div style={{ animation: "floatDroid 5s ease-in-out infinite" }}>
          <CommDroid onSend={onDroidSend} />
        </div>
      </div>

      <style>{`
        @keyframes floatRobot {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes floatFox {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes floatDroid {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}