// PATH: app/components/home/Hero.tsx
import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-terracotta via-sea to-olive animate-gradient-shift text-white overflow-hidden">
      {/* Optional shimmer layer */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 20%, white, transparent 60%)',
          animation: 'shimmer 20s linear infinite',
        }}
      />

      <div className="container mx-auto px-6 py-32 relative z-10 text-center">
        <div className="inline-block bg-white/10 px-6 py-2 rounded-full text-sm font-semibold tracking-wide backdrop-blur-md glass mb-6">
          Introducing SurvEYES™ by Apulink
        </div>

        <h1 className="text-5xl md:text-6xl font-playfair font-light leading-tight text-balance">
          Your <strong className="font-bold">Eyes</strong> on the Ground in <strong className="font-bold">Puglia</strong>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/90 font-opensans max-w-2xl mx-auto">
          Get expert surveys, legal reviews, and renovation estimates — without stepping on a plane.
        </p>

        <div className="mt-10">
          <Link href="/survey/request">
            <span className="btn-premium ripple">Request a Survey</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
