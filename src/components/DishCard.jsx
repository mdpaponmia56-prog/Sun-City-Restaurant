const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { formatBDT } from '@/lib/restaurant';
import { useLang } from '@/lib/LanguageContext';
import SpiceIndicator from './SpiceIndicator';
import DietBadges from './DietBadges';
import { cn } from '@/lib/utils';

export default function DishCard({ dish, featured = false }) {
  const { addItem } = useCart();
  const { lang, t } = useLang();
  const name = lang === 'bn' && dish.name_bn ? dish.name_bn : dish.name;
  const desc = lang === 'bn' && dish.description_bn ? dish.description_bn : dish.description;

  return (
    <div className={cn('group relative bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-gold/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]', featured && 'md:row-span-2')}>
      <Link to={`/menu/${dish.id}`} className="block">
        <div className={cn('relative overflow-hidden', featured ? 'aspect-[4/5]' : 'aspect-[4/3]')}>
          <img
            src={dish.image_url || '/dishes/kacchi-biryani.jpg'}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {dish.is_signature && <span className="px-2.5 py-1 rounded-full bg-gold text-white text-[10px] font-bold uppercase tracking-wider">{t.common.signature}</span>}
            {dish.is_chef_recommendation && <span className="px-2.5 py-1 rounded-full bg-obsidian text-alabaster text-[10px] font-bold uppercase tracking-wider">{t.common.chefRec}</span>}
            {dish.is_popular && !dish.is_signature && <span className="px-2.5 py-1 rounded-full bg-burnt text-white text-[10px] font-bold uppercase tracking-wider">{t.common.popular}</span>}
          </div>
          <div className="absolute bottom-3 left-3">
            <SpiceIndicator level={dish.spice_level} />
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <Link to={`/menu/${dish.id}`}>
            <h3 className="font-heading text-xl leading-tight group-hover:text-gold transition-colors">{name}</h3>
          </Link>
          <span className="font-heading text-lg text-gold whitespace-nowrap">{formatBDT(dish.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{desc}</p>
        <DietBadges dish={dish} />
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => addItem(dish)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-obsidian text-alabaster text-sm font-semibold hover:bg-gold transition-colors"
          >
            <Plus className="w-4 h-4" /> {t.common.addToCart}
          </button>
          <Link to={`/menu/${dish.id}`} className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-gold hover:text-gold transition-colors">
            {t.common.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}