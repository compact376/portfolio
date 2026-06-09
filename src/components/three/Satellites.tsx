import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/lib/missionData";

/** Satellite ring — appears in orbit phase. Each satellite = a project. */
export function Satellites({
   visible,
   onSelect,
   selectedId,
 }: {
   visible: number; // 0..1 fade in
   onSelect: (id: string | null) => void;
   selectedId: string | null;
 }) {
   const group = useRef<THREE.Group>(null);

   const items = useMemo(() => {
     return PROJECTS.map((p, i) => {
       const angle = (i / PROJECTS.length) * Math.PI * 2;
       return { ...p, angle };
     });
   }, []);

   useFrame((_, d) => {
     if (group.current) group.current.rotation.y += d * 0.08;
   });

   if (visible <= 0.01) return null;

   const radius = 3.2;

   return (
     <group ref={group} scale={visible}>
       {items.map((it) => {
         const x = Math.cos(it.angle) * radius;
         const z = Math.sin(it.angle) * radius;
         const isSel = selectedId === it.id;
         return (
           <group key={it.id} position={[x, Math.sin(it.angle * 2) * 0.4, z]}>
             {/* Hit area */}
             <mesh
               onPointerOver={(e) => {
                 e.stopPropagation();
               }}
               onPointerOut={() => {
               }}
               onClick={(e) => {
                 e.stopPropagation();
                 onSelect(isSel ? null : it.id);
               }}
             >
               <sphereGeometry args={[0.45, 16, 16]} />
               <meshBasicMaterial transparent opacity={0} />
             </mesh>
             {/* Satellite body */}
             <mesh>
               <boxGeometry args={[0.25, 0.25, 0.25]} />
               <meshStandardMaterial color="#cfd6df" metalness={0.7} roughness={0.3} />
             </mesh>
             {/* Solar panels */}
             <mesh position={[0.35, 0, 0]}>
               <boxGeometry args={[0.4, 0.02, 0.18]} />
               <meshStandardMaterial color="#0a2a5a" metalness={0.8} roughness={0.2} emissive="#001a44" />
             </mesh>
             <mesh position={[-0.35, 0, 0]}>
               <boxGeometry args={[0.4, 0.02, 0.18]} />
               <meshStandardMaterial color="#0a2a5a" metalness={0.8} roughness={0.2} emissive="#001a44" />
             </mesh>
             {/* Glow */}
             <mesh>
               <sphereGeometry args={[0.18, 12, 12]} />
               <meshBasicMaterial color={it.color} transparent opacity={isSel ? 1 : 0.6} toneMapped={false} />
             </mesh>
             {isSel && <pointLight color={it.color} intensity={2} distance={2} />}
           </group>
         );
       })}
       {/* Orbit ring */}
       <mesh rotation={[Math.PI / 2, 0, 0]}>
         <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
         <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} side={THREE.DoubleSide} />
       </mesh>
     </group>
   );
 }
