// Path: app/components/sections/SectionRenderer.tsx
// This component dynamically renders homepage sections based on configuration

'use client';

import dynamic from 'next/dynamic';
import { SectionConfig } from '@/types/sections';

// Dynamically import section components to enable code splitting
const sectionComponents = {
  hero: {
    A: dynamic(() => import('./hero/HeroA'), { ssr: true }),
    B: dynamic(() => import('./hero/HeroB'), { ssr: true }),
    C: dynamic(() => import('./hero/HeroC'), { ssr: true }),
  },
  'value-proposition': {
    A: dynamic(() => import('./value-proposition/ValuePropositionA'), { ssr: true }),
    B: dynamic(() => import('./value-proposition/ValuePropositionB'), { ssr: true }),
    C: dynamic(() => import('./value-proposition/ValuePropositionC'), { ssr: true }),
  },
  'professional-showcase': {
    A: dynamic(() => import('./professional-showcase/ProfessionalShowcaseA'), { ssr: true }),
    B: dynamic(() => import('./professional-showcase/ProfessionalShowcaseB'), { ssr: true }),
    C: dynamic(() => import('./professional-showcase/ProfessionalShowcaseC'), { ssr: true }),
  },
  'trust-builders': {
    A: dynamic(() => import('./trust-builders/TrustBuildersA'), { ssr: true }),
    B: dynamic(() => import('./trust-builders/TrustBuildersB'), { ssr: true }),
    C: dynamic(() => import('./trust-builders/TrustBuildersC'), { ssr: true }),
  },
  cta: {
    A: dynamic(() => import('./cta/CTAA'), { ssr: true }),
    B: dynamic(() => import('./cta/CTAB'), { ssr: true }),
    C: dynamic(() => import('./cta/CTAC'), { ssr: true }),
  },
  process: {
    A: dynamic(() => import('./process/ProcessA'), { ssr: true }),
    B: dynamic(() => import('./process/ProcessB'), { ssr: true }),
    C: dynamic(() => import('./process/ProcessC'), { ssr: true }),
  },
  benefits: {
    A: dynamic(() => import('./benefits/BenefitsA'), { ssr: true }),
    B: dynamic(() => import('./benefits/BenefitsB'), { ssr: true }),
    C: dynamic(() => import('./benefits/BenefitsC'), { ssr: true }),
  },
};

interface SectionRendererProps {
  section: SectionConfig;
  index: number;
}

export default function SectionRenderer({ section, index }: SectionRendererProps) {
  // Skip inactive sections
  if (!section.isActive) return null;

  // Get the appropriate component based on type and variant
  const SectionComponent = sectionComponents[section.type]?.[section.variant];

  if (!SectionComponent) {
    console.warn(`No component found for section type: ${section.type}, variant: ${section.variant}`);
    return null;
  }

  // Determine if we should use mobile-specific props
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const props = isMobile && section.mobileProps ? section.mobileProps : section.props;

  return (
    <section
      id={section.id}
      className={`section-${section.type} section-order-${section.order}`}
      data-section-type={section.type}
      data-section-variant={section.variant}
    >
      <SectionComponent {...props} sectionIndex={index} />
    </section>
  );
}
