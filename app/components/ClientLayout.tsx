'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LanguageSelector } from './language-selector';

function Navigation({ mobile = false, closeMobileMenu }: { mobile?: boolean; closeMobileMenu?: () => void }) {
  const navLinks = [
    { href: "/how-it-works", label: "How it Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4 p-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/login"
          className="btn-hero-primary w-full text-center mt-4"
          onClick={closeMobileMenu}
        >
          Login
        </a>
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
    </nav>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Modern header with scroll effect */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              {/* Enhanced Apulink Logo */}
              <a href="/" className="flex items-center group">
                <Image 
                  src="/APULINK_LOGO-TRASPARENT.png" 
                  alt="Apulink - Your Bridge to Puglia Property Investment" 
                  width={180} 
                  height={72}
                  className={`transition-all duration-300 ${
                    isScrolled 
                      ? 'h-12 md:h-14 lg:h-16' 
                      : 'h-14 md:h-16 lg:h-20'
                  } w-auto group-hover:scale-105`}
                  priority
                />
              </a>
              
              <Navigation />
            </div>
            
            {/* Right side - Enhanced Language selector & Login */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Language Selector */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-md border border-gray-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <LanguageSelector />
              </div>
              
              {/* Modern Login Button - Desktop */}
              <button className="btn-hero-primary hidden md:inline-flex">
                Login
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Image 
            src="/APULINK_LOGO-TRASPARENT.png" 
            alt="Apulink" 
            width={120} 
            height={48}
            className="h-10 w-auto"
          />
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close mobile menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <Navigation mobile closeMobileMenu={closeMobileMenu} />

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>Language: English</span>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      {/* Main content */}
      <main>
        {children}
      </main>
      
      {/* Professional Footer */}
      <footer className="bg-stone-800 text-stone-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image 
                  src="/APULINK_LOGO-TRASPARENT.png" 
                  alt="Apulink" 
                  width={120} 
                  height={48}
                  className="h-10 w-auto brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-sm">
                Your trusted bridge to property investment in Puglia. Connecting worlds, building futures.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors text-sm">How it Works</a></li>
                <li><a href="/professional" className="hover:text-white transition-colors text-sm">For Professionals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p className="text-sm">
              © 2024 Apulink. All rights reserved. | Connecting Puglia to the World
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
