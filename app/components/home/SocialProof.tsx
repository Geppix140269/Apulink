// PATH: app/components/home/SocialProof.tsx
import React from 'react';
import { Quote, Star } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Emma Thompson',
      location: 'London, UK',
      property: 'Trullo in Alberobello',
      saved: '€12,000',
      image: 'https://i.pravatar.cc/150?img=49',
      quote: 'The guide revealed issues with the property cadastral registration that would have cost me thousands. My surveyor (found through Apulink) caught it immediately.',
      rating: 5
    },
    {
      name: 'Michael & Susan Davis',
      location: 'California, USA',
      property: 'Masseria near Ostuni',
      saved: '€23,000',
      image: 'https://i.pravatar.cc/150?img=54',
      quote: 'We were about to pay tourist prices until we read the negotiation chapter. The scripts worked perfectly - the seller dropped the price by 22%!',
      rating: 5
    },
    {
      name: 'Klaus Mueller',
      location: 'Munich, Germany',
      property: 'Apartment in Lecce',
      saved: '€8,500',
      image: 'https://i.pravatar.cc/150?img=52',
      quote: 'The tax optimization section alone saved me €3,500/year. Plus, the recommended accountant speaks perfect German!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-stone-800 mb-4">
              2,847 Buyers Saved €8M+ Using Our Guide
            </h2>
            <p className="text-xl text-stone-600">
              Real stories from buyers who avoided costly mistakes
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-stone-200" />
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-800">{testimonial.name}</h4>
                    <p className="text-sm text-stone-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-stone-700 mb-4 italic">"{testimonial.quote}"</p>

                {/* Results */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Property:</span>
                    <span className="font-medium text-stone-800">{testimonial.property}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-stone-600">Saved:</span>
                    <span className="font-bold text-green-600">{testimonial.saved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-800">€8,500</div>
              <div className="text-sm text-stone-600">Average Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-800">4.9/5</div>
              <div className="text-sm text-stone-600">Guide Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-800">92%</div>
              <div className="text-sm text-stone-600">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-800">24hrs</div>
              <div className="text-sm text-stone-600">To First Quote</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
