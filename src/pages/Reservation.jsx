const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { Calendar, Clock, Users, Check, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

import { RESTAURANT, whatsappLink } from '@/lib/restaurant';
import { cn } from '@/lib/utils';

const TIME_SLOTS = ['10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:30 PM', '9:00 PM'];
const SEATING = ['Indoor Luxury', 'Window View', 'Private Dining'];

export default function Reservation() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ guests: 2, seating: 'Window View', date: '', time: '', name: '', email: '', phone: '', special_requests: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isPrime = form.time && ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'].includes(form.time);
  const isMonday = form.date && new Date(form.date + 'T00:00:00').getDay() === 1;

  const buildReservationMessage = () => {
    return `*New Reservation Request — Sun City Restaurant*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'N/A'}\n*Guests:* ${form.guests}\n*Seating:* ${form.seating}\n*Date:* ${form.date}\n*Time:* ${form.time}${form.special_requests ? `\n*Special Requests:* ${form.special_requests}` : ''}\n\nPlease confirm my reservation. Thank you!`;
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      await db.entities.Reservation.create({ ...form, status: 'pending' });
      window.open(whatsappLink(buildReservationMessage()), '_blank');
      setDone(true);
    } catch (e) {
      alert('Something went wrong. Please call us at ' + RESTAURANT.phone);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <PageHeader eyebrow="Reservation" title="See you" titleAccent="soon" />
        <div className="py-21 text-center px-5">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-heading text-4xl mb-3">Reservation Requested!</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Thank you, {form.name}. We've received your request for {form.guests} guest(s) on {form.date} at {form.time}. WhatsApp has opened with your details — please send the message to confirm your reservation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={whatsappLink(buildReservationMessage())} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold inline-flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Re-open WhatsApp</a>
            <a href={`tel:${RESTAURANT.phone}`} className="px-6 py-3 rounded-full border border-border font-semibold hover:border-gold hover:text-gold transition-colors">Call {RESTAURANT.phone}</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Reservation" title="Book your" titleAccent="table" subtitle="Reserve your spot above the Chattogram skyline. Golden hour slots (5–6:30 PM) offer the finest window views." />

      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            {[1,2,3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors', step >= s ? 'bg-gold border-gold text-white' : 'border-border text-muted-foreground')}>{step > s ? <Check className="w-5 h-5" /> : s}</div>
                {s < 3 && <div className={cn('flex-1 h-0.5 mx-2 transition-colors', step > s ? 'bg-gold' : 'bg-border')} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Reveal className="space-y-8">
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">How many guests?</label>
                <div className="flex items-center gap-4 mt-4">
                  <button onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))} className="w-14 h-14 rounded-full border-2 border-border text-2xl hover:border-gold">−</button>
                  <span className="font-heading text-6xl w-20 text-center">{form.guests}</span>
                  <button onClick={() => setForm((f) => ({ ...f, guests: Math.min(50, f.guests + 1) }))} className="w-14 h-14 rounded-full border-2 border-border text-2xl hover:border-gold">+</button>
                </div>
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Select your vibe</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  {SEATING.map((s) => (
                    <button key={s} onClick={() => setForm((f) => ({ ...f, seating: s }))} className={cn('p-4 rounded-xl border-2 text-sm font-medium transition-colors text-left', form.seating === s ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50')}>
                      <div className="flex items-center justify-between">
                        {s}
                        {form.seating === s && <Check className="w-4 h-4 text-gold" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!form.guests} className="w-full py-4 rounded-full bg-obsidian text-alabaster font-semibold flex items-center justify-center gap-2 hover:bg-gold transition-colors">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal className="space-y-8">
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium flex items-center gap-2"><Calendar className="w-4 h-4" /> Select date</label>
                <input type="date" min={today} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full mt-3 px-4 py-3.5 rounded-xl border border-border bg-background focus:outline-none focus:border-gold" />
                {isMonday && (
                  <p className="mt-2 text-xs font-semibold text-burnt">
                    ⚠️ Sun City Restaurant is closed on Mondays. Please choose Tuesday through Sunday.
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Select time {isPrime && <span className="text-burnt normal-case tracking-normal text-[10px] font-bold">★ Prime Golden Hour</span>}</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3">
                  {TIME_SLOTS.map((t) => {
                    const prime = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'].includes(t);
                    return (
                      <button key={t} onClick={() => setForm((f) => ({ ...f, time: t }))} className={cn('py-3 rounded-xl border text-sm font-medium transition-colors', form.time === t ? 'bg-gold text-white border-gold' : prime ? 'border-burnt/40 text-burnt hover:bg-burnt/5' : 'border-border hover:border-gold')}>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full border border-border font-semibold flex items-center gap-2 hover:border-gold"><ArrowLeft className="w-4 h-4" /> Back</button>
                <button onClick={() => setStep(3)} disabled={!form.date || !form.time || isMonday} className="flex-1 py-4 rounded-full bg-obsidian text-alabaster font-semibold flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-gold transition-colors">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          )}

          {step === 3 && (
            <Reveal className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full mt-2 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full mt-2 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold" placeholder="01XXXXXXXXX" />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Email (optional)</label>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full mt-2 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold" placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-gold font-medium">Special requests (optional)</label>
                <textarea value={form.special_requests} onChange={(e) => setForm((f) => ({ ...f, special_requests: e.target.value }))} rows={3} className="w-full mt-2 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold resize-none" placeholder="Birthday cake, dietary needs, window preference…" />
              </div>

              <div className="p-4 rounded-xl bg-secondary/40 text-sm space-y-1.5">
                <p className="font-semibold mb-2">Reservation Summary</p>
                <p><Users className="w-3.5 h-3.5 inline mr-1.5 text-gold" />{form.guests} guests · {form.seating}</p>
                <p><Calendar className="w-3.5 h-3.5 inline mr-1.5 text-gold" />{form.date || '—'} at {form.time || '—'}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-4 rounded-full border border-border font-semibold flex items-center gap-2 hover:border-gold"><ArrowLeft className="w-4 h-4" /> Back</button>
                <button onClick={submit} disabled={!form.name || !form.phone || submitting} className="flex-1 py-4 rounded-full bg-gold text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity">
                  {submitting ? 'Submitting…' : 'Confirm Reservation'}
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}