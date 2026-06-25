import { useRef, useMemo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const CYAN = new THREE.Color("#5CF4E0");
const VIOLET = new THREE.Color("#7C5CFF");
const PARTICLE_COUNT_DESKTOP = 1400;
const PARTICLE_COUNT_MOBILE = 700;
const NODE_RADIUS = 3.4;

// Edit these to change the constellation labels
const SKILLS = [
  { label: "SAP BTP", sub: "ABAP RAP · CDS Views" },
  { label: "ABAP Cloud", sub: "Clean Core" },
  { label: "React", sub: "MERN Frontend" },
  { label: "Node.js", sub: "Express · MongoDB" },
  { label: "AI Workflows", sub: "Make + Gemini" },
  { label: "MCP", sub: "Model Context Protocol" },
];

function randomInSphere(radius: number) {
  const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
  const r = radius * Math.cbrt(Math.random());
  return dir.multiplyScalar(r);
}

function buildShell(count: number, radius: number, nodeCenters: THREE.Vector3[]) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const nodeTargets = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodeCount = nodeCenters.length;

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const jitter = radius * (0.94 + Math.random() * 0.16);

    positions[i * 3] = x * jitter;
    positions[i * 3 + 1] = y * jitter;
    positions[i * 3 + 2] = z * jitter;

    const t = Math.pow(Math.random(), 2.2);
    const c = CYAN.clone().lerp(VIOLET, t * 0.6);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 2.2 + 0.8;

    const center = nodeCenters[i % nodeCount];
    const offset = randomInSphere(0.22);
    nodeTargets[i * 3] = center.x + offset.x;
    nodeTargets[i * 3 + 1] = center.y + offset.y;
    nodeTargets[i * 3 + 2] = center.z + offset.z;
  }

  return { positions, colors, sizes, nodeTargets };
}

