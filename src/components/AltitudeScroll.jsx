import React from 'react';
import { useScrollProgress } from '@/lib/hooks';

export default function AltitudeScroll() {
  const progress = useScrollProgress();
  const floors = Math.min(12, Math.round((progress / 100) * 12));

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2">
      <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground rotate-180 [writing-mode:vertical-rl] mb-2">Altitude</div>
      <div className="relative h-48 w-px bg-border">
        <div className="absolute top-0 left-0 w-px bg-gold transition-all duration-300" style={{ height: `${(floors / 12) * 100}%` }} />
      </div>
      <div className="font-heading text-2xl text-gold leading-none">{floors}<span className="text-xs text-muted-foreground">/12</span></div>
      <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Floor</div>
    </div>
  );
}