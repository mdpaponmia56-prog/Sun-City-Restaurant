import React from 'react';
import { Phone, Mail, MapPin, Clock, Navigation, MessageCircle, Facebook, Instagram } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { RESTAURANT, whatsappLink } from '@/lib/restaurant';

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Contact" titleAccent="Us" subtitle="We'd love to hear from you — for reservations, inquiries, or just to say hello." />
      <section className="py-8 lg:py-12 bg-alabaster">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Visit Us', value: RESTAURANT.address, sub: RESTAURANT.addressLine2, links: [{ text: 'Google Maps', href: RESTAURANT.googleMaps }, { text: 'Apple Maps', href: RESTAURANT.appleMaps }] },
                { icon: Phone, label: 'Call Us', value: RESTAURANT.phone, links: [{ text: 'Call now', href: `tel:${RESTAURANT.phone}` }] },
                { icon: Mail, label: 'Email Us', value: RESTAURANT.email, links: [{ text: 'Send email', href: `mailto:${RESTAURANT.email}` }] },
                { icon: Clock, label: 'Opening Hours', hours: RESTAURANT.hours },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 80}>
                  <div className="p-6 rounded-2xl bg-card border border-border/60">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><c.icon className="w-5 h-5 text-gold" /></div>
                      <h3 className="font-heading text-xl">{c.label}</h3>
                    </div>
                    {c.value && <p className="text-sm font-medium">{c.value}</p>}
                    {c.sub && <p className="text-sm text-muted-foreground">{c.sub}</p>}
                    {c.hours && (
                      <ul className="mt-2 space-y-1 text-sm">
                        {c.hours.map((h) => (
                          <li key={h.day} className="flex justify-between"><span className="text-muted-foreground">{h.day}</span><span className={h.time === 'Closed' ? 'text-burnt font-medium' : 'font-medium'}>{h.time}</span></li>
                        ))}
                      </ul>
                    )}
                    {c.links && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {c.links.map((l) => <a key={l.text} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-xs font-semibold text-gold hover:underline">{l.text} →</a>)}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}

              <Reveal delay={320}>
                <div className="p-6 rounded-2xl bg-obsidian text-alabaster">
                  <h3 className="font-heading text-xl mb-4">Follow & Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href={RESTAURANT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-alabaster/20 hover:border-gold hover:text-gold transition-colors text-sm"><Facebook className="w-4 h-4" /> Facebook</a>
                    <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-alabaster/20 hover:border-gold hover:text-gold transition-colors text-sm"><Instagram className="w-4 h-4" /> Instagram</a>
                    <a href={whatsappLink('Hello Sun City Restaurant!')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="rounded-3xl overflow-hidden border border-border/60 h-[450px] lg:h-full lg:min-h-[450px] bg-muted">
                <iframe
                  title="Sun City Restaurant location"
                  src="https://www.google.com/maps?q=Sun+City+Restaurant+Heaven+City+Centre+Chattogram&z=16&output=embed"
                  className="w-full h-full"
                  style={{ border: 0, minHeight: '450px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10 p-6 rounded-2xl bg-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-gold" />
              <p className="text-sm">One-click navigation to Sun City Restaurant</p>
            </div>
            <div className="flex gap-3">
              <a href={RESTAURANT.googleMaps} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-obsidian text-alabaster text-sm font-semibold hover:bg-gold transition-colors">Google Maps</a>
              <a href={RESTAURANT.appleMaps} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:border-gold hover:text-gold transition-colors">Apple Maps</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}