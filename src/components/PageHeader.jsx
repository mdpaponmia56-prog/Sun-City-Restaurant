import React from 'react';
import Reveal from '@/components/Reveal';

export default function PageHeader({ eyebrow = '', title = '', titleAccent = '', subtitle = '' }) {
  return (
    <section className="relative pt-34 pb-13 bg-obsidian text-alabaster overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, hsl(41 70% 55%) 0, transparent 45%), radial-gradient(circle at 75% 70%, hsl(18 65% 48%) 0, transparent 45%)' }} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <Reveal>
          {eyebrow && <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">{eyebrow}</span>}
          <h1 className="font-heading font-light text-4xl lg:text-6xl mt-3 leading-tight text-balance">
            {title} {titleAccent && <span className="italic gold-text">{titleAccent}</span>}
          </h1>
          {subtitle && <p className="mt-5 text-lg text-alabaster/70 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}