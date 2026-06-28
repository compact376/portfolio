import { useState } from "react";
import { SKILL_BOOSTERS, PROJECTS } from "@/lib/missionData";
import portrait from "../assets/ahmed-dida-portrait.png";

/* All sections share full-viewport height to drive scroll. The 3D canvas is fixed behind. */

const INTERESTS = [
    { icon: "🚀", label: "Aerospace" },
    { icon: "🧠", label: "Neuroscience" },
    { icon: "💻", label: "Backend Systems" },
    { icon: "📖", label: "Continuous Learning" },
    { icon: "🌍", label: "Building for Impact" },
];

export function HeroSection() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center px-4 sm:px-6 py-24 md:py-16">
            <div className="hud-grid-bg absolute inset-0 opacity-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 md:gap-12 lg:gap-16 items-center">
                {/* LEFT — Text */}
                <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
                    <div className="font-mono-hud text-primary text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] mb-5 blink">
                        ◢ SELF-TAUGHT DEVELOPER · BUILDING DAILY ◣
                    </div>
                    <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground text-glow leading-[0.95]">
                        Ahmed <span className="text-primary">Dida</span>
                    </h1>
                    <div className="telemetry-bar my-5 lg:mx-0 mx-auto max-w-md" />
                    <p className="font-mono-hud text-xs sm:text-sm md:text-base text-muted-foreground tracking-wider uppercase">
                        Backend Builder · Go Developer · Curious Learner
                    </p>
                    <p className="mt-5 text-foreground/80 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg leading-relaxed">
                        Learning by building. Breaking things, fixing them, and turning
                        ideas into real projects one day at a time.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                        <button
                            onClick={() => scrollTo("projects")}
                            data-hot
                            className="font-mono-hud text-[11px] tracking-widest px-5 py-2.5 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            ◢ VIEW PROJECTS →
                        </button>
                        <button
                            onClick={() => scrollTo("contact")}
                            data-hot
                            className="font-mono-hud text-[11px] tracking-widest px-5 py-2.5 border border-border/60 text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                        >
                            ◢ CONTACT ME
                        </button>
                    </div>

                    {/* Interest chips */}
                    <div className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start">
                        {INTERESTS.map((i) => (
                            <span
                                key={i.label}
                                data-hot
                                className="font-mono-hud text-[10px] sm:text-[11px] tracking-wider px-3 py-1.5 rounded-full border border-primary/20 bg-background/40 backdrop-blur-sm text-foreground/75 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_12px_rgba(0,255,255,0.25)] transition-all cursor-default"
                            >
                <span className="mr-1">{i.icon}</span>
                                {i.label}
              </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Portrait card */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
                    <div
                        className="group relative w-full max-w-[420px] md:max-w-[480px] lg:max-w-none rounded-3xl border border-primary/20 bg-background/40 backdrop-blur-md p-2 sm:p-3 shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,255,255,0.28)] hover:scale-[1.02] hero-float"
                    >
                        {/* corner ticks */}
                        <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary/70 rounded-tl-3xl pointer-events-none" />
                        <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary/70 rounded-tr-3xl pointer-events-none" />
                        <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-primary/70 rounded-bl-3xl pointer-events-none" />
                        <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-primary/70 rounded-br-3xl pointer-events-none" />

                        <img
                            src={portrait}
                            alt="Illustrated portrait of Ahmed Dida, self-taught backend developer, surrounded by books, code, and aerospace references"
                            loading="lazy"
                            className="w-full h-auto object-cover rounded-2xl"
                        />

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono-hud text-[9px] sm:text-[10px] text-primary/90 px-2">
                            <span className="bg-background/70 backdrop-blur-sm px-2 py-1 rounded">◉ OPERATOR · LIVE</span>
                            <span className="bg-background/70 backdrop-blur-sm px-2 py-1 rounded blink">REC</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function AboutSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-end px-6 py-32">
            <div className="relative z-10 max-w-md hud-panel p-6 mr-0 md:mr-12">
                <div className="font-mono-hud text-[10px] text-primary/70 tracking-[0.4em] mb-3">
                    ◢ PHASE 02 · ASCENT
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    About the <span className="text-primary text-glow">Operator</span>
                </h2>
                <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
                    <p>
                        I'm a self-taught developer who values simplicity over unnecessary
                        abstractions and enjoys understanding how things work under the hood.
                        I spend a lot of time experimenting, tinkering, and learning through
                        building.
                    </p>
                    <p>
                        I explored JavaScript, Python, and C before eventually putting most of
                        my focus into Go. Learning Go changed the way I think about software —
                        its simplicity taught me how systems fit together and helped me understand
                        programming concepts more deeply.
                    </p>
                    <p>
                        Most of my learning comes from building real projects: backend APIs,
                        authentication systems, donation platforms, and applications that solve
                        practical problems. Every project teaches me something new.
                    </p>
                    <p className="text-primary/90 font-mono-hud text-xs uppercase tracking-wider">
                        → SELF TAUGHT • BUILDING DAILY • ALWAYS LEARNING
                    </p>
                </div>
            </div>
        </section>
    );
}

export function SkillsSection() {
    const [active, setActive] = useState<string | null>(null);
    return (
        <section className="relative min-h-screen flex items-center px-6 py-32">
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="font-mono-hud text-[10px] text-primary/70 tracking-[0.4em] mb-3">
                        ◢ PHASE 03 · STAGE SEPARATION
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                        Things I've Been <span className="text-primary text-glow">Learning</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm">
                        Technologies, tools, and concepts I've picked up through building and experimenting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                                    className="font-mono-hud text-[10px] tracking-widest mb-2"
                                    style={{ color: b.color }}
                                >
                                    ◢ BSTR-0{SKILL_BOOSTERS.indexOf(b) + 1}
                                </div>
                                <div className="font-display font-bold text-foreground text-base mb-2">
                                    {b.name}
                                </div>
                                <div className="text-muted-foreground text-xs leading-relaxed mb-3">
                                    {b.blurb}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {b.techs.slice(0, open ? b.techs.length : 2).map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono-hud text-[9px] px-1.5 py-0.5 border border-border/60 text-foreground/70"
                                        >
                      {t}
                    </span>
                                    ))}
                                    {!open && b.techs.length > 2 && (
                                        <span className="font-mono-hud text-[9px] text-primary">
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
        <section className="relative min-h-screen flex items-center px-6 py-32">
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <div className="font-mono-hud text-[10px] text-primary/70 tracking-[0.4em] mb-3">
                        ◢ PHASE 04 · ORBITAL INSERTION
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                        Projects I've <span className="text-primary text-glow">Built</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm">
                        Real projects that helped me learn, experiment, and improve as a developer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
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
                      className="font-mono-hud text-[10px] tracking-widest"
                      style={{ color: p.color }}
                  >
                    ◉ SAT-{p.id.toUpperCase()}
                  </span>
                                    <span className="font-mono-hud text-[10px] text-primary">{p.metric}</span>
                                </div>
                                <div className="font-display font-bold text-foreground mt-1">{p.name}</div>
                                <div className="text-muted-foreground text-xs">{p.type}</div>
                            </button>
                        );
                    })}
                </div>

                {project && (
                    <div
                        className="hud-panel p-6 animate-fade-in"
                        style={{ boxShadow: `0 0 40px ${project.color}66` }}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div
                                    className="font-mono-hud text-[10px] tracking-widest"
                                    style={{ color: project.color }}
                                >
                                    ◢ HOLOGRAM · INCOMING TRANSMISSION
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">
                                    {project.name}
                                </h3>
                                <div className="font-mono-hud text-xs text-muted-foreground mt-1">
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
                        <p className="text-foreground/85 mt-4 leading-relaxed">{project.blurb}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.stack.map((s) => (
                                <span
                                    key={s}
                                    className="font-mono-hud text-[10px] px-2 py-1 border border-primary/40 text-primary"
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
                                className="inline-flex items-center gap-2 mt-5 font-mono-hud text-[11px] tracking-widest px-3 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                ◢ VISIT LIVE SITE → {(project.url as string).replace(/^https?:\/\//, "")}
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
        <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
            <div className="relative z-10 w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="font-mono-hud text-[10px] text-primary/70 tracking-[0.4em] mb-3">
                        ◢ PHASE 05 · PAYLOAD DEPLOYMENT
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                        Let's Build <span className="text-secondary text-glow-engine">Something</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm">
                        Have an idea, project, or opportunity? Feel free to reach out.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
