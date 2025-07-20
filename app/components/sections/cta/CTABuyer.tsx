// Path: /app/components/sections/cta/CTABuyer.tsx
// Call to action section for buyers

'use client';

import Link from 'next/link';
import { CTAProps } from '@/types/sections';

export default function CTABuyer({ headline, description, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2C3E50]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {headline}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="inline-block bg-[#D4A574] hover:bg-[#C19660] text-white font-semibold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
