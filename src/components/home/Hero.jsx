const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { RESTAURANT } from '@/lib/restaurant';

const HERO_IMG = '/hero-hall.jpg';

export default function Hero() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => { setMounted(true); }, []);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-obsidian" onMouseMove={onMouseMove}>
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Sun City Restaurant Grand Dining & Party Hall"
          className="w-full h-full object-cover object-[center_35%]"
        />
        {/* Soft, balanced overlays - bright interior with clear text contrast */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/50 to-transparent lg:w-3/5" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-obsidian/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, hsl(41 70% 55% / 0.18), transparent 40%)` }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 w-full pt-28 pb-21">
        <div className="max-w-3xl">
          <div className={`flex items-center gap-3 mb-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium hero-text-shadow">{t.hero.eyebrow}</span>
          </div>

          <h1 className={`font-heading font-light text-alabaster hero-text-shadow leading-[1.05] ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s', fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
            {t.hero.title}
            <span className="block italic gold-text font-medium">{t.hero.titleAccent}</span>
          </h1>

          <p className={`mt-7 text-lg text-alabaster hero-text-shadow leading-relaxed max-w-xl ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.25s' }}>
            {t.hero.subtitle}
          </p>

          <div className={`mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Link to="/menu" className="group inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-gold text-obsidian font-semibold hover:bg-alabaster transition-colors solar-ring text-sm sm:text-base">
              {t.cta.viewMenu}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-sm sm:text-base">
              {t.cta.bookTable}
            </Link>
          </div>

          <Link to="/reviews" className={`mt-8 sm:mt-12 inline-flex items-center gap-4 sm:gap-6 hover:opacity-90 transition-opacity ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.55s' }}>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-gold text-gold" />)}
            </div>
            <p className="text-sm text-alabaster hero-text-shadow">
              <span className="font-semibold">4.9</span> · 850+ Google & guest reviews →
            </p>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      <div className="absolute top-28 right-8 hidden lg:block">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-gold/40 shadow-2xl backdrop-blur-sm bg-obsidian/40 p-1 hover:scale-105 transition-transform duration-300">
          <img src={RESTAURANT.logo} alt="Sun City Restaurant" className="w-full h-full object-contain drop-shadow" />
        </div>
      </div>
    </section>
  );
}