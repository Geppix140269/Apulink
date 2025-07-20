// Path: app/page.tsx
// Main homepage using the modular section system

import ModularHomepage from '@/components/home/ModularHomepage';
import { defaultHomepageConfig } from '@/types/sections';

export default function HomePage() {
  // In production, we could:
  // 1. Detect user type from cookies/session
  // 2. Get campaign from URL params
  // 3. Load custom config from database
  // 4. Run A/B tests

  return (
    <ModularHomepage 
      config={defaultHomepageConfig}
      userType="unknown"
    />
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Apulink - Professional Project Management for Italian Property Investment',
  description: 'Connect with verified Italian property professionals and manage your investment project from search to keys. Secure document storage, budget tracking, and team collaboration.',
  keywords: 'Italian property, property investment Italy, Italian real estate professionals, property project management',
};
