// Path: app/components/sections/hero/HeroA.tsx
// Hero section variant A with video background and new brand colors

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Globe, Users, ChevronDown } from 'lucide-react';

interface HeroAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  showStats?: boolean;
}

export default function HeroA({
  title = 'The All-in-One Platform for Managing Your Property Project in Puglia',
  subtitle = 'Certified Experts. Smart Tools. Full Control from Anywhere.',
  ctaText = 'Start Your Free Assessment',
  ctaLink = '/my-apulink',  // FIXED: Changed from '#assessment' to '/my-apulink/buyer'
  showStats = true
}: HeroAProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Array of video URLs
  const videos = [
    "https://res.cloudinary.com/dbvghnclx/video/upload/v1752960658/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_467a1d17-0990-46ea-b88e-7545ae48e598_3_mycs2i.mp4",
    "https://res.cloudinary.com/dusubfxgo/video/upload/v1753030843/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_467a1d17-0990-46ea-b88e-7545ae48e598_0_aar9z8.mp4"
  ];

  // Auto-advance to next video when current one ends
  const handleVideoEnd = () => {
    setVideoLoaded(false);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          key={currentVideoIndex}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onEnded={handleVideoEnd}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source 
            src={videos[currentVideoIndex]} 
            type="video/mp4" 
          />
        </video>
        
        {/* Fallback image while video loads */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dbvghnclx/image/upload/v1752960844/apulia-trullo-landscape_qtpwxe.jpg)'
          }}
        />
        
        {/* Optional: Video indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentVideoIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/50 to-emerald-900/60" />
      
      {/* Glass morphism overlay for content area */}
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Glass card for content */}
        <div className="glass-card-dark p-8 md:p-12 rounded-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn">
            <span className="block">{title.split(' ').slice(0, 3).join(' ')}</span>
            <span className="block text-gradient mt-2">{title.split(' ').slice(3).join(' ')}</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slideUp">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slideUp">
            <Link 
              href={ctaLink}
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/professional/register"
              className="btn-glass inline-flex items-center justify-center gap-2 text-lg text-white hover:bg-white/20"
            >
              I&apos;m a Professional
              <Shield className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Stats */}
          {showStats && (
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-white animate-fadeIn">
              <div className="glass-card-dark px-6 py-3 rounded-full flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Verified Professionals</span>
              </div>
              <div className="glass-card-dark px-6 py-3 rounded-full flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">7+ Languages</span>
              </div>
              <div className="glass-card-dark px-6 py-3 rounded-full flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">500+ Happy Buyers</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
}
