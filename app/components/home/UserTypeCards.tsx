/* PATH: app/components/home/UserTypeCards.tsx */
import React from 'react';
import Link from 'next/link';
import { Briefcase, Ruler } from 'lucide-react';

const UserTypeCards = () => {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-playfair font-semibold mb-12 text-stone-800">
          <span className="gradient-text">Choose</span> your role
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Buyer Card */}
          <div className="card-modern slide-up text-center">
            <div className="flex justify-center mb-4">
              <Briefcase className="text-terracotta text-5xl animate-float" />
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2 text-stone-900">I Need a Survey</h3>
            <p className="mb-4 text-stone-600">
              Get quotes from verified surveyors for your property in Puglia.
            </p>
            <ul className="text-left text-sm text-stone-700 space-y-2 mb-6">
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Compare multiple quotes</li>
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Secure messaging</li>
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Protected payment</li>
            </ul>
            <Link href="/buyer" className="btn-premium inline-block">Get Started</Link>
          </div>

          {/* Surveyor Card */}
          <div className="card-modern slide-up text-center animation-delay-200">
            <div className="flex justify-center mb-4">
              <Ruler className="text-sea text-5xl animate-float-delayed" />
            </div>
            <h3 className="text-xl font-playfair font-semibold mb-2 text-stone-900">I&apos;m a Surveyor</h3>
            <p className="mb-4 text-stone-600">
              Join our network and receive project requests from buyers.
            </p>
            <ul className="text-left text-sm text-stone-700 space-y-2 mb-6">
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Free registration</li>
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Work with international buyers</li>
              <li className="pl-6 relative"><span className="absolute left-0 text-green-500">✓</span> Guaranteed payment</li>
            </ul>
            <Link href="/surveyor/register" className="btn-premium inline-block">Get Started</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypeCards;
