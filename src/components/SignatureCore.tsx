import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = new THREE.Color("#5CF4E0");
const VIOLET = new THREE.Color("#7C5CFF");
const PARTICLE_COUNT = 320;

function buildSignatureData(count: number) {
  const corePositions = new Float32Array(count * 3);
  const scatterPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const jitter = 0.85 * (0.92 + Math.random() * 0.18);

    corePositions[i * 3] = x * jitter;
    corePositions[i * 3 + 1] = y * jitter;
    corePositions[i * 3 + 2] = z * jitter;

    const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    const dist = 5.0 + Math.random() * 4.5;
    scatterPositions[i * 3] = dir.x * dist;
    scatterPositions[i * 3 + 1] = dir.y * dist;
    scatterPositions[i * 3 + 2] = dir.z * dist;

    const t = Math.pow(Math.random(), 2.2);
    const c = CYAN.clone().lerp(VIOLET, t * 0.6);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 2.0 + 0.7;
  }

  return { corePositions, scatterPositions, colors, sizes };
}

const vertexShader = `
  attribute float aSize;
  attribute vec3 color;
  attribute vec3 aScatterPos;
  attribute vec3 aCorePos;
  uniform float uProgress;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec3 pos = mix(aScatterPos, aCorePos, uProgress);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (8.0 / -mvPosition.z) * (0.6 + 0.4 * uProgress);
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

function SignatureParticles({
  progressRef,
  reducedMotion,
}: {
  progressRef: { current: number };
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { corePositions, scatterPositions, colors, sizes } = useMemo(() => buildSignatureData(PARTICLE_COUNT), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aScatterPos", new THREE.BufferAttribute(scatterPositions, 3));
    geo.setAttribute("aCorePos", new THREE.BufferAttribute(corePositions, 3));
    return geo;
  }, [corePositions, scatterPositions, colors, sizes]);

  const uniforms = useMemo(() => ({ uProgress: { value: 0 } }), []);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    materialRef.current.uniforms.uProgress.value = progressRef.current;

    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      pointsRef.current.rotation.y = t * 0.12;
      const breathe = 1 + Math.sin(t * 0.7) * 0.04;
      pointsRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
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

function SignatureWireframe({
  progressRef,
  reducedMotion,
}: {
  progressRef: { current: number };
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    materialRef.current.opacity = progressRef.current * 0.4;

    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = -t * 0.15;
      meshRef.current.rotation.x = t * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.62, 0]} />
      <meshBasicMaterial ref={materialRef} color="#5CF4E0" wireframe transparent opacity={0} />
    </mesh>
  );
}

export default function SignatureCore({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progressRef = useRef(0);
  const sectionTop = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      return;
    }

    const measure = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      sectionTop.current = rect.top + window.scrollY;
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let rafId: number;
    const update = () => {
      const viewportHeight = window.innerHeight;
      const currentTop = sectionTop.current - window.scrollY;
      const raw = (viewportHeight - currentTop) / (viewportHeight * 0.6);
      const target = Math.min(1, Math.max(0, raw));
      progressRef.current += (target - progressRef.current) * 0.18;
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} className={`mx-auto pointer-events-none ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={1} gl={{ antialias: false, alpha: true }}>
        <SignatureWireframe progressRef={progressRef} reducedMotion={reducedMotion} />
        <SignatureParticles progressRef={progressRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}