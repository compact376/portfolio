import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Rocket } from "./Rocket";
import { Starfield, Nebula, Earth } from "./Environment";
import { Satellites } from "./Satellites";

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame(() => {
    // Define camera path keyframes per phase
    // 0.00-0.20 ignition: low pad shot, looking up
    // 0.20-0.40 ascent: pull back, look up
    // 0.40-0.60 separation: orbit around
    // 0.60-0.85 orbit: wider, slow circle
    // 0.85-1.00 deploy: pull in close to nose
    const p = progress;

    const camPos = new THREE.Vector3();
    const look = new THREE.Vector3(0, 0.5, 0);

    if (p < 0.2) {
      const t = p / 0.2;
      camPos.set(0, -0.5 + t * 0.8, 5 - t * 0.5);
      look.set(0, 0.5 + t * 0.3, 0);
    } else if (p < 0.4) {
      const t = (p - 0.2) / 0.2;
      camPos.set(Math.sin(t * 1.2) * 1, 0.3 - t * 0.3, 4.5 + t * 1);
      look.set(0, 0.8 + t * 0.4, 0);
    } else if (p < 0.6) {
      const t = (p - 0.4) / 0.2;
      const a = t * Math.PI * 1.4;
      camPos.set(Math.sin(a) * 5, 0.5, Math.cos(a) * 5);
      look.set(0, 0.4, 0);
    } else if (p < 0.85) {
      const t = (p - 0.6) / 0.25;
      const a = Math.PI * 1.4 + t * Math.PI * 1.2;
      camPos.set(Math.sin(a) * (5.5 + t * 1.5), 1 + t * 0.5, Math.cos(a) * (5.5 + t * 1.5));
      look.set(0, 0.4, 0);
    } else {
      const t = (p - 0.85) / 0.15;
      camPos.set(0, 1.6 + t * 0.2, 2.5 - t * 0.8);
      look.set(0, 1.5 + t * 0.5, 0);
    }

    camera.position.lerp(camPos, 0.08);
    target.current.lerp(look, 0.08);
    camera.lookAt(target.current);
  });

  return null;
}

export function Scene({
   progress,
   selectedProject,
   setSelectedProject,
 }: {
   progress: number;
   selectedProject: string | null;
   setSelectedProject: (id: string | null) => void;
 }) {
   const separation = THREE.MathUtils.clamp((progress - 0.4) / 0.18, 0, 1);
   const orbitVis = THREE.MathUtils.clamp((progress - 0.55) / 0.15, 0, 1);

   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

   return (
     <Canvas
       dpr={isMobile ? [1, 1] : [1, 1.4]}
       camera={{ position: [0, 0, 5], fov: 50 }}
       gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
       performance={{ min: 0.5 }}
     >
       <color attach="background" args={["#000000"]} />

       <Suspense fallback={null}>
         <Nebula />
         <Starfield count={isMobile ? 200 : 600} />
         <Earth progress={progress} />

         {/* Sun key light */}
         <directionalLight position={[8, 6, 4]} intensity={1.2} color="#fff5e6" />
         <ambientLight intensity={0.2} color="#3060a0" />

         <Rocket progress={progress} separationProgress={separation} />

         <Satellites
           visible={orbitVis}
           onSelect={setSelectedProject}
           selectedId={selectedProject}
         />

         <CameraRig progress={progress} />

         {!isMobile && (
           <EffectComposer multisampling={0}>
             <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.4} mipmapBlur />
           </EffectComposer>
         )}
       </Suspense>
     </Canvas>
   );
 }
