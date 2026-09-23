const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, ShoppingBag } from 'lucide-react';

import { useCart } from '@/lib/CartContext';
import { formatBDT } from '@/lib/restaurant';
import SpiceIndicator from '@/components/SpiceIndicator';
import DietBadges from '@/components/DietBadges';
import DishCard from '@/components/DishCard';

export default function DishDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [dish, setDish] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    db.entities.Dish.get(id)
      .then((d) => {
        setDish(d);
        if (d?.category) {
          db.entities.Dish.filter({ category: d.category }, '-sort_order', 4)
            .then((items) => setRelated(items.filter((x) => x.id !== d.id).slice(0, 3)))
            .catch(() => setRelated([]));
        }
      })
      .catch(() => setDish(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-34 min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-gold rounded-full animate-spin" /></div>;
  if (!dish) return (
    <div className="pt-34 min-h-screen flex flex-col items-center justify-center text-center px-5">
      <h1 className="font-heading text-4xl">Dish not found</h1>
      <Link to="/menu" className="mt-6 px-6 py-3 rounded-full bg-obsidian text-alabaster font-semibold">Back to Menu</Link>
    </div>
  );

  const gallery = dish.gallery?.length ? dish.gallery : [dish.image_url].filter(Boolean);
  const addOnTotal = selectedAddOns.reduce((s, i) => s + (dish.add_ons?.[i]?.price || 0), 0);
  const total = (dish.price + addOnTotal) * qty;

  const toggleAddOn = (i) => setSelectedAddOns((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const handleAdd = () => {
    const addOns = selectedAddOns.map((i) => dish.add_ons[i]).filter(Boolean);
    addItem(dish, qty, addOns);
    setQty(1); setSelectedAddOns([]);
  };

  return (
    <>
      <div className="pt-20" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-13">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-13">
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
              <img src={gallery[activeImg] || gallery[0]} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4">
                {gallery.map((g, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-gold' : 'border-transparent'}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {dish.is_signature && <span className="px-3 py-1 rounded-full bg-gold text-white text-xs font-bold uppercase tracking-wider">Signature</span>}
              {dish.is_chef_recommendation && <span className="px-3 py-1 rounded-full bg-obsidian text-alabaster text-xs font-bold uppercase tracking-wider">Chef's Pick</span>}
              {dish.is_popular && <span className="px-3 py-1 rounded-full bg-burnt text-white text-xs font-bold uppercase tracking-wider">Popular</span>}
            </div>

            <h1 className="font-heading font-light text-4xl lg:text-5xl leading-tight">{dish.name_bn && document.documentElement.lang === 'bn' ? dish.name_bn : dish.name}</h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{dish.description_bn && document.documentElement.lang === 'bn' ? dish.description_bn : dish.description}</p>

            <div className="flex items-center gap-4 mt-5">
              <span className="font-heading text-3xl text-gold">{formatBDT(dish.price)}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <SpiceIndicator level={dish.spice_level} size="md" />
              <span className="text-sm text-muted-foreground">{dish.spice_level}</span>
            </div>

            <div className="mt-5"><DietBadges dish={dish} size="md" /></div>

            {dish.ingredients && (
              <div className="mt-7">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-2">Ingredients</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{dish.ingredients}</p>
              </div>
            )}
            {dish.nutrition && (
              <div className="mt-5">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-2">Nutrition</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{dish.nutrition}</p>
              </div>
            )}
            {dish.allergens && (
              <div className="mt-5">
                <h3 className="text-xs tracking-[0.2em] uppercase text-burnt font-medium mb-2">Allergens</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{dish.allergens}</p>
              </div>
            )}

            {dish.add_ons?.length > 0 && (
              <div className="mt-7">
                <h3 className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-3">Add-ons</h3>
                <div className="space-y-2">
                  {dish.add_ons.map((a, i) => (
                    <button key={i} onClick={() => toggleAddOn(i)} className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${selectedAddOns.includes(i) ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50'}`}>
                      <span className="flex items-center gap-2 text-sm">
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddOns.includes(i) ? 'border-gold bg-gold' : 'border-border'}`}>
                          {selectedAddOns.includes(i) && <Check className="w-3 h-3 text-white" />}
                        </span>
                        {a.name}
                      </span>
                      <span className="text-sm font-semibold text-gold">+{formatBDT(a.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-1 border border-border rounded-full self-center">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:text-gold"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:text-gold"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-obsidian text-alabaster font-semibold hover:bg-gold transition-colors">
                <ShoppingBag className="w-4 h-4" /> Add to Cart · {formatBDT(total)}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-21">
            <h2 className="font-heading text-3xl mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((d) => <DishCard key={d.id} dish={d} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}