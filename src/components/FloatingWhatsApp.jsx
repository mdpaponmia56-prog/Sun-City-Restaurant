import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { RESTAURANT, whatsappLink } from '@/lib/restaurant';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const msg = `Hello Sun City Restaurant! I'd like to know more about your menu and ordering.`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass rounded-2xl shadow-2xl border border-border/60 p-5 w-72 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-obsidian">Sun City Restaurant</p>
                <p className="text-[10px] text-green-600 font-medium">● Online now</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
            Hi there! 👋 How can we help you today? Order food, book a table, or ask about our party menus.
          </p>
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Start Chat
          </a>
          <a href={`tel:${RESTAURANT.phone}`} className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-xl border border-border text-sm font-medium text-obsidian hover:border-gold hover:text-gold transition-colors">
            <Phone className="w-4 h-4" /> {RESTAURANT.phone}
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        {open ? <X className="w-6 h-6 text-white relative" /> : <MessageCircle className="w-7 h-7 text-white relative" />}
      </button>
    </div>
  );
}