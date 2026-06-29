import { useState } from "react";
import { SKILL_BOOSTERS } from "@/lib/missionData";

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

