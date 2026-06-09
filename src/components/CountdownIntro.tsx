import { useEffect, useState } from "react";

export function CountdownIntro({ onDone }: { onDone: () => void }) {
   const [n, setN] = useState(10);
   useEffect(() => {
     if (n <= 0) {
       const t = setTimeout(onDone, 400);
       return () => clearTimeout(t);
     }
     const t = setTimeout(() => setN((v) => v - 1), 700);
     return () => clearTimeout(t);
   }, [n, onDone]);

   return (
     <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background">
       <div className="hud-grid-bg absolute inset-0 opacity-30" />
       <div className="text-center font-mono-hud px-4">
         <div className="text-primary/70 text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.6em] mb-3 sm:mb-4">MISSION INITIALIZING</div>
         <div
           key={n}
           className="font-display text-primary text-6xl sm:text-8xl md:text-[10rem] leading-none text-glow animate-fade-in"
         >
           {n > 0 ? `T-${n}` : "GO"}
         </div>
         <div className="text-muted-foreground text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] mt-3 sm:mt-4">
           ALL SYSTEMS NOMINAL
         </div>
       </div>
     </div>
   );
 }
