import { PHASES, Phase } from "@/lib/missionData";

export function TelemetryHUD({
  progress,
  activePhase,
  onJump,
}: {
  progress: number;
  activePhase: Phase;
  onJump: (phase: Phase) => void;
}) {
  const altitude = Math.round(progress * 408_000); // km, ISS-ish
  const velocity = Math.round(progress * 27600); // km/h
  const t = progress;
  const mins = Math.floor(t * 12);
  const secs = Math.floor((t * 12 - mins) * 60);
  const tStr = `T+${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="hud-panel pointer-events-auto mx-auto max-w-6xl px-4 py-2.5 sm:px-5 sm:py-3 font-mono-hud text-[10px] sm:text-[11px] uppercase">
        <div className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 gap-2.5">
          {/* Mission clock */}
          <div className="flex items-center gap-2 sm:gap-3 sm:col-span-3">
            <div className="h-2 w-2 rounded-full bg-secondary blink shadow-engine" />
            <div>
              <div className="text-muted-foreground text-[8px] sm:text-[9px]">MISSION CLOCK</div>
              <div className="text-glow text-primary text-sm sm:text-base">{tStr}</div>
            </div>
          </div>

          {/* Phase nav */}
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 sm:col-span-6">
            {PHASES.map((p) => {
              const active = p.id === activePhase;
              return (
                <button
                  key={p.id}
                  onClick={() => onJump(p.id)}
                  className={`group flex flex-col items-center px-1.5 py-0.5 sm:px-3 sm:py-1 transition-all ${
                    active ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                  }`}
                  data-hot
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      active ? "bg-primary shadow-plasma scale-150" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span className="mt-0.5 text-[7px] sm:text-[9px] tracking-widest">{p.label.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>

          {/* Telemetry */}
          <div className="grid grid-cols-2 sm:col-span-3 gap-2 sm:gap-3 text-right">
            <div>
              <div className="text-muted-foreground text-[8px] sm:text-[9px]">ALT (km)</div>
              <div className="text-primary text-glow text-xs sm:text-sm tabular-nums">{altitude.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[8px] sm:text-[9px]">VEL (km/h)</div>
              <div className="text-primary text-glow text-xs sm:text-sm tabular-nums">{velocity.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 sm:mt-2 h-px w-full bg-border/40 overflow-hidden">
          <div
            className="h-full bg-gradient-plasma shadow-plasma transition-[width]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
