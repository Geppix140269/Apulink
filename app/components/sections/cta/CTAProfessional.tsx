// Path: /app/components/sections/cta/CTAProfessional.tsx
// Call to action section for professionals

'use client';

import Link from 'next/link';

interface CTAProfessionalProps {
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTAProfessional({ headline, description, buttonText, buttonLink }: CTAProfessionalProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#8B9A7B]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {headline}
        </h2>
        <p className="text-xl text-gray-100 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={buttonLink}
            className="inline-block bg-white hover:bg-gray-100 text-[#8B9A7B] font-semibold py-4 px-10 rounded-lg transition duration-300"
          >
            {buttonText}
          </Link>
          <Link
            href="/professionals/benefits"
            className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8B9A7B] font-semibold py-4 px-10 rounded-lg transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
