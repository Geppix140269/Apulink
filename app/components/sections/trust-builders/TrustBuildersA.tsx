// Path: /app/components/sections/trust-builders/TrustBuildersA.tsx
// Trust builders section variant A - Stats and testimonials

'use client';

import { TrustBuildersProps } from '@/types/sections';

export default function TrustBuildersA({ title, testimonials, stats }: TrustBuildersProps) {
  // Placeholder testimonials if none provided
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'Sarah Mitchell',
      location: 'UK',
      quote: 'Apulink made our dream of owning a home in Puglia a reality. The platform connected us with amazing professionals who guided us through every step.',
      rating: 5
    },
    {
      id: '2',
      name: 'Klaus Weber',
      location: 'Germany',
      quote: 'The document management system is fantastic. Having all our property papers in one secure place gives us peace of mind.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#D4A574] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C3E50]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#F5F2ED] rounded-xl p-8"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-[#2C3E50]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
