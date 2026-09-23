const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Building2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

const INTERIOR_IMG = '/gallery/dining-hall-interior.jpg';
const CHEF_IMG = '/chef.jpg';

export default function About() {
  const values = [
    { icon: Heart, title: 'Hospitality First', desc: 'Every guest is family. We welcome you with warmth that defines Bengali tradition.' },
    { icon: Award, title: 'Culinary Excellence', desc: 'Decades of expertise in Mughlai, Bengali, Thai, and Chinese cuisine, refined to perfection.' },
    { icon: Building2, title: 'The 12th Floor', desc: 'An elevated sanctuary above Chattogram — dining with a view that takes your breath away.' },
  ];

  return (
    <>
      <PageHeader eyebrow="Our Story" title="About" titleAccent="Sun City" subtitle="A multi-cuisine sanctuary on the 12th floor of Heaven City Centre, where tradition meets the horizon." />

      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-13 items-center">
            <Reveal>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img src={INTERIOR_IMG} alt="Sun City Restaurant interior" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Est. Chattogram</span>
              <h2 className="font-heading font-light text-3xl lg:text-4xl mt-3 leading-tight text-balance">
                A dining experience <span className="italic gold-text">above the ordinary</span>
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                Sun City Restaurant was born from a simple vision: to elevate dining in Chattogram to an art form. Perched on the 12th floor of Heaven City Centre, we offer more than a meal — we offer an experience where the golden hour paints the skyline and every dish tells a story.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Our chefs draw from the rich culinary heritage of Bengal and Mughal India, complemented by the vibrant flavors of Thai and Chinese cuisine. From the legendary Kacchi Biryani to sizzling Thai prawns, every plate is crafted with intention and served with pride.
              </p>
              <Link to="/menu" className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-obsidian hover:text-gold transition-colors">
                Explore our menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-21">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="p-7 rounded-2xl bg-card border border-border/60 hover:border-gold/40 transition-colors h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading text-2xl mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-21">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              <img src={CHEF_IMG} alt="Chef plating a dish" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 to-transparent flex items-center">
                <div className="p-8 lg:p-13 max-w-lg">
                  <h3 className="font-heading font-light text-3xl lg:text-4xl text-alabaster leading-tight">Crafted with <span className="italic gold-text">passion</span></h3>
                  <p className="mt-4 text-alabaster/80 leading-relaxed">Our kitchen is a place where tradition meets technique — every dish plated with the precision of an artist and the heart of a host.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}