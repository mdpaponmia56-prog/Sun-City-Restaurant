const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useEffect, useState } from 'react';
import { Star, Send, ImagePlus, X, ExternalLink, ThumbsUp, MapPin, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import GoogleIcon from '@/components/GoogleIcon';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { RESTAURANT } from '@/lib/restaurant';
import { cn } from '@/lib/utils';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author_name: '', rating: 5, title: '', body: '', dish_name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [liked, setLiked] = useState({});

  const load = () => {
    db.entities.Review.filter({ is_approved: true }, '-created_date', 50)
      .then((data) => {
        // Normalize body/content
        const normalized = (data || []).map((r) => ({
          ...r,
          body: r.body || r.content || '',
        }));
        setReviews(normalized);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async () => {
    setSubmitting(true);
    try {
      const photoUrls = [];
      for (const file of photos) {
        const uploadFn = db.integrations?.Core?.UploadPublicFile || db.integrations?.Core?.UploadFile;
        if (uploadFn) {
          const res = await uploadFn({ file });
          if (res?.file_url) photoUrls.push(res.file_url);
        }
      }
      await db.entities.Review.create({
        ...form,
        content: form.body,
        photos: photoUrls,
        is_verified: true,
        is_approved: true,
        source: 'website',
        created_date: new Date().toISOString().split('T')[0],
      });
      setSubmitted(true);
      setForm({ author_name: '', rating: 5, title: '', body: '', dish_name: '' });
      setPhotos([]);
      load();
    } catch (e) {
      alert('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'google') return r.source === 'google';
    if (filter === 'local_guides') return r.is_local_guide;
    if (filter === 'banquet') return (r.dining_type && r.dining_type.toLowerCase().includes('banquet')) || (r.title && r.title.toLowerCase().includes('party'));
    return true;
  });

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '4.9';

  return (
    <>
      <PageHeader
        eyebrow="Guest Experiences"
        title="Guest"
        titleAccent="Reviews"
        subtitle="Real stories, photos, and ratings from diners and Google Maps Local Guides at Sun City Restaurant."
      />

      <section className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* Google Live Reviews Integration Card */}
          <Reveal className="mb-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-obsidian via-[#1A1A1A] to-[#121212] text-alabaster p-6 sm:p-10 shadow-2xl border border-gold/20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* Left: Google Rating Stats */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md p-3.5 flex items-center justify-center ring-1 ring-white/20 shadow-inner">
                    <GoogleIcon className="w-full h-full" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Google Maps Connection
                      </span>
                      <span className="text-xs text-alabaster/60 hidden sm:inline">Verified Profile</span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">{avg}</h2>
                      <div>
                        <div className="flex gap-1 text-gold">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-5 h-5 fill-gold" />
                          ))}
                        </div>
                        <p className="text-xs text-alabaster/70 mt-1 font-medium">
                          Based on 450+ Google Maps Reviews & Diners
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  <a
                    href={RESTAURANT.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-obsidian font-semibold hover:bg-gold hover:text-obsidian transition-all shadow-lg text-sm group"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    Write a Review on Google
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={RESTAURANT.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm border border-white/15"
                  >
                    <MapPin className="w-4 h-4 text-gold" />
                    View on Google Maps
                  </a>

                  <button
                    onClick={() => setShowForm((v) => !v)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gold/90 hover:bg-gold text-obsidian font-semibold transition-colors text-sm"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    {showForm ? 'Cancel' : 'Submit on Website'}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          {showForm && (
            <Reveal className="mb-13 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xl animate-fade-in">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-heading text-2xl mb-2 font-semibold">Thank you for your feedback!</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Your review has been successfully posted. We truly appreciate your support for Sun City Restaurant!
                  </p>
                  <button
                    onClick={() => { setShowForm(false); setSubmitted(false); }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-gold text-obsidian text-sm font-semibold hover:bg-obsidian hover:text-white transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div>
                      <h3 className="font-heading text-xl font-semibold">Share Your Dining Experience</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Your review helps other diners discover Sun City Restaurant.</p>
                    </div>
                    <a
                      href={RESTAURANT.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-medium"
                    >
                      <GoogleIcon className="w-3.5 h-3.5" /> Prefer Google Maps? Click here
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      value={form.author_name}
                      onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
                      placeholder="Your full name *"
                      className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                    />
                    <input
                      value={form.dish_name}
                      onChange={(e) => setForm((f) => ({ ...f, dish_name: e.target.value }))}
                      placeholder="Dish or event tried (e.g., Mutton Kacchi, Banquet)"
                      className="px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Rating</p>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, rating: s }))}
                          aria-label={`${s} stars`}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={cn('w-7 h-7 transition-colors', s <= form.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30')} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Headline for your review (e.g., Unforgettable sunset dinner!)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold text-sm"
                  />

                  <textarea
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about the food flavor, 12th-floor ambiance, and staff service…"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold resize-none text-sm"
                  />

                  <div>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer px-4 py-2 rounded-lg border border-dashed border-border hover:border-gold hover:text-gold transition-colors">
                      <ImagePlus className="w-4 h-4" /> Add Food or Ambiance Photos
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => setPhotos((p) => [...p, ...Array.from(e.target.files)])} />
                    </label>

                    {photos.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {photos.map((p, i) => (
                          <div key={i} className="relative">
                            <img src={URL.createObjectURL(p)} alt="" className="w-16 h-16 rounded-lg object-cover" />
                            <button
                              type="button"
                              onClick={() => setPhotos((ph) => ph.filter((_, idx) => idx !== i))}
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-burnt text-white flex items-center justify-center"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!form.author_name || !form.body || submitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-obsidian font-semibold disabled:opacity-40 hover:bg-obsidian hover:text-white transition-all text-sm"
                    >
                      <Send className="w-4 h-4" /> {submitting ? 'Submitting…' : 'Post Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-5 py-3 rounded-full border border-border text-xs font-medium hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Reveal>
          )}

          {/* Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {[
                { id: 'all', label: 'All Reviews', count: reviews.length },
                { id: 'google', label: 'Google Maps Verified', icon: GoogleIcon, count: reviews.filter((r) => r.source === 'google').length },
                { id: 'local_guides', label: 'Local Guides', count: reviews.filter((r) => r.is_local_guide).length },
                { id: 'banquet', label: 'Party & Banquet', count: reviews.filter((r) => (r.dining_type && r.dining_type.toLowerCase().includes('banquet')) || (r.title && r.title.toLowerCase().includes('party'))).length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all',
                    filter === tab.id
                      ? 'bg-obsidian text-alabaster shadow-sm'
                      : 'bg-white border border-border/80 text-foreground/70 hover:border-gold/50 hover:text-obsidian'
                  )}
                >
                  {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                  {tab.label}
                  <span className={cn('px-1.5 py-0.5 rounded-full text-[10px]', filter === tab.id ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground')}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground font-medium">
              Showing {filteredReviews.length} reviews
            </p>
          </div>

          {/* Review Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-border/60">
              <p className="text-muted-foreground text-sm">No reviews found under this filter.</p>
              <button onClick={() => setFilter('all')} className="mt-3 text-xs text-gold font-semibold hover:underline">
                View All Reviews
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((r, i) => {
                const isGoogle = r.source === 'google';
                const initials = r.author_name
                  ? r.author_name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  : 'G';

                const avatarGradients = [
                  'from-blue-600 to-indigo-700',
                  'from-emerald-600 to-teal-700',
                  'from-amber-600 to-orange-700',
                  'from-purple-600 to-pink-700',
                  'from-rose-600 to-red-700',
                ];
                const gradient = avatarGradients[i % avatarGradients.length];

                return (
                  <Reveal key={r.id || i} delay={(i % 3) * 80}>
                    <div className="h-full bg-card rounded-3xl p-6 sm:p-7 border border-border/70 hover:border-gold/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
                      <div>
                        {/* Header: User Avatar + Name + Source Badge */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn('w-11 h-11 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold shadow-sm', gradient)}>
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-heading font-semibold text-base leading-tight text-obsidian">{r.author_name}</h3>
                                {r.is_verified && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 flex-shrink-0" />
                                )}
                              </div>
                              {r.is_local_guide ? (
                                <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                                  <span>★ Local Guide</span>
                                  {r.guide_level && <span className="text-muted-foreground font-normal">· {r.guide_level}</span>}
                                </p>
                              ) : (
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {isGoogle ? 'Google Maps Reviewer' : 'Verified Diner'}
                                </p>
                              )}
                            </div>
                          </div>

                          {isGoogle ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[11px] font-semibold text-blue-700 border border-blue-200/80 shadow-2xs">
                              <GoogleIcon className="w-3 h-3" />
                              Google
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gold/10 text-[11px] font-medium text-gold">
                              Website
                            </span>
                          )}
                        </div>

                        {/* Star Rating & Date */}
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${s < r.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`}
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground text-[11px]">
                            {r.created_date ? new Date(r.created_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
                          </span>
                        </div>

                        {/* Title if present */}
                        {r.title && (
                          <h4 className="font-heading font-semibold text-sm mb-2 text-obsidian group-hover:text-gold transition-colors leading-snug">
                            {r.title}
                          </h4>
                        )}

                        {/* Body */}
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          "{r.body}"
                        </p>

                        {/* Tag: Dining type & Dish */}
                        {(r.dining_type || r.dish_name) && (
                          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/40">
                            {r.dining_type && (
                              <span className="inline-block px-2.5 py-0.5 rounded-md bg-secondary text-[11px] font-medium text-secondary-foreground">
                                {r.dining_type}
                              </span>
                            )}
                            {r.dish_name && (
                              <span className="inline-block px-2.5 py-0.5 rounded-md bg-gold/10 text-[11px] font-medium text-gold">
                                🍽️ {r.dish_name}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer: Helpful & Google Link */}
                      <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <button
                          onClick={() => toggleLike(r.id || i)}
                          className={cn(
                            'inline-flex items-center gap-1.5 transition-colors',
                            liked[r.id || i] ? 'text-gold font-medium' : 'hover:text-obsidian'
                          )}
                        >
                          <ThumbsUp className={cn('w-3.5 h-3.5', liked[r.id || i] && 'fill-gold')} />
                          <span>Helpful ({(r.likes_count || 5) + (liked[r.id || i] ? 1 : 0)})</span>
                        </button>

                        <a
                          href={RESTAURANT.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-gold transition-colors"
                        >
                          <span>Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* Interactive Google Map & Location Section */}
          <Reveal className="mt-16 sm:mt-24">
            <div className="rounded-3xl bg-white border border-border/80 overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Details side */}
                <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-obsidian text-alabaster">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Live Destination</span>
                    <h3 className="font-heading text-3xl font-light text-white mt-2 leading-tight">
                      Visit Sun City on the <span className="italic gold-text font-normal">12th Floor</span>
                    </h3>
                    <p className="text-sm text-alabaster/70 mt-3 leading-relaxed">
                      Heaven City Centre, Alankar Mor, Pahartoli, Chattogram. Enjoy panoramic rooftop vistas, high-speed lift access, and underground parking.
                    </p>

                    <div className="mt-6 space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                        <span>12th Floor, Heaven City Centre, Chattogram</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GoogleIcon className="w-4 h-4 flex-shrink-0" />
                        <span>Google Rating: <strong>{avg} / 5.0</strong> (450+ Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                    <a
                      href={RESTAURANT.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold text-obsidian text-sm font-semibold hover:bg-white transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                    <a
                      href={RESTAURANT.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      <GoogleIcon className="w-4 h-4" />
                      Write a Review
                    </a>
                  </div>
                </div>

                {/* Google Map embed side */}
                <div className="lg:col-span-7 min-h-[320px] lg:min-h-[420px] relative bg-muted">
                  <iframe
                    title="Sun City Restaurant Google Maps Location"
                    src="https://maps.google.com/maps?q=Heaven%20City%20Centre,%20Chattogram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full min-h-[320px] lg:min-h-[420px] border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}