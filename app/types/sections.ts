// Path: app/components/sections/SectionRenderer.tsx
// This component dynamically renders homepage sections based on configuration

'use client';

import dynamic from 'next/dynamic';
import { SectionConfig } from '@/types/sections';

// Dynamically import section components to enable code splitting
// Map the type names from sections.ts to the actual component folders
const sectionComponents = {
  hero: {
    A: dynamic(() => import('./hero/HeroA'), { ssr: true }),
  },
  'value-prop': {
    A: dynamic(() => import('./value-proposition/ValuePropositionA'), { ssr: true }),
  },
  showcase: {
    A: dynamic(() => import('./professional-showcase/ProfessionalShowcaseA'), { ssr: true }),
  },
  trust: {
    A: dynamic(() => import('./trust-builders/TrustBuildersA'), { ssr: true }),
  },
  cta: {
    // Note: CTA sections use different component names
    A: dynamic(() => import('./cta/CTABuyer'), { ssr: true }),
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
  // Skip disabled sections (default to enabled if not specified)
  if (section.isEnabled === false) return null;

  // Special handling for CTA sections based on props.type
  let componentKey = section.variant;
  if (section.type === 'cta' && section.props.type === 'professional') {
    // Load CTAProfessional for professional CTAs
    const CTAProfessional = dynamic(() => import('./cta/CTAProfessional'), { ssr: true });
    return (
      <section
        id={section.type + '-' + section.props.type}
        className={`section-${section.type} section-order-${index}`}
        data-section-type={section.type}
        data-section-variant={section.variant}
      >
        <CTAProfessional {...section.props} sectionIndex={index} />
      </section>
    );
  }

  // Get the appropriate component based on type and variant
  const SectionComponent = sectionComponents[section.type]?.[componentKey];

  if (!SectionComponent) {
    console.warn(`No component found for section type: ${section.type}, variant: ${section.variant}`);
    return null;
  }

  // Determine if we should use mobile-specific props
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const props = section.props;

  return (
    <section
      id={section.type}
      className={`section-${section.type} section-order-${index}`}
      data-section-type={section.type}
      data-section-variant={section.variant}
    >
      <SectionComponent {...props} sectionIndex={index} />
    </section>
  );
}
