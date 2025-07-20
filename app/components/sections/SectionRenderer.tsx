// Path: app/components/sections/SectionRenderer.tsx
// This component dynamically renders homepage sections based on configuration

'use client';

import dynamic from 'next/dynamic';
import { SectionConfig } from '@/types/sections';

// Dynamically import section components to enable code splitting
// Currently only 'A' variants exist
const sectionComponents = {
  hero: {
    A: dynamic(() => import('./hero/HeroA'), { ssr: true }),
  },
  'value-proposition': {
    A: dynamic(() => import('./value-proposition/ValuePropositionA'), { ssr: true }),
  },
  'professional-showcase': {
    A: dynamic(() => import('./professional-showcase/ProfessionalShowcaseA'), { ssr: true }),
  },
  'trust-builders': {
    A: dynamic(() => import('./trust-builders/TrustBuildersA'), { ssr: true }),
  },
  cta: {
    // Note: Based on sprint log, we have CTABuyer and CTAProfessional
    Buyer: dynamic(() => import('./cta/CTABuyer'), { ssr: true }),
    Professional: dynamic(() => import('./cta/CTAProfessional'), { ssr: true }),
  },
  process: {
    A: dynamic(() => import('./process/ProcessA'), { ssr: true }),
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
