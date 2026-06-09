import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Procedural rocket: nose cone, fuselage, fins, boosters, engine glow */
export function Rocket({
  progress,
  separationProgress,
}: {
  progress: number; // 0..1 overall
  separationProgress: number; // 0..1 stage sep
}) {
  const group = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const flameInner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Subtle hover sway in ignition; tilt during ascent
    const t = state.clock.elapsedTime;
    const sway = Math.sin(t * 1.6) * 0.02 * (1 - progress * 2);
    group.current.rotation.z = sway + progress * 0.08;
    group.current.rotation.y = t * 0.05;

    // Flame flicker
    if (flame.current && flameInner.current) {
      const flick = 1 + Math.sin(t * 40) * 0.08 + Math.random() * 0.05;
      const intensity = progress < 0.05 ? 0.3 + progress * 14 : 1; // ignition ramp
      flame.current.scale.set(flick * intensity, flick * intensity * 1.3, flick * intensity);
      flameInner.current.scale.set(flick * intensity * 0.6, flick * intensity * 1.1, flick * intensity * 0.6);
    }
  });

  // Booster positions (4 around the body)
  const boosters = useMemo(
    () => [
      [0.55, -0.4, 0],
      [-0.55, -0.4, 0],
      [0, -0.4, 0.55],
      [0, -0.4, -0.55],
    ] as [number, number, number][],
    []
  );

  return (
    <group ref={group}>
      {/* Nose cone */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <coneGeometry args={[0.35, 0.9, 24]} />
        <meshStandardMaterial color="#e8eef5" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Tip light */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#FF4B00" />
      </mesh>

      {/* Fuselage */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 1.6, 32]} />
        <meshStandardMaterial color="#cfd6df" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Plasma glow accent ring */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.36, 0.025, 8, 32]} />
        <meshBasicMaterial color="#00D4FF" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.39, 0.02, 8, 32]} />
        <meshBasicMaterial color="#00D4FF" toneMapped={false} />
      </mesh>

      {/* Engine bell */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 24]} />
        <meshStandardMaterial color="#2a2f36" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Flame (engine plume) */}
      <mesh ref={flame} position={[0, -0.95, 0]}>
        <coneGeometry args={[0.32, 1.1, 24, 1, true]} />
        <meshBasicMaterial color="#FF4B00" transparent opacity={0.55} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={flameInner} position={[0, -0.85, 0]}>
        <coneGeometry args={[0.18, 0.85, 16, 1, true]} />
        <meshBasicMaterial color="#FFE6A8" transparent opacity={0.95} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, -0.8, 0]} color="#FF7B33" intensity={3} distance={5} />

      {/* Fins */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
        <mesh key={i} position={[0, -0.05, 0]} rotation={[0, rot, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.45]} />
          <meshStandardMaterial color="#9aa3ad" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Boosters - jettison on separation */}
      {boosters.map((pos, i) => {
        const dir = new THREE.Vector3(pos[0], 0, pos[2]).normalize();
        const sepOffset = separationProgress * 3;
        const sepFall = -separationProgress * 2;
        return (
          <group
            key={i}
            position={[
              pos[0] + dir.x * sepOffset,
              pos[1] + sepFall,
              pos[2] + dir.z * sepOffset,
            ]}
            rotation={[separationProgress * 0.6, 0, separationProgress * dir.x * 0.8]}
          >
            <mesh>
              <cylinderGeometry args={[0.14, 0.16, 1.0, 16]} />
              <meshStandardMaterial color="#b0b8c1" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <coneGeometry args={[0.14, 0.25, 16]} />
              <meshStandardMaterial color="#cfd6df" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Booster engine glow when attached */}
            {separationProgress < 0.3 && (
              <mesh position={[0, -0.6, 0]}>
                <coneGeometry args={[0.1, 0.4, 12, 1, true]} />
                <meshBasicMaterial color="#FF4B00" transparent opacity={0.6} toneMapped={false} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
