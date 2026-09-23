import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, PartyPopper, ArrowRight, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { whatsappLink } from '@/lib/restaurant';

const EVENTS = [
  { icon: PartyPopper, title: 'Weddings & Receptions', desc: 'Celebrate your big day above the city. Custom menus, dedicated staff, and a skyline backdrop for memories that last forever.', capacity: 'Up to 200 guests' },
  { icon: Users, title: 'Corporate Events', desc: 'Host team dinners, client meetings, and year-end celebrations with curated multi-cuisine menus and private dining options.', capacity: 'Up to 150 guests' },
  { icon: Calendar, title: 'Birthday Parties', desc: 'Make birthdays unforgettable with our party menu packages, cake arrangements, and golden-hour window seating.', capacity: 'From 20 guests' },
  { icon: Sparkles, title: 'Private Dining', desc: 'Intimate gatherings in our private dining space with personalized menus and dedicated service.', capacity: 'Up to 40 guests' },
];

export default function Events() {
  return (
    <>
      <PageHeader eyebrow="Celebrate With Us" title="Events" titleAccent="& Celebrations" subtitle="From intimate gatherings to grand celebrations — we elevate every occasion on the 12th floor." />
      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <div className="group p-7 rounded-2xl bg-card border border-border/60 hover:border-gold/40 transition-colors h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                      <e.icon className="w-7 h-7 text-gold group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl mb-2">{e.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{e.desc}</p>
                      <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{e.capacity}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-13 p-8 lg:p-13 rounded-3xl bg-obsidian text-alabaster text-center">
            <h2 className="font-heading font-light text-3xl lg:text-4xl">Planning an event?</h2>
            <p className="mt-4 text-alabaster/70 max-w-xl mx-auto">Let our team craft a bespoke experience for your special occasion. Reach out for customized packages and availability.</p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <a href={whatsappLink('Hello! I would like to enquire about hosting an event at Sun City Restaurant.')} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold">Enquire via WhatsApp</a>
              <Link to="/reservation" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-obsidian font-semibold hover:bg-alabaster transition-colors">
                Reserve a table <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}