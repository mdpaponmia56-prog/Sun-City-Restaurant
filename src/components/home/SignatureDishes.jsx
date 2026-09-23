const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import DishCard from '@/components/DishCard';
import Reveal from '@/components/Reveal';
import { useLang } from '@/lib/LanguageContext';

export default function SignatureDishes() {
  const { t } = useLang();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Dish.filter({ is_signature: true }, '-sort_order', 6)
      .then(setDishes).catch(() => setDishes([])).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-21 lg:py-34 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-13">
          <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Chef's Selection</span>
          <h2 className="font-heading font-light text-4xl lg:text-5xl mt-4 leading-tight text-balance">
            Signature dishes that <span className="italic gold-text">define us</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Each plate tells a story of tradition, technique, and the finest ingredients — crafted to be unforgettable.
          </p>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((i) => <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : dishes.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Signature dishes coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((d, i) => (
              <Reveal key={d.id} delay={i * 100}>
                <DishCard dish={d} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="text-center mt-13">
          <Link to="/menu" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-obsidian text-alabaster font-semibold hover:bg-gold transition-colors">
            Explore Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}