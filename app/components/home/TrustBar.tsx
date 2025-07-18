// PATH: app/components/home/TrustBar.tsx
import React from 'react';

const TrustBar = () => {
  const stats = [
    { value: '€12M+', label: 'Property Value Reviewed' },
    { value: '2,847', label: 'Active Members' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '24hrs', label: 'Avg. Response Time' }
  ];

  return (
    <section className="bg-white py-8 border-b border-stone-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-stone-800">{stat.value}</div>
              <div className="text-sm text-stone-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
