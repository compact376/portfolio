import { useMemo, useState } from "react";
import { Scene } from "@/components/three/Scene";
import { TelemetryHUD } from "@/components/TelemetryHUD";
import { CustomCursor } from "@/components/CustomCursor";
import { CountdownIntro } from "@/components/CountdownIntro";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from "@/components/Sections";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { PHASES, Phase } from "@/lib/missionData";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const progress = useScrollProgress();

  // Map progress -> active phase
  const activePhase: Phase = useMemo(() => {
    if (progress < 0.18) return "ignition";
    if (progress < 0.38) return "ascent";
    if (progress < 0.56) return "separation";
    if (progress < 0.82) return "orbit";
    return "deploy";
  }, [progress]);

  // 5 sections × 100vh; jumping to phase scrolls to that section
  const jumpTo = (phase: Phase) => {
    const idx = PHASES.findIndex((p) => p.id === phase);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const target = (idx / (PHASES.length - 1)) * h;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <CustomCursor />
      {!introDone && <CountdownIntro onDone={() => setIntroDone(true)} />}

      {/* Persistent 3D canvas */}
      <div className="fixed inset-0 z-0 bg-gradient-nebula">
        <Scene
          progress={progress}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {/* Scroll content (sections layered above the canvas) */}
      <main className="relative z-10 scanline">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection selected={selectedProject} setSelected={setSelectedProject} />
        <ContactSection />
      </main>

      <TelemetryHUD progress={progress} activePhase={activePhase} onJump={jumpTo} />

      {/* Top corner identifier */}
      <div className="fixed top-2 left-2 z-40 font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-widest pointer-events-none">
        <div className="hud-panel px-2 py-1 sm:px-3 sm:py-1.5">
          <span className="text-secondary blink">●</span> LIVE
        </div>
      </div>
      <div className="fixed top-2 right-2 z-40 font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-widest pointer-events-none">
        <div className="hud-panel px-2 py-1 sm:px-3 sm:py-1.5">
          PHASE: <span className="text-primary text-glow">{activePhase.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
