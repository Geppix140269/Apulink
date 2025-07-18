// PATH: app/components/home/FinalCTA.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Clock, Users, Gift, ArrowRight, AlertCircle } from 'lucide-react';

const FinalCTA = () => {
  const [email, setEmail] = useState('');
  const [spotsRemaining, setSpotsRemaining] = useState(67);
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-terracotta-dark text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Urgency Banner */}
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8 animate-pulse">
            <div className="flex items-center justify-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <p className="text-lg font-semibold">
                ⚠️ Warning: €100 credit expires when timer hits zero
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Last Chance to Save €8,500+ on Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-terracotta-light">
                Puglia Property Purchase
              </span>
            </h2>
            
            <p className="text-xl text-stone-200 mb-8 max-w-3xl mx-auto">
              Don't make the same expensive mistakes as 73% of foreign buyers. 
              Get your free guide and €100 professional credit before it's too late.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-sm text-stone-300">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-sm text-stone-300">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                  <div className="text-4xl font-bold text-red-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-sm text-stone-300">Seconds</div>
                </div>
              </div>
            </div>

            {/* Scarcity Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-terracotta" />
                <span>Only {spotsRemaining} credits remaining</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-terracotta" />
                <span>427 people viewing this page</span>
              </div>
            </div>
          </div>

          {/* Final Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Yes! I Want to Save Thousands on My Property Purchase
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your best email address"
                className="w-full px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-terracotta focus:bg-white/20 transition-all text-lg"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-terracotta to-terracotta-dark text-white py-5 rounded-lg font-bold text-lg hover:from-terracotta-dark hover:to-terracotta transition-all duration-200 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Gift className="w-6 h-6" />
                Send Me The Guide + €100 Credit Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>

            {/* Final Trust Elements */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-300">
                <span>✓ Instant delivery</span>
                <span>✓ No credit card required</span>
                <span>✓ 2,847 happy members</span>
              </div>
            </div>
          </div>

          {/* Bottom Warning */}
          <div className="text-center mt-12">
            <p className="text-stone-400 mb-2">
              After the timer expires, the guide will still be available but without the €100 credit.
            </p>
            <p className="text-lg text-terracotta">
              Don't wait - every hour of delay could cost you thousands in mistakes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
