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

