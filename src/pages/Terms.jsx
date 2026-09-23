import React from 'react';
import PageHeader from '@/components/PageHeader';
import { RESTAURANT } from '@/lib/restaurant';

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of" titleAccent="Service" />
      <article className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 space-y-5 text-foreground/80 leading-relaxed">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          <p>These terms govern your use of the {RESTAURANT.name} website and services. By using our site, you agree to these terms.</p>
          <h2 className="font-heading text-2xl text-obsidian">Reservations</h2>
          <p>Reservations are subject to availability and confirmation by our team. We reserve the right to cancel or modify reservations when necessary. Please inform us at least 4 hours in advance for cancellations or rescheduling.</p>
          <h2 className="font-heading text-2xl text-obsidian">Orders & Payment</h2>
          <p>Orders placed via WhatsApp are confirmed directly with our team. Prices are listed in BDT (৳) and may include applicable taxes. We reserve the right to refuse orders in cases of suspected fraud or abuse.</p>
          <h2 className="font-heading text-2xl text-obsidian">Reviews</h2>
          <p>Reviews submitted by guests are moderated before publication. We reserve the right to remove content that is offensive, misleading, or violates our guidelines.</p>
          <h2 className="font-heading text-2xl text-obsidian">Liability</h2>
          <p>We strive for accuracy in menu descriptions and pricing but reserve the right to change items and prices without notice. We are not liable for allergic reactions — please inform us of any dietary restrictions.</p>
          <h2 className="font-heading text-2xl text-obsidian">Contact</h2>
          <p>Questions about these terms? Contact us at {RESTAURANT.email} or {RESTAURANT.phone}.</p>
        </div>
      </article>
    </>
  );
}