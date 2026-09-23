import React from 'react';
import { cn } from '@/lib/utils';

export default function SpiceIndicator({ level = 'Mild', size = 'sm' }) {
  const levels = { Mild: 1, Medium: 2, Hot: 3, 'Extra Hot': 4 };
  const count = levels[level] || 1;
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4' };
  return (
    <span className="inline-flex items-center gap-0.5" title={`Spice: ${level}`} aria-label={`Spice level ${level}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={cn('inline-block rounded-full', sizes[size], i < count ? 'bg-burnt' : 'bg-muted')} />
      ))}
    </span>
  );
}