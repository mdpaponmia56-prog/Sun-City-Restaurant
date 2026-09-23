import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', menu: 'Menu', signature: 'Signature', gallery: 'Gallery', reservation: 'Reservation', reviews: 'Reviews', events: 'Events', contact: 'Contact', faq: 'FAQ' },
    cta: { orderNow: 'Order Now', bookTable: 'Book a Table', viewMenu: 'View Menu', explore: 'Explore', reserve: 'Reserve', whatsapp: 'Order via WhatsApp' },
    hero: {
      eyebrow: '12th Floor · Heaven City Centre · Chattogram',
      title: 'Savor the Sun,',
      titleAccent: 'Taste the Horizon',
      subtitle: 'An elevated multi-cuisine sanctuary above the city — where the golden hour meets culinary mastery.',
      scroll: 'Scroll to explore',
    },
    common: { price: 'Price', perPerson: 'per person', guests: 'guests', popular: 'Popular', chefRec: "Chef's Pick", signature: 'Signature', spicy: 'Spicy', veg: 'Veg', vegan: 'Vegan', gf: 'GF', addToCart: 'Add to Cart', viewDetails: 'View Details', loading: 'Loading…' },
  },
  bn: {
    nav: { home: 'হোম', about: 'আমাদের সম্পর্কে', menu: 'মেনু', signature: 'সিগনেচার', gallery: 'গ্যালারি', reservation: 'রিজার্ভেশন', reviews: 'রিভিউ', events: 'ইভেন্ট', contact: 'যোগাযোগ', faq: 'প্রশ্নোত্তর' },
    cta: { orderNow: 'অর্ডার করুন', bookTable: 'টেবিল বুক করুন', viewMenu: 'মেনু দেখুন', explore: 'ঘুরে দেখুন', reserve: 'বুক করুন', whatsapp: 'হোয়াটসঅ্যাপে অর্ডার' },
    hero: {
      eyebrow: '১২তম তলা · হেভেন সিটি সেন্টার · চট্টগ্রাম',
      title: 'রোদ স্বাদ,',
      titleAccent: 'দিগন্তের স্বাদ',
      subtitle: 'শহরের উপরে এক উঁচু মাল্টি-কুজিন আশ্রয় — যেখানে গোল্ডেন আওয়ার মেলে রন্ধনশৈলীর।',
      scroll: 'ঘুরে দেখতে স্ক্রল করুন',
    },
    common: { price: 'মূল্য', perPerson: 'প্রতি জন', guests: 'জন', popular: 'জনপ্রিয়', chefRec: 'শেফের পছন্দ', signature: 'সিগনেচার', spicy: 'ঝাল', veg: 'ভেজ', vegan: 'ভেগান', gf: 'জিএফ', addToCart: 'কার্টে যোগ করুন', viewDetails: 'বিস্তারিত দেখুন', loading: 'লোড হচ্ছে…' },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('suncity_lang') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('suncity_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('font-bn', lang === 'bn');
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'bn' : 'en'));
  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);