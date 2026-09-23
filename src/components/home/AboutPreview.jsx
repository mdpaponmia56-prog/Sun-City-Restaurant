const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, UtensilsCrossed, Building2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLang } from '@/lib/LanguageContext';

const INTERIOR_IMG = '/gallery/dining-hall-interior.jpg';

export default function AboutPreview() {
  const { lang } = useLang();
  const stats = [
    { icon: Building2, value: '12th', label: lang === 'bn' ? 'তলায় অবস্থিত' : 'Floor Location' },
    { icon: UtensilsCrossed, value: '120+', label: lang === 'bn' ? 'মেনু আইটেম' : 'Menu Items' },
    { icon: Award, value: '4.9★', label: lang === 'bn' ? 'গেস্ট রেটিং' : 'Guest Rating' },
  ];

  return (
    <section className="py-21 lg:py-34 bg-alabaster">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img src={INTERIOR_IMG} alt="Sun City Restaurant interior" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={200} className="absolute -bottom-6 right-2 lg:-right-8 glass rounded-2xl p-5 sm:p-6 shadow-xl max-w-[180px] sm:max-w-[200px]">
              <p className="font-heading text-4xl text-gold leading-none">12<span className="text-lg">th</span></p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Floor of Heaven City Centre — dining above the Chattogram skyline</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <Reveal>
              <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Our Story</span>
              <h2 className="font-heading font-light text-4xl lg:text-5xl mt-4 leading-tight text-balance">
                Where the <span className="italic gold-text">golden hour</span> meets culinary mastery
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                Perched on the 12th floor of Heaven City Centre, Sun City Restaurant is Chattogram's premier multi-cuisine destination. We blend the rich heritage of Bengali and Mughlai cooking with Thai, Chinese, and continental flair — all served against a breathtaking skyline backdrop.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Every dish is crafted with intention, every guest welcomed like family. From intimate dinners to grand celebrations, we elevate every occasion.
              </p>
            </Reveal>

            <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-8 sm:mt-10">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={150 + i * 100}>
                  <div className="text-center lg:text-left">
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold mb-2 mx-auto lg:mx-0" />
                    <p className="font-heading text-2xl sm:text-3xl text-obsidian">{s.value}</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={450}>
              <Link to="/about" className="group inline-flex items-center gap-2 mt-10 text-sm font-semibold text-obsidian hover:text-gold transition-colors">
                Discover our story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}