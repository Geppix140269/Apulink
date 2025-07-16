""/* PATH: app/components/home/WhyUseApulink.tsx */
import React from 'react';
import { ShieldCheck, Leaf, Globe, Search, Smile, UserCheck } from 'lucide-react';

const reasons = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-terracotta" />,
    title: 'Verified Surveyors',
    text: 'We only work with licensed and experienced professionals across Puglia.',
  },
  {
    icon: <Search className="w-6 h-6 text-terracotta" />,
    title: 'Real Property Insight',
    text: 'Our reports are designed to highlight legal, structural, and market red flags.',
  },
  {
    icon: <UserCheck className="w-6 h-6 text-terracotta" />,
    title: 'Tailored to Foreign Buyers',
    text: 'Our platform is made for international buyers exploring Italy remotely.',
  },
  {
    icon: <Smile className="w-6 h-6 text-terracotta" />,
    title: 'Friendly, Human Support',
    text: 'We guide you every step of the way with personalized support in English.',
  },
  {
    icon: <Globe className="w-6 h-6 text-terracotta" />,
    title: 'Digital & Paperless',
    text: 'No printing, no meetings, no waiting. Everything you need is online.',
  },
  {
    icon: <Leaf className="w-6 h-6 text-terracotta" />,
    title: 'Less Travel, Less Pollution',
    text: 'Decide if a property is worth the trip before booking flights.',
  },
];

const WhyUseApulink = () => {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-playfair font-semibold mb-12 text-stone-800">
          Why <span className="gradient-text">Use Apulink</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="card-modern slide-up animation-delay-100 flex items-start gap-4"
            >
              <div>{reason.icon}</div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">{reason.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{reason.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseApulink;
