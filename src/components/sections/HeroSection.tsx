import portrait from "../../assets/ahmed-dida-portrait.png";

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

