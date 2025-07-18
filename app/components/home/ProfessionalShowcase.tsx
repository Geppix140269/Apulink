// PATH: app/components/home/ProfessionalShowcase.tsx
import React from 'react';
import { Star, Award, Clock, MessageCircle, ArrowRight } from 'lucide-react';

const ProfessionalShowcase = () => {
  const professionals = [
    {
      name: 'Marco Benedetti',
      title: 'Chartered Surveyor',
      location: 'Bari',
      rating: 4.9,
      reviews: 47,
      responseTime: '2 hours',
      expertise: ['Trulli Specialist', 'English Speaking'],
      recentWork: 'Just helped Emma from London save €8,000 on renovation quotes',
      image: 'https://i.pravatar.cc/150?img=11'
    },
    {
      name: 'Dr. Giulia Romano',
      title: 'Property Lawyer',
      location: 'Lecce',
      rating: 5.0,
      reviews: 62,
      responseTime: '1 hour',
      expertise: ['International Buyers', 'Tax Expert'],
      recentWork: 'Resolved complex inheritance issue for US client in 3 weeks',
      image: 'https://i.pravatar.cc/150?img=32'
    },
    {
      name: 'Alessandro Greco',
      title: 'Architect',
      location: 'Ostuni',
      rating: 4.8,
      reviews: 38,
      responseTime: '4 hours',
      expertise: ['Historic Restoration', 'Masseria Expert'],
      recentWork: 'Completed stunning trullo renovation under budget',
      image: 'https://i.pravatar.cc/150?img=33'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>All Professionals Verified & Insured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-stone-800 mb-4">
              Meet Your Future Property Team
            </h2>
            <p className="text-xl text-stone-600">
              50+ vetted professionals ready to help. Average response time: 3 hours.
            </p>
          </div>

          {/* Professional Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {professionals.map((pro, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={pro.image} 
                    alt={pro.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800">{pro.name}</h3>
                    <p className="text-sm text-stone-600">{pro.title} • {pro.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{pro.rating}</span>
                      </div>
                      <span className="text-sm text-stone-500">({pro.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pro.expertise.map((tag, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Recent Work */}
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800 italic">"{pro.recentWork}"</p>
                </div>

                {/* Response Time */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock className="w-4 h-4" />
                    <span>Responds in {pro.responseTime}</span>
                  </div>
                  <button className="text-terracotta hover:text-terracotta-dark font-medium">
                    View Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-stone-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-stone-800 mb-4">
              Ready to Connect with Trusted Professionals?
            </h3>
            <p className="text-stone-600 mb-6">
              Get your free guide first, then use your €100 credit to start getting quotes
            </p>
            <a 
              href="#get-guide" 
              className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-lg font-semibold hover:bg-terracotta-dark transition-all duration-200"
            >
              Get Guide + Browse All Professionals
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalShowcase;
