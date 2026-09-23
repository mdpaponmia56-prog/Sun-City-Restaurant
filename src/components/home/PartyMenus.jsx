const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

import Reveal from '@/components/Reveal';
import { whatsappLink } from '@/lib/restaurant';

export default function PartyMenus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.PartyMenu.list('sort_order', 50)
      .then(setMenus).catch(() => setMenus([])).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#0B0A08] text-white relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-heading font-light text-4xl lg:text-5xl leading-tight text-white">
            Party menus for <span className="italic text-[#C59B27]">every occasion</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
            Perfect menu for your special occasion — curated packages for weddings, corporate events, and family celebrations.
          </p>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/[0.03] border border-[#3E3424]/40 animate-pulse" />
            ))}
          </div>
        ) : menus.length === 0 ? (
          <p className="text-center text-white/50 py-12">Party menus coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((m, i) => (
              <Reveal key={m.id || i} delay={i * 60}>
                <div className="group h-full rounded-2xl bg-[#14120E] border border-[#3E3424] hover:border-[#C59B27]/70 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_30px_-10px_rgba(197,155,39,0.15)]">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-sans font-medium text-[#C59B27] text-base tracking-wider uppercase">
                        {m.title}
                      </h3>
                      <span className="font-sans text-sm text-white/90 font-normal whitespace-nowrap">
                        ৳{Number(m.price_per_person).toLocaleString()}/person
                      </span>
                    </div>

                    <p className="text-sm text-white/60 mb-6 leading-relaxed">
                      {m.description}
                    </p>

                    <ul className="space-y-2.5 mb-3">
                      {(m.items || []).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] mt-2 shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {m.more_count ? (
                      <p className="text-xs text-white/40 italic mb-5">
                        + {m.more_count} more items
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#2B241A] text-xs mt-4">
                    <span className="inline-flex items-center gap-1.5 text-white/60">
                      <Users className="w-3.5 h-3.5 text-white/50" />
                      Min {m.min_guests || 20} guests
                    </span>
                    <a
                      href={whatsappLink(`Hello! I would like to enquire about the ${m.title} (৳${m.price_per_person}/person) for a celebration at Sun City Restaurant.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#C59B27] hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      Enquire <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="text-center mt-14">
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C59B27] hover:bg-[#D8AB32] text-[#0E0D0B] font-semibold text-sm transition-all shadow-lg hover:shadow-[#C59B27]/25 group"
          >
            Book Your Celebration
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}