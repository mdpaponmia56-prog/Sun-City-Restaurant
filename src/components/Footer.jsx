import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { RESTAURANT } from '@/lib/restaurant';

export default function Footer() {
  const year = new Date().getFullYear();

  const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Menu', to: '/menu' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Events', to: '/events' },
  ];

  const visitLinks = [
    { label: 'Reservation', to: '/reservation' },
    { label: 'Reviews', to: '/reviews' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ];

  return (
    <footer className="relative bg-obsidian text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 gold-gradient" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 15% 20%, hsl(41 70% 55%) 0, transparent 40%), radial-gradient(circle at 85% 80%, hsl(18 65% 48%) 0, transparent 40%)' }} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-amber-500/40">
                <img src={RESTAURANT.logo} alt="Sun City Restaurant" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-heading text-2xl text-white">Sun City</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Restaurant</p>
              </div>
            </div>
            <p className="font-heading italic text-lg text-white/80 leading-relaxed max-w-xs">
              "{RESTAURANT.tagline}"
            </p>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              An elevated multi-cuisine sanctuary on the 12th floor of Heaven City Centre, Chattogram.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={RESTAURANT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit Sun City Restaurant on Facebook" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-white/5 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Sun City Restaurant on Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-white/5 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-5 font-semibold">Explore</h4>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-5 font-semibold">Visit</h4>
            <ul className="space-y-3 text-sm">
              {visitLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-5 font-semibold">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>{RESTAURANT.address}<br />{RESTAURANT.addressLine2}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${RESTAURANT.phone}`} className="hover:text-gold transition-colors">{RESTAURANT.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${RESTAURANT.email}`} className="hover:text-gold transition-colors break-all">{RESTAURANT.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>Tue–Sun: 10:30 AM – 11 PM<br />Monday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {year} Sun City Restaurant. All rights reserved.</p>
          <p className="text-xs text-white/50">12th Floor · Heaven City Centre · Chattogram</p>
        </div>
      </div>
    </footer>
  );
}