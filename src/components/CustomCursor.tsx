import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outer = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, hot: false });
  const raf = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      target.current.hot = !!(
        e.target as HTMLElement
      ).closest("button, a, [data-hot]");
    };

    const tick = () => {
      const { x, y, hot } = target.current;
      if (outer.current) {
        // GPU‑accelerated position – no transitions, no repaints
        outer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        outer.current.classList.toggle("hot", hot);
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={outer}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ willChange: "transform" }}
    >
      {/* Single element: the dot + crosshair drawn with pseudo‑elements */}
      <div className="relative flex items-center justify-center" style={{ width: 0, height: 0 }}>
        <div
          className="
            relative h-2 w-2 rounded-full border border-primary bg-transparent
            before:absolute before:top-1/2 before:-left-3 before:h-px before:w-2 before:bg-primary before:-translate-y-1/2
            after:absolute after:top-1/2 after:left-1  after:h-px after:w-2 after:bg-primary after:-translate-y-1/2
          "
        />
        {/* Vertical line pair */}
        <div
          className="
            absolute h-2 w-px bg-primary
            before:absolute before:left-1/2 before:-top-3 before:h-2 before:w-px before:bg-primary before:-translate-x-1/2
            after:absolute after:left-1/2 after:top-1  after:h-2 after:w-px after:bg-primary after:-translate-x-1/2
          "
          style={{ top: '-2px', left: '3px' }}
        />
      </div>
      {/* Hot state sheet – completely static, no inline style toggling */}
      <style>{`
        .hot .rounded-full {
          background-color: hsl(var(--primary) / 0.6);
          box-shadow: 0 0 8px hsl(var(--primary));
        }
        .hot {
          transform: scale(1.5);
          transition: transform 0.1s ease;
        }
      `}</style>
    </div>
  );
};