const vertexShader = `
  attribute float aSize;
  attribute vec3 color;
  attribute vec3 aNodeTarget;
  uniform float uProgress;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec3 shellPos = position;
    vec3 mixed = mix(shellPos, aNodeTarget, uProgress);
    vec3 bulgeDir = normalize(mix(shellPos, aNodeTarget, 0.5) + 0.0001);
    float bulge = sin(uProgress * 3.14159265) * 0.6;
    vec3 finalPos = mixed + bulgeDir * bulge;
    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_PointSize = aSize * (14.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function CoreParticles({
  count,
  reducedMotion,
  progressRef,
  nodeCenters,
}: {
  count: number;
  reducedMotion: boolean;
  progressRef: { current: number };
  nodeCenters: THREE.Vector3[];
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, nodeTargets } = useMemo(
    () => buildShell(count, 2.2, nodeCenters),
    [count, nodeCenters]
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aNodeTarget", new THREE.BufferAttribute(nodeTargets, 3));
    return geo;
  }, [positions, colors, sizes, nodeTargets]);

  const uniforms = useMemo(() => ({ uProgress: { value: 0 } }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressRef.current;
    }
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    const breathe = 1 + Math.sin(t * 0.6) * 0.03;
    pointsRef.current.scale.setScalar(breathe);
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreWireframe({ reducedMotion, progressRef }: { reducedMotion: boolean; progressRef: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.35 * (1 - progressRef.current * 0.85);
    }
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = -t * 0.08;
    meshRef.current.rotation.x = t * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshBasicMaterial ref={materialRef} color="#5CF4E0" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function ConstellationLabels({ nodeCenters, visible }: { nodeCenters: THREE.Vector3[]; visible: boolean }) {
  return (
    <>
      {SKILLS.map((skill, i) => (
        <group key={skill.label} position={nodeCenters[i]}>
          <Html center occlude={false} style={{ pointerEvents: "none" }}>
            <AnimatePresence>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 8 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass glow-border rounded-xl px-3 py-2 whitespace-nowrap text-center"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-300 neon-glow">
                    {skill.label}
                  </div>
                  <div className="text-[10px] text-white/50 mt-0.5">{skill.sub}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </Html>
        </group>
      ))}
    </>
  );
}

const BEAM_TRAILS_PER_NODE = 5;
const BEAM_TRAVEL_DISTANCE = 4.5;

const beamVertexShader = `
  attribute float aPhase;
  attribute vec3 aNodeCenter;
  uniform float uTime;
  uniform float uActive;
  varying float vAlpha;
  void main() {
    float loopT = fract(uTime * 0.35 + aPhase);
    vec3 pos = aNodeCenter;
    pos.y -= loopT * ${BEAM_TRAVEL_DISTANCE.toFixed(1)};
    vAlpha = (1.0 - loopT) * uActive;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 7.0 * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const beamFragmentShader = `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(0.36, 0.96, 0.88, alpha);
  }
`;

function EnergyBeams({
  nodeCenters,
  progressRef,
}: {
  nodeCenters: THREE.Vector3[];
  progressRef: { current: number };
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const count = nodeCenters.length * BEAM_TRAILS_PER_NODE;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const centers = new Float32Array(count * 3);

    let idx = 0;
    for (let n = 0; n < nodeCenters.length; n++) {
      for (let t = 0; t < BEAM_TRAILS_PER_NODE; t++) {
        positions[idx * 3] = nodeCenters[n].x;
        positions[idx * 3 + 1] = nodeCenters[n].y;
        positions[idx * 3 + 2] = nodeCenters[n].z;
        centers[idx * 3] = nodeCenters[n].x;
        centers[idx * 3 + 1] = nodeCenters[n].y;
        centers[idx * 3 + 2] = nodeCenters[n].z;
        phases[idx] = t / BEAM_TRAILS_PER_NODE;
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aNodeCenter", new THREE.BufferAttribute(centers, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, [nodeCenters]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uActive: { value: 0 } }), []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const target = THREE.MathUtils.smoothstep(progressRef.current, 0.8, 1.0);
    materialRef.current.uniforms.uActive.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uActive.value,
      target,
      0.05
    );
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={beamVertexShader}
        fragmentShader={beamFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MouseParallaxRig({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += (target.current.x * 0.3 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-target.current.y * 0.2 - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HolographicCore({ className = "" }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT_DESKTOP);
  const [isMobile, setIsMobile] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const sectionTop = useRef(0);
  const sectionHeight = useRef(1);

  const nodeCenters = useMemo(() => {
    return SKILLS.map((_, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const heightOffset = i % 2 === 0 ? 0.6 : -0.6;
      return new THREE.Vector3(Math.cos(angle) * NODE_RADIUS, heightOffset, Math.sin(angle) * NODE_RADIUS);
    });
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setParticleCount(mobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      sectionTop.current = rect.top + window.scrollY;
      sectionHeight.current = Math.max(1, rect.height);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let rafId: number;
    const update = () => {
      const raw = (window.scrollY - sectionTop.current) / (sectionHeight.current * 0.6);
      const clamped = Math.min(1, Math.max(0, raw));
      progressRef.current = clamped;
      setLabelsVisible((prev) => {
        if (!prev && clamped > 0.55) return true;
        if (prev && clamped < 0.4) return false;
        return prev;
      });
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ transform: "translateZ(0)" }}
      aria-hidden="true"
    >
      <Canvas
        frameloop={canvasVisible ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <MouseParallaxRig reducedMotion={reducedMotion}>
          <CoreWireframe reducedMotion={reducedMotion} progressRef={progressRef} />
          <CoreParticles
            count={particleCount}
            reducedMotion={reducedMotion}
            progressRef={progressRef}
            nodeCenters={nodeCenters}
          />
          <ConstellationLabels nodeCenters={nodeCenters} visible={labelsVisible} />
          {!reducedMotion && <EnergyBeams nodeCenters={nodeCenters} progressRef={progressRef} />}
        </MouseParallaxRig>
        {!reducedMotion && !isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.5} luminanceThreshold={0.35} luminanceSmoothing={0.3} kernelSize={KernelSize.SMALL} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}