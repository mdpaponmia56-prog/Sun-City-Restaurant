const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

const GALLERY = [
  { url: '/gallery/dining-hall-interior.jpg', cat: 'Ambiance', label: 'Grand Dining & Banquet Hall', span: 'lg:col-span-2 lg:row-span-2' },
  { url: '/gallery/sun-city-wall-logo.jpg', cat: 'Interior', label: 'Illuminated Brand Signature Wall', span: '' },
  { url: '/gallery/banquet-grand-entrance.jpg', cat: 'Events', label: 'Party & Celebration Hall Setup', span: '' },
  { url: '/gallery/restaurant-hall-foyer.jpg', cat: 'Interior', label: 'Warm Foyer & Executive Dining Corridor', span: 'lg:col-span-2' },
  { url: '/dishes/kacchi-biryani.jpg', cat: 'Food', label: 'Special Mutton Kacchi Biryani', span: '' },
  { url: '/dishes/kala-bhuna.jpg', cat: 'Food', label: 'Traditional Beef Kala Bhuna', span: '' },
  { url: '/dishes/thai-prawns.jpg', cat: 'Food', label: 'Sizzling Thai Jumbo Prawns', span: '' },
  { url: '/dishes/mutton-rezala.jpg', cat: 'Food', label: 'Shahi Mutton Rezala', span: '' },
  { url: '/dishes/reshmi-kebab.jpg', cat: 'Food', label: 'Reshmi Chicken Kebab', span: 'lg:col-span-2' },
  { url: '/dishes/firni.jpg', cat: 'Desserts', label: 'Matka Shahi Firni', span: '' },
  { url: '/dishes/tom-yum.jpg', cat: 'Food', label: 'Thai Tom Yum Seafood Soup', span: '' },
  { url: '/dishes/calamari.jpg', cat: 'Food', label: 'Crispy Calamari with Garlic Aioli', span: '' },
  { url: '/dishes/borhani.jpg', cat: 'Food', label: 'Special Royal Borhani', span: '' },
  { url: '/chef.jpg', cat: 'Kitchen', label: 'Master Chef & Kitchen Team', span: '' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...Array.from(new Set(GALLERY.map((g) => g.cat)))];
  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === filter);

  return (
    <>
      <PageHeader eyebrow="Visual Journey" title="Our" titleAccent="Gallery" subtitle="A glimpse into the ambiance, flavors, and moments that make Sun City Restaurant unforgettable." />
      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-8">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === c ? 'bg-gold text-white shadow-sm' : 'text-foreground/70 hover:bg-muted'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
            {filtered.map((g, i) => (
              <Reveal key={i} delay={(i % 4) * 60} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${g.span}`}>
                <img
                  src={g.url}
                  alt={g.label || g.cat}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onClick={() => setLightbox(g)}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4"
                  onClick={() => setLightbox(g)}
                >
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">{g.cat}</span>
                  <p className="text-white text-sm font-medium mt-0.5 line-clamp-1 drop-shadow-sm">{g.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-obsidian/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-alabaster transition-colors"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.url || lightbox}
              alt={lightbox.label || lightbox.cat || 'Gallery photo'}
              className="max-w-full max-h-[72vh] rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            />
            {lightbox.label && (
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">{lightbox.cat}</span>
                <p className="text-base sm:text-lg text-alabaster font-medium mt-1">{lightbox.label}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}