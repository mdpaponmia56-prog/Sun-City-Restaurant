import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

const FAQS = [
  { q: 'What are your opening hours?', a: 'We are open Tuesday through Sunday from 10:30 AM to 11:00 PM. We are closed on Mondays.' },
  { q: 'Where is Sun City Restaurant located?', a: 'We are on the 12th floor of Heaven City Centre, Chattogram. Look for the Heaven City Centre building — we are at the top with panoramic skyline views.' },
  { q: 'Do I need a reservation?', a: 'While walk-ins are welcome, we highly recommend reserving a table — especially for golden hour window seating (5:00–6:30 PM), which fills up quickly. You can reserve online or call us at 01714380876.' },
  { q: 'Can I order food for delivery or pickup?', a: 'Yes! You can build your order through our website cart and send it directly via WhatsApp. We offer both home delivery and pickup options.' },
  { q: 'Do you cater for events and parties?', a: 'Absolutely. We offer seven curated party menu packages for weddings, corporate events, and celebrations. Minimum guest counts vary by package. Contact us for custom arrangements.' },
  { q: 'Do you have vegetarian and vegan options?', a: 'Yes, our menu includes clearly marked vegetarian, vegan, and gluten-free options. Look for the diet badges on each dish, or ask our staff for recommendations.' },
  { q: 'Is parking available?', a: 'Heaven City Centre has parking facilities. Our staff can guide you to the nearest available spots when you arrive.' },
  { q: 'Can I host a private dining event?', a: 'Yes, we offer private dining space for up to 40 guests with personalized menus and dedicated service. Reach out via WhatsApp or phone to discuss your needs.' },
  { q: 'How can I pay?', a: 'We accept cash, major cards, and mobile financial services (bKash, Nagad). For online orders, payment is arranged directly with our team upon confirmation.' },
  { q: 'Do you take feedback seriously?', a: 'Every review matters to us. Share your experience on our Reviews page — we read every one and use them to improve.' },
];

function FaqItem({ q, a, open, onClick }) {
  return (
    <div className="border-b border-border">
      <button onClick={onClick} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="font-heading text-lg">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-gold shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-60 pb-5' : 'max-h-0')}>
        <p className="text-sm text-muted-foreground leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHeader eyebrow="Questions & Answers" title="Frequently Asked" titleAccent="Questions" subtitle="Everything you need to know about dining at Sun City Restaurant." />
      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="bg-card rounded-2xl border border-border/60 px-6 lg:px-8">
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}