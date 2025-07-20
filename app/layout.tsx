// PATH: app/layout.tsx
// Root layout with AuthProvider and navigation - UPDATED WITH BRAND FONTS

import TrulloChatbot from '../components/TrulloChatbot'
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./global.css";
import { LanguageProvider } from './providers/language-provider';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageSelector } from './components/language-selector';
import Image from 'next/image';
import { Toaster } from "react-hot-toast";

// Brand Primary Font - Inter (replacing Open Sans)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Brand Display Font - Playfair Display (keeping as is)
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apulink - Professional Project Management for Italian Property Investment",
  description: "Connect with verified Italian property professionals and manage your investment project from search to keys. Secure document storage, budget tracking, and team collaboration.",
  keywords: "Italian property, property investment Italy, real estate project management, Italian property professionals",
  authors: [{ name: "Apulink" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#9333ea",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Apulink - Your Trusted Partner for Italian Property Investment",
    description: "Professional project management platform for international property buyers in Italy",
    type: "website",
    locale: "en_US",
    alternateLocale: ["it_IT"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apulink - Italian Property Investment Platform",
    description: "Connect with professionals and manage your Italian property project",
  },
};

function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a href="/how-it-works" className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 group">
        How it Works
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="/about" className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 group">
        About
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
      </a>
      <a href="/contact" className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 group">
        Contact
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Add JetBrains Mono for code/monospace elements */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-primary antialiased">
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-gray-50">
              {/* Modern Fixed Header - Updated with glass effect */}
              <header className="fixed w-full top-0 z-50 glass-card border-b border-white/20">
                <div className="container mx-auto px-6">
                  <div className="flex justify-between items-center h-20 md:h-24">
                    {/* Logo - Much Larger */}
                    <a href="/" className="flex items-center group">
                      <Image 
                        src="/APULINK_LOGO-TRASPARENT.png"
                        alt="Apulink"
                        width={200}
                        height={100}
                        className="h-14 md:h-16 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </a>

                    {/* Navigation - Desktop */}
                    <Navigation />

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                      {/* Language Selector - Updated with glass effect */}
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/90 transition-all cursor-pointer">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <LanguageSelector />
                      </div>

                      {/* Login Button - Updated with brand gradient */}
                      <a 
                        href="/login" 
                        className="btn-primary hidden md:inline-flex items-center"
                      >
                        <span className="font-semibold">Login</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>

                      {/* Mobile Menu Button */}
                      <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Spacer for fixed header */}
              <div className="h-20 md:h-24"></div>

              {/* Main content */}
              <main className="relative">{children}</main>

              {/* Footer - Updated with brand colors */}
              <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 mt-20">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-4">Apulink</h3>
                      <p className="text-gray-300 mb-4">
                        Your trusted partner for property investment in Italy.
                      </p>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-4">Services</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Search</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Professional Network</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Legal Support</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Guide</a></li>
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Property Guide</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Reports</a></li>
                      </ul>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-4">Contact</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          info@apulink.com
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          +39 080 123 4567
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Italy
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                      © 2025 Apulink. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                  </div>
                </div>
              </footer>

              {/* Trullo Chatbot */}
              <TrulloChatbot />
            </div>

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "white",
                  color: "#111827",
                  borderRadius: "1rem",
                  padding: "1rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#059669",
                    secondary: "white",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "white",
                  },
                },
              }}
            />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
