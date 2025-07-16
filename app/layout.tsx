// PATH: app/layout.tsx
import TrulloChatbot from '@/components/TrulloChatbot'
import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./global.css";
import { LanguageProvider } from './providers/language-provider';
import { LanguageSelector } from './components/language-selector';

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Apulink | Your Bridge to Puglia Property Investment",
  description: "Connecting foreign investors with trusted local professionals for seamless property purchases in Puglia, Italy.",
};

function Navigation() {
  return (
    <nav className="hidden md:flex space-x-6">
      <a href="/how-it-works" className="text-stone-600 hover:text-terracotta transition-colors font-medium">
        How it Works
      </a>
      <a href="/about" className="text-stone-600 hover:text-terracotta transition-colors font-medium">
        About
      </a>
      <a href="/contact" className="text-stone-600 hover:text-terracotta transition-colors font-medium">
        Contact
      </a>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className={`${openSans.className} antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen bg-stone-50">
            {/* Professional header with Apulink branding */}
            <header className="bg-white shadow-sm border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                  <div className="flex items-center space-x-8">
                    {/* Apulink Logo */}
                    <a href="/" className="flex items-center space-x-3">
                      <div className="relative w-12 h-12">
                        {/* Simplified logo representation - you'll want to add the actual SVG */}
                        <div className="absolute inset-0 bg-terracotta rounded-full opacity-80"></div>
                        <div className="absolute inset-2 bg-stone-400 rounded-full opacity-80"></div>
                        <div className="absolute inset-4 bg-sea rounded-full opacity-80"></div>
                      </div>
                      <span className="font-playfair text-2xl text-terracotta font-bold">
                        Apulink
                      </span>
                    </a>
                    
                    <Navigation />
                  </div>
                  
                  {/* Right side - Language selector & Login */}
                  <div className="flex items-center space-x-4">
                    <LanguageSelector />
                    
                    {/* Login Button */}
                    <button className="bg-terracotta text-white px-6 py-2 rounded-lg font-medium hover:bg-terracotta-dark transition-all duration-200">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main>
              {children}
            </main>
            
            {/* Professional Footer */}
            <footer className="bg-stone-800 text-stone-300 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-playfair text-2xl text-terracotta mb-4">Apulink</h3>
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
        </LanguageProvider>
        <TrulloChatbot />
      </body>
    </html>
  );
}
