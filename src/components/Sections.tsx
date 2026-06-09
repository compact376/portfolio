import { useState } from "react";
import { SKILL_BOOSTERS, PROJECTS } from "@/lib/missionData";

/* All sections share full-viewport height to drive scroll. The 3D canvas is fixed behind. */

export function HeroSection() {
   return (
    <section className="relative h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="hud-grid-bg absolute inset-0 opacity-20 pointer-events-none" />
      <div className="relative z-10 text-center max-w-4xl px-2">
        <div className="font-mono-hud text-primary text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 blink">
          ◢ LAUNCH PAD 39A · STATUS: NOMINAL ◣
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground text-glow leading-tight">
          MISSION
          <br />
          <span className="text-primary">ARCHITECT</span>
        </h1>
        <div className="telemetry-bar my-4 sm:my-6 mx-auto max-w-xs sm:max-w-md" />
        <p className="font-mono-hud text-xs sm:text-sm md:text-base text-muted-foreground tracking-wider uppercase">
          Backend Systems · Secure Payloads
        </p>
        <p className="mt-4 sm:mt-6 text-foreground/80 max-w-lg sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
          I build the engines that power scalable, secure, and seamless digital missions.
        </p>
        <div className="mt-8 sm:mt-10 inline-flex items-center gap-2 sm:gap-3 font-mono-hud text-[10px] sm:text-[11px] text-primary/80 hud-panel px-3 sm:px-4 py-1.5 sm:py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary blink" />
          SCROLL TO IGNITE
          <span className="text-primary">▼</span>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
   return (
    <section className="relative min-h-screen flex items-center justify-center sm:justify-end px-4 sm:px-6 py-20 sm:py-32">
      <div className="relative z-10 max-w-sm sm:max-w-md hud-panel p-4 sm:p-6 mr-0">
        <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3">
          ◢ PHASE 02 · ASCENT
        </div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
          About the <span className="text-primary text-glow">Operator</span>
        </h2>
        <div className="space-y-3 sm:space-y-4 text-foreground/80 text-xs sm:text-sm leading-relaxed">
          <p className="text-[11px] sm:text-xs">
            From tinkering with code like a propulsion engineer tunes a turbopump,
            I thrive on constructing mission-critical infrastructure that survives
            real load and real failure.
          </p>
          <p className="text-[11px] sm:text-xs">
            Distributed systems, cryptographic identity, financial flows — the
            invisible scaffolding behind every product worth using.
          </p>
          <p className="text-primary/90 font-mono-hud text-[10px] sm:text-xs uppercase tracking-wider">
            → 8+ years building engines that don't fail.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
   const [active, setActive] = useState<string | null>(null);
   return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 py-20 sm:py-32">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3">
            ◢ PHASE 03 · STAGE SEPARATION
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
            Boosters <span className="text-primary text-glow">Detached</span>
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-3 text-xs sm:text-sm px-2">
            Each booster carries a specialized payload. Tap to deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {SKILL_BOOSTERS.map((b) => {
            const open = active === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setActive(open ? null : b.id)}
                data-hot
                className={`hud-panel text-left p-3 sm:p-4 transition-all duration-300 ${
                  open ? "scale-105 -translate-y-1 sm:-translate-y-2" : "hover:-translate-y-0.5 sm:hover:-translate-y-1"
                }`}
                style={{
                  boxShadow: open
                    ? `0 0 20px ${b.color}88, inset 0 0 15px ${b.color}22`
                    : undefined,
                }}
              >
                <div
                  className="font-mono-hud text-[9px] tracking-widest mb-2"
                  style={{ color: b.color }}
                >
                  ◢ BSTR-0{SKILL_BOOSTERS.indexOf(b) + 1}
                </div>
                <div className="font-display font-bold text-foreground text-sm sm:text-base mb-2">
                  {b.name}
                </div>
                <div className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3">
                  {b.blurb}
                </div>
                <div className="flex flex-wrap gap-1">
                  {b.techs.slice(0, open ? b.techs.length : 2).map((t) => (
                    <span
                      key={t}
                      className="font-mono-hud text-[8px] sm:text-[9px] px-1 py-0.5 border border-border/60 text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                  {!open && b.techs.length > 2 && (
                    <span className="font-mono-hud text-[8px] sm:text-[9px] text-primary">
                      +{b.techs.length - 2}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({
   selected,
   setSelected,
 }: {
   selected: string | null;
   setSelected: (id: string | null) => void;
 }) {
   const project = PROJECTS.find((p) => p.id === selected);
   return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 py-20 sm:py-32">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3">
            ◢ PHASE 04 · ORBITAL INSERTION
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
            Satellites in <span className="text-primary text-glow">Orbit</span>
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-3 text-xs sm:text-sm px-2">
            Tap a satellite below to inspect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          {PROJECTS.map((p) => {
            const sel = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(sel ? null : p.id)}
                data-hot
                className={`hud-panel text-left p-2.5 sm:p-3 transition-all ${
                  sel ? "border-primary" : "hover:-translate-y-0.5"
                }`}
                style={{ boxShadow: sel ? `0 0 16px ${p.color}88` : undefined }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono-hud text-[9px] tracking-widest"
                    style={{ color: p.color }}
                  >
                    ◉ SAT-{p.id.toUpperCase()}
                  </span>
                  <span className="font-mono-hud text-[9px] text-primary">{p.metric}</span>
                </div>
                <div className="font-display font-bold text-foreground text-sm sm:text-base mt-1">{p.name}</div>
                <div className="text-muted-foreground text-[10px] sm:text-xs">{p.type}</div>
              </button>
            );
          })}
        </div>

        {project && (
          <div
            className="hud-panel p-4 sm:p-6 animate-fade-in"
            style={{ boxShadow: `0 0 30px ${project.color}66` }}
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:justify-between gap-3 sm:gap-4">
              <div className="w-full sm:w-auto">
                <div
                  className="font-mono-hud text-[9px] tracking-widest"
                  style={{ color: project.color }}
                >
                  ◢ HOLOGRAM · INCOMING TRANSMISSION
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-1">
                  {project.name}
                </h3>
                <div className="font-mono-hud text-[10px] sm:text-xs text-muted-foreground mt-1">
                  {project.type} · {project.metric}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="font-mono-hud text-[9px] text-muted-foreground hover:text-primary self-end sm:self-auto"
                data-hot
              >
                [CLOSE ✕]
              </button>
            </div>
            <p className="text-foreground/85 mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed">{project.blurb}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono-hud text-[9px] px-1.5 py-0.5 border border-primary/40 text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
            {"url" in project && project.url && (
              <a
                href={project.url as string}
                target="_blank"
                rel="noopener noreferrer"
                data-hot
                className="inline-flex items-center gap-2 mt-4 sm:mt-5 font-mono-hud text-[10px] tracking-widest px-2.5 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                ◢ VISIT LIVE SITE →
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function ContactSection() {
   const [sent, setSent] = useState(false);
   return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-32">
      <div className="relative z-10 w-full max-w-xl sm:max-w-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3">
            ◢ PHASE 05 · PAYLOAD DEPLOYMENT
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
            Launch a <span className="text-secondary text-glow-engine">Mission</span>
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-3 text-xs sm:text-sm px-2">
            Open the payload bay. Send transmission to mission control.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="hud-panel p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <Field label="CALL SIGN">
              <input
                required
                className="w-full bg-input border border-border/60 px-3 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:shadow-plasma transition"
                placeholder="Your name"
              />
            </Field>
            <Field label="UPLINK CHANNEL">
              <input
                required
                type="email"
                className="w-full bg-input border border-border/60 px-3 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none focus:shadow-plasma transition"
                placeholder="you@domain.com"
              />
            </Field>
          </div>
          <Field label="MISSION TYPE">
            <select className="w-full bg-input border border-border/60 px-3 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none transition">
              <option>API Architecture</option>
              <option>Auth / Identity</option>
              <option>Payment Integration</option>
              <option>Full Backend System</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="TRANSMISSION">
            <textarea
              required
              rows={3}
              className="w-full bg-input border border-border/60 px-3 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none transition"
              placeholder="Describe the payload you need to deploy..."
            />
          </Field>

          <button
            type="submit"
            data-hot
            className="w-full font-display font-bold tracking-widest text-sm sm:text-base py-2.5 sm:py-3 bg-gradient-to-b from-secondary to-[hsl(0_100%_30%)] text-secondary-foreground border border-secondary/60 shadow-engine hover:shadow-[0_0_40px_hsl(var(--secondary))] transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 text-[11px] sm:text-[13px]">{sent ? "▲ TRANSMISSION SENT ▲" : "▲ IGNITE ▲"}</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {sent && (
            <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary text-center animate-fade-in">
              ✓ PAYLOAD DEPLOYED · EXPECT RESPONSE WITHIN 24 HRS
            </div>
          )}
        </form>

        <div className="text-center mt-6 sm:mt-8 font-mono-hud text-[9px] sm:text-[10px] text-muted-foreground tracking-widest">
          END OF MISSION TIMELINE · THANK YOU FOR FLYING
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono-hud text-[10px] text-primary/70 tracking-widest block mb-1">
        ◢ {label}
      </span>
      {children}
    </label>
  );
}
