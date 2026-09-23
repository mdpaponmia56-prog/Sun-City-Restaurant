import React from 'react';
import PageHeader from '@/components/PageHeader';
import { RESTAURANT } from '@/lib/restaurant';

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy" titleAccent="Policy" />
      <article className="py-13 lg:py-21 bg-alabaster">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 prose prose-sm space-y-5 text-foreground/80 leading-relaxed">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          <p>At {RESTAURANT.name}, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
          <h2 className="font-heading text-2xl text-obsidian">Information We Collect</h2>
          <p>We collect information you provide directly — such as your name, phone number, email, and reservation details — when you book a table, place an order, or submit a review. We also collect basic analytics data to improve our service.</p>
          <h2 className="font-heading text-2xl text-obsidian">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process reservations and orders</li>
            <li>To send confirmation and reminder communications</li>
            <li>To respond to your inquiries and feedback</li>
            <li>To improve our menu, service, and website experience</li>
          </ul>
          <h2 className="font-heading text-2xl text-obsidian">Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data. Your information is never sold to third parties.</p>
          <h2 className="font-heading text-2xl text-obsidian">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at {RESTAURANT.email}.</p>
          <h2 className="font-heading text-2xl text-obsidian">Contact</h2>
          <p>For privacy questions, reach us at {RESTAURANT.email} or {RESTAURANT.phone}.</p>
        </div>
      </article>
    </>
  );
}