const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight } from 'lucide-react';

import Reveal from '@/components/Reveal';

export default function ReviewsPreview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Review.filter({ is_approved: true, rating: { $gte: 4 } }, '-created_date', 3)
      .then((data) => {
        const normalized = (data || []).map((r) => ({
          ...r,
          body: r.body || r.content || '',
        }));
        setReviews(normalized);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-21 lg:py-34 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-13">
          <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">Guest Voices</span>
          <h2 className="font-heading font-light text-4xl lg:text-5xl mt-4 leading-tight text-balance">
            Loved by <span className="italic gold-text">our guests</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3">Verified Google Maps reviews from visitors on the 12th floor</p>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => <div key={i} className="h-56 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Be the first to share your experience.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.id || i} delay={i * 100}>
                <div className="h-full bg-card rounded-2xl p-7 border border-border/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-gold/30" />
                      {r.source === 'google' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[10px] font-semibold text-blue-700 border border-blue-200">
                          Google Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gold/10 text-[10px] font-medium text-gold">
                          Verified Guest
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-4 h-4 ${s < r.rating ? 'fill-gold text-gold' : 'text-muted'}`} />
                      ))}
                    </div>
                    {r.title && <h3 className="font-heading font-semibold text-base mb-1.5 text-obsidian">{r.title}</h3>}
                    <p className="text-sm text-foreground/75 leading-relaxed line-clamp-4">"{r.body}"</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border/60">
                    <p className="font-heading text-base font-semibold">{r.author_name}</p>
                    {r.is_local_guide && <p className="text-[11px] text-amber-700 font-medium">★ Local Guide</p>}
                    {r.dish_name && <p className="text-xs text-muted-foreground mt-0.5">on {r.dish_name}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="text-center mt-13">
          <Link to="/reviews" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border font-semibold hover:border-gold hover:text-gold transition-colors">
            Read all reviews <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}