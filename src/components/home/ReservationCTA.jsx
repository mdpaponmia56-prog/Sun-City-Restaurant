const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLang } from '@/lib/LanguageContext';

const ROOFTOP_IMG = '/hero-bg.png';

export default function ReservationCTA() {
  const { t } = useLang();
  return (
    <section className="relative py-21 lg:py-34 overflow-hidden">
      <div className="absolute inset-0">
        <img src={ROOFTOP_IMG} alt="Sun City rooftop view at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/75" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <Reveal>
          <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Reserve Your Table</span>
          <h2 className="font-heading font-light text-4xl lg:text-6xl mt-4 leading-tight text-alabaster text-balance">
            Dine above the city, <span className="italic gold-text">where the sun meets the horizon</span>
          </h2>
          <p className="mt-6 text-lg text-alabaster/80 leading-relaxed max-w-2xl mx-auto">
            Secure your window-view table for the golden hour — between 5 PM and 6:30 PM for the most breathtaking Chattogram skyline experience.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-alabaster/80">
          <span className="inline-flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-gold" /> Open Tue–Sun</span>
          <span className="inline-flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-gold" /> 10:30 AM – 11 PM</span>
          <span className="inline-flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-gold" /> Parties of any size</span>
        </Reveal>

        <Reveal delay={250} className="mt-10">
          <Link to="/reservation" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-obsidian font-semibold hover:bg-alabaster transition-colors solar-ring">
            {t.cta.bookTable}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}