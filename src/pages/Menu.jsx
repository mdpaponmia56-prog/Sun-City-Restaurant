const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

import PageHeader from '@/components/PageHeader';
import DishCard from '@/components/DishCard';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Appetizers', 'Biryani & Rice', 'Curries', 'Kebabs & Grills', 'Seafood', 'Thai & Chinese', 'Desserts', 'Beverages', 'Breads', 'Salads'];
const FILTERS = [
  { key: 'is_popular', label: 'Popular' },
  { key: 'is_chef_recommendation', label: "Chef's Pick" },
  { key: 'is_vegetarian', label: 'Vegetarian' },
  { key: 'is_vegan', label: 'Vegan' },
  { key: 'is_gluten_free', label: 'Gluten Free' },
];

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    db.entities.Dish.list('sort_order', 200)
      .then(setDishes).catch(() => setDishes([])).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      if (category !== 'All' && d.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchesEn = d.name?.toLowerCase().includes(q) || (d.description || '').toLowerCase().includes(q);
        const matchesBn = (d.name_bn || '').includes(search) || (d.description_bn || '').includes(search);
        if (!matchesEn && !matchesBn) return false;
      }
      if (activeFilters.length && !activeFilters.every((f) => d[f])) return false;
      return true;
    });
  }, [dishes, category, search, activeFilters]);

  const toggleFilter = (f) => setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  return (
    <>
      <PageHeader eyebrow="Our Cuisine" title="The" titleAccent="Menu" subtitle="A curated journey through Bengali, Mughlai, Thai, Chinese, and continental flavors — each dish crafted with the finest ingredients." />

      <div className="sticky top-20 z-30 glass border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes…"
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => toggleFilter(f.key)}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors', activeFilters.includes(f.key) ? 'bg-obsidian text-alabaster border-obsidian' : 'border-border text-foreground/70 hover:border-gold')}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn('px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors', category === c ? 'bg-gold text-white' : 'text-foreground/70 hover:bg-muted')}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-13 lg:py-21 bg-alabaster min-h-[50vh]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-21">
              <p className="font-heading text-2xl text-muted-foreground">No dishes found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">{filtered.length} dish{filtered.length !== 1 ? 'es' : ''} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((d, i) => (
                  <Reveal key={d.id} delay={(i % 3) * 80}>
                    <DishCard dish={d} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}