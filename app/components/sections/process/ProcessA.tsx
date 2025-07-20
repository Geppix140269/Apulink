// Path: /app/components/sections/process/ProcessA.tsx
// Process section variant A - Step-by-step layout

'use client';

import { ProcessProps } from '@/types/sections';

export default function ProcessA({ title, subtitle, steps }: ProcessProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-[#D4A574]" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="bg-[#8B9A7B] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
