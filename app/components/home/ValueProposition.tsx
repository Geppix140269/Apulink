// PATH: app/components/home/ValueProposition.tsx
import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const ValueProposition = () => {
  const problems = [
    {
      title: 'Overcharged by 30-50%',
      description: 'Foreign buyers pay "tourist prices" without knowing local rates'
    },
    {
      title: '€5,000+ in Hidden Fees',
      description: 'Unexpected taxes, permits, and bureaucratic costs add up fast'
    },
    {
      title: 'Language & Legal Barriers',
      description: 'Complex Italian property law + language gaps = expensive mistakes'
    },
    {
      title: 'Finding Trustworthy Pros',
      description: 'No way to verify if that "recommended" lawyer is actually good'
    }
  ];

  const solutions = [
    {
      title: 'Transparent, Competitive Pricing',
      description: 'Multiple quotes from vetted professionals - save 20-30%'
    },
    {
      title: 'All Costs Upfront',
      description: 'No surprises - know every fee before you commit'
    },
    {
      title: 'English-Speaking Experts',
      description: 'All professionals verified for international client experience'
    },
    {
      title: 'Reviews You Can Trust',
      description: 'Real reviews from verified international buyers like you'
    }
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-stone-800 mb-4">
              Why 73% of Foreign Buyers 
              <span className="text-terracotta"> Overpay</span> in Italy
            </h2>
            <p className="text-xl text-stone-600">
              ...and how Apulink members save an average of €8,500 per property
            </p>
          </div>

          {/* Problem/Solution Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Problems Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-semibold text-stone-800">Without Apulink</h3>
              </div>
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="bg-red-50 rounded-lg p-6 border border-red-100">
                    <h4 className="font-semibold text-stone-800 mb-2">{problem.title}</h4>
                    <p className="text-stone-600">{problem.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-semibold text-stone-800">With Apulink</h3>
              </div>
              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-6 border border-green-100">
                    <h4 className="font-semibold text-stone-800 mb-2">{solution.title}</h4>
                    <p className="text-stone-600">{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-stone-700 mb-6">
              Don't leave €8,500 on the table. Get your free guide and €100 credit now.
            </p>
            <a 
              href="#get-guide" 
              className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-lg font-semibold hover:bg-terracotta-dark transition-all duration-200"
            >
              Claim Your Free Guide
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
