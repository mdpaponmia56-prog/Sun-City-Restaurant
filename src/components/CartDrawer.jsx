import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useLang } from '@/lib/LanguageContext';
import { formatBDT, whatsappLink } from '@/lib/restaurant';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, count, clear } = useCart();
  const { t } = useLang();
  const [orderType, setOrderType] = useState('delivery');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const deliveryFee = orderType === 'delivery' ? 60 : 0;
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + vat;

  const buildMessage = () => {
    const lines = items.map((i) => {
      const addOnText = i.addOns?.length ? ` (+${i.addOns.map((a) => a.name).join(', ')})` : '';
      return `• ${i.quantity}× ${i.name}${addOnText} — ${formatBDT((i.price + (i.addOns||[]).reduce((a,o)=>a+o.price,0)) * i.quantity)}`;
    });
    return `*New Order — Sun City Restaurant*\n\n${lines.join('\n')}\n\n*Subtotal:* ${formatBDT(subtotal)}\n*Delivery Fee:* ${formatBDT(deliveryFee)}\n*VAT (5%):* ${formatBDT(vat)}\n*Total:* ${formatBDT(total)}\n\n*Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Pickup'}\n${notes ? `*Notes:* ${notes}\n` : ''}\nPlease confirm my order. Thank you!`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-md bg-alabaster shadow-2xl flex flex-col h-full animate-fade-up">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h3 className="font-heading text-xl">Your Order ({count})</h3>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart"><X className="w-5 h-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-heading text-xl mb-1">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some delicious dishes to get started.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => (
                <div key={i.key} className="flex gap-3 pb-4 border-b border-border/60">
                  {i.image_url && <img src={i.image_url} alt={i.name} className="w-16 h-16 rounded-xl object-cover" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight">{i.name}</p>
                    {i.addOns?.length > 0 && <p className="text-[11px] text-muted-foreground mt-0.5">+ {i.addOns.map((a) => a.name).join(', ')}</p>}
                    <p className="text-gold font-semibold text-sm mt-1">{formatBDT((i.price + (i.addOns||[]).reduce((a,o)=>a+o.price,0)) * i.quantity)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(i.key, -1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-semibold w-6 text-center">{i.quantity}</span>
                      <button onClick={() => updateQty(i.key, 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeItem(i.key)} className="ml-auto text-muted-foreground hover:text-burnt"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-border space-y-3 bg-secondary/40">
              <div className="flex gap-2">
                {['delivery', 'pickup'].map((o) => (
                  <button key={o} onClick={() => setOrderType(o)} className={cn('flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-colors', orderType === o ? 'bg-obsidian text-alabaster border-obsidian' : 'border-border text-foreground/70 hover:border-gold')}>
                    {o === 'delivery' ? 'Delivery' : 'Pickup'}
                  </button>
                ))}
              </div>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Order notes (optional)" className="w-full px-3 py-2 rounded-xl border border-border text-sm bg-background focus:outline-none focus:border-gold" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery Fee</span><span>{formatBDT(deliveryFee)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>VAT (5%)</span><span>{formatBDT(vat)}</span></div>
                <div className="flex justify-between font-semibold text-base pt-1.5 border-t border-border"><span>Total</span><span className="text-gold">{formatBDT(total)}</span></div>
              </div>
              <a href={whatsappLink(buildMessage())} target="_blank" rel="noopener noreferrer" onClick={() => clear()} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1da851] transition-colors">
                <MessageCircle className="w-5 h-5" /> Send Order via WhatsApp
              </a>
              <p className="text-[10px] text-center text-muted-foreground">Opens WhatsApp with your order pre-filled. We'll confirm shortly.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}