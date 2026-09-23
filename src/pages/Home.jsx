import React from 'react';
import Hero from '@/components/home/Hero';
import AboutPreview from '@/components/home/AboutPreview';
import SignatureDishes from '@/components/home/SignatureDishes';
import PartyMenus from '@/components/home/PartyMenus';
import GalleryPreview from '@/components/home/GalleryPreview';
import ReviewsPreview from '@/components/home/ReviewsPreview';
import ReservationCTA from '@/components/home/ReservationCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SignatureDishes />
      <PartyMenus />
      <GalleryPreview />
      <ReviewsPreview />
      <ReservationCTA />
    </>
  );
}