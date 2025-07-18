import TrulloChatbot from '@/components/TrulloChatbot'
import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./global.css";
import { LanguageProvider } from './providers/language-provider';

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

// Import the ClientLayout component
import ClientLayout from './components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className={`${openSans.className} antialiased`}>
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <TrulloChatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
