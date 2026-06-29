import { useEffect, useMemo, useRef, useState } from "react";
import { transmitContactMessage, type ContactTransmission } from "@/lib/contactService";

const LOG_LINES = [
    "> establishing uplink...",
    "> encrypting payload...",
    "> routing transmission...",
    "> payload deployed...",
    "> transmission successful ✓",
];

const EMPTY_FORM = {
    callSign: "",
    uplink: "",
    transmission: "",
};

export function ContactSection() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [focusedField, setFocusedField] = useState<keyof typeof EMPTY_FORM | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [visibleLogs, setVisibleLogs] = useState(0);
    const [ready, setReady] = useState(false);
    const [statusLine, setStatusLine] = useState<string | null>(null);
    const timersRef = useRef<number[]>([]);

    const sessionId = useMemo(() => "#2047-A", []);
    const deploymentTimestamp = useMemo(
        () =>
            new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(new Date()),
        [],
    );

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => window.clearTimeout(timer));
            timersRef.current = [];
        };
    }, []);

    useEffect(() => {
        if (!isSending) return;

        setVisibleLogs(0);
        setReady(false);
        setStatusLine(null);
        timersRef.current.forEach((timer) => window.clearTimeout(timer));
        timersRef.current = [];

        LOG_LINES.forEach((_, index) => {
            timersRef.current.push(
                window.setTimeout(() => setVisibleLogs(index + 1), index * 620),
            );
        });

        timersRef.current.push(
            window.setTimeout(() => setReady(true), 4300),
            window.setTimeout(() => {
                setIsSending(false);
                setVisibleLogs(0);
                setReady(false);
            }, 5000),
        );
    }, [isSending]);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-75">
                <div className="absolute inset-0 hud-grid-bg opacity-20" />
                <div className="absolute inset-0 scanline opacity-70" />
                <div className="terminal-fog absolute inset-0" />
                <div className="terminal-particles absolute inset-0" />
                <div className="terminal-coord terminal-coord-left">COORD // A-17 / NODE-05</div>
                <div className="terminal-coord terminal-coord-right">TELEMETRY // CLEAN LINK / VECTOR LOCKED</div>
                <div className="terminal-coord terminal-coord-bottom">MISSION TIMING // STABLE</div>
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                <div className="text-center mb-8">
                    <div className="font-mono-hud text-[10px] text-primary/70 tracking-[0.4em] mb-3">
                        ◢ PHASE 05 · PAYLOAD DEPLOYMENT
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                        Let's Build <span className="text-secondary text-glow-engine">Something</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm max-w-2xl mx-auto">
                        Self-taught developer building systems, exploring ideas, and solving problems. Send a transmission if you want to collaborate.
                    </p>
                </div>

                <div className="space-y-5">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (isSending) return;

                            const transmission: ContactTransmission = {
                                callSign: (e.currentTarget.elements.namedItem("callSign") as HTMLInputElement | null)?.value || "",
                                uplink: (e.currentTarget.elements.namedItem("uplink") as HTMLInputElement | null)?.value || "",
                                transmission: (e.currentTarget.elements.namedItem("transmission") as HTMLTextAreaElement | null)?.value || "",
                            };

                            setForm(EMPTY_FORM);
                            setIsSending(true);

                            try {
                                await transmitContactMessage(transmission);
                                setStatusLine(
                                    "> terminal ready for next transmission █",
                                );
                            } catch {
                                setStatusLine(
                                    "> transmission route unavailable · try direct email link █",
                                );
                            }
                        }}
                        className="hud-panel terminal-shell p-0 overflow-hidden relative"
                    >
                        <div className="terminal-sheen pointer-events-none absolute inset-0" />
                        <div className="terminal-noise pointer-events-none absolute inset-0" />

                        <div className="relative border-b border-primary/15 bg-background/35 px-4 sm:px-5 py-4 backdrop-blur-md">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <div className="font-display text-sm sm:text-base text-foreground tracking-[0.25em]">
                                            [ SYSTEM:// DGNUS_CONTACT_TERMINAL ]
                                        </div>
                                        <div className="font-mono-hud text-[9px] sm:text-[10px] tracking-[0.35em] text-primary/75">
                                            ACTIVE UPLINK · SELF-TAUGHT DEVELOPER NODE
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-end gap-2 text-[9px] sm:text-[10px] font-mono-hud tracking-widest">
                                        <span className="terminal-pill text-primary">STATUS: ONLINE</span>
                                        <span className="terminal-pill text-secondary">UPLINK: ACTIVE</span>
                                        <span className="terminal-pill text-primary/90">NODE: SELF-TAUGHT_DEV</span>
                                        <span className="terminal-pill text-muted-foreground">SESSION: {sessionId}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 font-mono-hud text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground/90">
                                    <div className="terminal-stat">
                                        <span className="text-primary/70">STATUS</span>
                                        <span>ONLINE</span>
                                    </div>
                                    <div className="terminal-stat">
                                        <span className="text-secondary/90">DEPLOYMENT</span>
                                        <span>{deploymentTimestamp}</span>
                                    </div>
                                    <div className="terminal-stat">
                                        <span className="text-primary/70">UPLINK</span>
                                        <span>ACTIVE · MISSION READY</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative px-4 sm:px-5 py-5 sm:py-6">
                            <div className="terminal-caption font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.35em] mb-4 flex items-center gap-3">
                                <span>MISSION INPUT MATRIX</span>
                                <span className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />
                                <span className="text-secondary/80 blink">◉</span>
                            </div>

                            <div className="space-y-4">
                                <FieldTerminal
                                    label="CALL SIGN"
                                    prompt=">"
                                    name="callSign"
                                    active={focusedField === "callSign"}
                                    value={form.callSign}
                                    placeholder="Your name"
                                    onFocus={() => setFocusedField("callSign")}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(value) => setForm((prev) => ({ ...prev, callSign: value }))}
                                />

                                <FieldTerminal
                                    label="UPLINK CHANNEL"
                                    prompt="$"
                                    name="uplink"
                                    active={focusedField === "uplink"}
                                    value={form.uplink}
                                    placeholder="you@domain.com"
                                    type="email"
                                    onFocus={() => setFocusedField("uplink")}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(value) => setForm((prev) => ({ ...prev, uplink: value }))}
                                />

                                <TransmissionBuffer
                                    name="transmission"
                                    active={focusedField === "transmission"}
                                    value={form.transmission}
                                    onFocus={() => setFocusedField("transmission")}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(value) => setForm((prev) => ({ ...prev, transmission: value }))}
                                />
                            </div>

                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    data-hot
                                    className="terminal-launch w-full relative overflow-hidden font-display font-bold tracking-widest text-sm sm:text-base py-3.5 sm:py-4 bg-gradient-to-b from-secondary to-[hsl(0_100%_30%)] text-secondary-foreground border border-secondary/60 shadow-engine hover:shadow-[0_0_40px_hsl(var(--secondary))] transition-all group disabled:opacity-90 disabled:cursor-wait"
                                >
                                    <span className="absolute inset-0 terminal-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 text-[11px] sm:text-[13px]">
                                        [ ▲ EXECUTE TRANSMISSION ▲ ]
                                    </span>
                                </button>
                            </div>

                            <div className="mt-5 min-h-[8rem]">
                                {isSending ? (
                                    <div className="hud-panel terminal-log-panel p-4 sm:p-5 animate-fade-in">
                                        <div className="font-mono-hud text-[9px] sm:text-[10px] text-primary/70 tracking-[0.35em] mb-3 flex items-center justify-between gap-3">
                                            <span>TERMINAL RESPONSE LOG</span>
                                            <span className="text-secondary/80 blink">█</span>
                                        </div>
                                        <div className="space-y-2 font-mono-hud text-[10px] sm:text-[11px] text-foreground/90 tracking-wider">
                                            {LOG_LINES.slice(0, visibleLogs).map((line, index) => (
                                                <div
                                                    key={line}
                                                    className="terminal-log-line"
                                                    style={{ animationDelay: `${index * 120}ms` }}
                                                >
                                                    {line}
                                                </div>
                                            ))}
                                            {ready && (
                                                <div className="terminal-log-line text-primary">
                                                    &gt; terminal ready for next transmission █
                                                </div>
                                            )}
                                            {!ready && statusLine && (
                                                <div className="terminal-log-line text-primary">
                                                    {statusLine}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="font-mono-hud text-[9px] sm:text-[10px] text-muted-foreground text-center tracking-widest px-3 py-4">
                                        END OF MISSION TIMELINE · THANK YOU FOR FLYING
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>

                    <div className="hud-panel terminal-channels p-4 sm:p-5">
                        <div className="flex items-center gap-3 font-mono-hud text-[10px] text-primary/70 tracking-[0.35em] mb-4">
                            <span>◢ DIRECT CHANNELS</span>
                            <span className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />
                            <span className="text-secondary/80 blink">◉</span>
                        </div>

                        <div className="terminal-direct-lines font-mono-hud text-[9px] sm:text-[10px] text-foreground/85 tracking-widest">
                            <div className="terminal-direct-divider">────────────────────────────</div>
                            <div>SYSTEM:// CONTACT_TERMINAL</div>
                            <div>STATUS: ONLINE</div>
                            <div>UPLINK: ACTIVE</div>
                            <div className="terminal-direct-divider">────────────────────────────</div>

                            <div>
                                &gt; GitHub:
                                <a
                                    href="https://github.com/compact376"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="terminal-link ml-2 text-primary hover:text-secondary transition-colors"
                                >
                                    https://github.com/compact376
                                </a>
                            </div>
                            <div>
                                &gt; Email:
                                <a
                                    href="mailto:hemedihana005@gmail.com"
                                    className="terminal-link ml-2 text-primary hover:text-secondary transition-colors"
                                >
                                    hemedihana005@gmail.com
                                </a>
                            </div>
                            <div>
                                &gt; Direct Line:
                                <a
                                    href="tel:+254758083624"
                                    className="terminal-link ml-2 text-primary hover:text-secondary transition-colors"
                                >
                                    +254 758 083 624
                                </a>
                            </div>

                            <div className="terminal-direct-divider mt-3">────────────────────────────</div>
                            <div>&gt; self-taught developer</div>
                            <div>&gt; building scalable systems</div>
                            <div>&gt; backend • architecture • research</div>

                            <div className="mt-3 text-primary/80">█ terminal ready</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FieldTerminal({
    label,
    prompt,
    value,
    placeholder,
    name,
    type = "text",
    active,
    onFocus,
    onBlur,
    onChange,
}: {
    label: string;
    prompt: string;
    value: string;
    placeholder: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    active: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (value: string) => void;
}) {
    return (
        <label className={`block terminal-field ${active ? "is-active" : ""}`}>
            <div className="flex items-center gap-2 font-mono-hud text-[10px] text-primary/70 tracking-widest mb-2">
                <span>{prompt}</span>
                <span>{label}</span>
                <span className="terminal-field-cursor blink">█</span>
            </div>
            <input
                value={value}
                type={type}
                placeholder={placeholder}
                name={name}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(event) => onChange(event.target.value)}
                className="terminal-command-input w-full bg-transparent border-none p-0 text-xs sm:text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
            />
        </label>
    );
}

function TransmissionBuffer({
    value,
    name,
    active,
    onFocus,
    onBlur,
    onChange,
}: {
    value: string;
    name: string;
    active: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-mono-hud text-[10px] text-primary/70 tracking-widest block">
                    ◢ TRANSMISSION
                </span>
                <span className="font-mono-hud text-[9px] text-muted-foreground tracking-[0.3em]">
                    TRANSMISSION BUFFER
                </span>
            </div>

            <div className={`terminal-buffer group ${active ? "is-active" : ""}`}>
                <div className="terminal-buffer-rule" />
                <div className="terminal-buffer-lines">
                    <div>────────────────────</div>
                    <div className="text-foreground/75">&gt; Describe your idea,</div>
                    <div className="text-foreground/75">&gt; project,</div>
                    <div className="text-foreground/75">&gt; opportunity,</div>
                    <div className="text-foreground/75">&gt; or message...</div>
                    <div className="flex items-start gap-1 text-foreground">
                        <span className="pt-[0.35rem]">&gt;</span>
                        <textarea
                            value={value}
                            name={name}
                            rows={4}
                            placeholder="Describe your idea, project, opportunity, or message..."
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onChange={(event) => onChange(event.target.value)}
                            className="terminal-textarea w-full bg-transparent border-none p-0 text-xs sm:text-sm text-foreground placeholder:text-foreground/30 focus:outline-none resize-none min-h-[6rem]"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-primary/70">
                        <span>&gt;</span>
                        <span className="blink">█</span>
                    </div>
                </div>
            </div>
        </label>
    );
}

