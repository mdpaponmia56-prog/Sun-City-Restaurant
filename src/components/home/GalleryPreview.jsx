const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const GALLERY = [
  { url: '/gallery/dining-hall-interior.jpg', span: 'lg:col-span-2 lg:row-span-2', label: 'Grand Dining & Banquet Hall' },
  { url: '/gallery/sun-city-wall-logo.jpg', span: '', label: 'Illuminated Brand Signature' },
  { url: '/gallery/banquet-grand-entrance.jpg', span: '', label: 'Party & Celebration Hall' },
  { url: '/gallery/restaurant-hall-foyer.jpg', span: 'lg:col-span-2', label: 'Executive Foyer & Corridor' },
  { url: '/dishes/kacchi-biryani.jpg', span: '', label: 'Special Mutton Kacchi Biryani' },
  { url: '/dishes/kala-bhuna.jpg', span: '', label: 'Traditional Beef Kala Bhuna' },
];

export default function GalleryPreview() {
  return (
    <section className="py-21 lg:py-34 bg-alabaster">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-13">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">A Glimpse</span>
            <h2 className="font-heading font-light text-4xl lg:text-5xl mt-4 leading-tight text-balance">
              Moments at <span className="italic gold-text">Sun City</span>
            </h2>
          </div>
          <Link to="/gallery" className="group inline-flex items-center gap-2 text-sm font-semibold text-obsidian hover:text-gold transition-colors">
            View full gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px] lg:auto-rows-[220px]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={i * 60} className={`group relative overflow-hidden rounded-2xl ${g.span}`}>
              <img src={g.url} alt={g.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-4 left-4 text-alabaster text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{g.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}