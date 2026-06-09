import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Starfield({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#a8d8ff"),
      new THREE.Color("#ffd9a8"),
      new THREE.Color("#00D4FF"),
    ];
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const r = 30 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 1.4 + 0.2;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

/** Soft nebula plane far behind */
export function Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.ShaderMaterial;
      m.uniforms.uTime.value = clock.elapsedTime;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -60]} scale={[140, 80, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          // Cheap noise
          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
            vec2 u = f*f*(3.-2.*f);
            return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
          }
          float fbm(vec2 p) {
            float v = 0.0; float a = 0.5;
            for (int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
            return v;
          }
          void main() {
            vec2 p = vUv * 3.0;
            float n = fbm(p + vec2(uTime*0.02, uTime*0.01));
            float n2 = fbm(p * 2.0 - vec2(uTime*0.03));
            vec3 col1 = vec3(0.0, 0.5, 1.0);     // plasma blue
            vec3 col2 = vec3(0.7, 0.0, 1.0);     // violet
            vec3 col3 = vec3(1.0, 0.3, 0.0);     // ember
            vec3 col = mix(col1, col2, n) + col3 * n2 * 0.4;
            float vignette = smoothstep(0.0, 0.6, 1.0 - distance(vUv, vec2(0.5)));
            gl_FragColor = vec4(col * n * 0.55, n * vignette * 0.6);
          }
        `}
      />
    </mesh>
  );
}

/** Earth ball — visible during ascent, recedes as we climb */
export function Earth({ progress }: { progress: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.05;
  });
  // y position drops as we ascend
  const y = -8 - progress * 30;
  const scale = 8 + progress * 4;
  return (
    <mesh ref={ref} position={[0, y, -5]} scale={scale}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        uniforms={{}}
        vertexShader={`
          varying vec3 vNormal;
          varying vec2 vUv;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          varying vec2 vUv;
          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
            vec2 u = f*f*(3.-2.*f);
            return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
          }
          float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<5;i++){v+=a*noise(p);p*=2.;a*=0.5;} return v; }
          void main() {
            float n = fbm(vUv * 6.0);
            vec3 ocean = vec3(0.02, 0.15, 0.35);
            vec3 land = vec3(0.1, 0.4, 0.2);
            vec3 col = mix(ocean, land, smoothstep(0.45, 0.55, n));
            // atmosphere rim
            float rim = pow(1.0 - max(dot(vNormal, vec3(0.,0.,1.)), 0.0), 2.5);
            col += vec3(0.0, 0.6, 1.0) * rim * 0.8;
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
