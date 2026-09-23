import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try { return JSON.parse(localStorage.getItem('suncity_cart') || '[]'); }
      catch { return []; }
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('suncity_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (dish, quantity = 1, addOns = []) => {
    setItems((prev) => {
      const key = `${dish.id}-${JSON.stringify(addOns)}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { key, id: dish.id, name: dish.name, price: dish.price, image_url: dish.image_url, quantity, addOns }];
    });
    setIsOpen(true);
  };

  const updateQty = (key, delta) => {
    setItems((prev) => prev
      .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0));
  };

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => {
    const addOnTotal = (i.addOns || []).reduce((a, o) => a + o.price, 0);
    return s + (i.price + addOnTotal) * i.quantity;
  }, 0);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, subtotal, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);