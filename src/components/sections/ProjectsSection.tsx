import { PROJECTS } from "@/lib/missionData";

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

