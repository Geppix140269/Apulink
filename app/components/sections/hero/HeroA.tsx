// Path: /app/components/sections/hero/HeroA.tsx
// Hero section variant A - Trust-focused with video background

'use client';

import Link from 'next/link';
import { HeroProps } from '@/types/sections';

export default function HeroA({ headline, subheadline, ctaText, ctaLink, videoUrl }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          {headline}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaLink}
            className="inline-block bg-[#D4A574] hover:bg-[#C19660] text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            {ctaText}
          </Link>
          <Link
            href="/how-it-works"
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
