// PATH: app/layout.tsx
import TrulloChatbot from '@/components/TrulloChatbot'
import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./global.css";
import { LanguageProvider } from './providers/language-provider';
import { LanguageSelector } from './components/language-selector';
import Image from 'next/image';

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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a href="/how-it-works" className="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors relative">
        How it Works
      </a>
      <a href="/about" className="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors relative">
        About
      </a>
      <a href="/contact" className="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors relative">
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
            {/* Modern header with enhanced styling */}
            <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 fixed w-full top-0 z-50">
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
                        className="h-14 md:h-16 lg:h-20 w-auto transition-transform duration-200 group-hover:scale-105"
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
                    
                    {/* Modern Login Button */}
                    <button className="btn-hero-primary">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content without padding since hero handles its own spacing */}
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
        </LanguageProvider>
        <TrulloChatbot />
      </body>
    </html>
  );
}
