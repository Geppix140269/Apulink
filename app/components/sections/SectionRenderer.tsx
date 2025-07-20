// Path: app/components/sections/SectionRenderer.tsx
// This component dynamically renders homepage sections based on configuration

'use client';

import dynamic from 'next/dynamic';
import { SectionConfig, SectionType, SectionVariant } from '@/types/sections';
import { ComponentType } from 'react';

// Define the structure for section components with explicit typing
type SectionComponentMap = {
  [K in SectionType]: {
    [V in SectionVariant]?: ComponentType<any>;
  };
};

// Dynamically import section components to enable code splitting
// Map the type names from sections.ts to the actual component folders
const sectionComponents: SectionComponentMap = {
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
  if (section.type === 'cta' && section.props.type === 'professional') {
    const CTAProfessional = dynamic(() => import('./cta/CTAProfessional'), { ssr: true });
    return (
      <section
        id={`${section.type}-professional`}
        className={`section-${section.type} section-order-${index}`}
        data-section-type={section.type}
        data-section-variant={section.variant}
      >
        <CTAProfessional 
          title={section.props.headline}
          subtitle={section.props.description}
          ctaText={section.props.buttonText}
          ctaLink={section.props.buttonLink}
        />
      </section>
    );
  }

  // Get the appropriate component based on type and variant
  const componentMap = sectionComponents[section.type];
  const SectionComponent = componentMap ? componentMap[section.variant] : undefined;

  if (!SectionComponent) {
    console.warn(`No component found for section type: ${section.type}, variant: ${section.variant}`);
    return null;
  }

  return (
    <section
      id={section.type}
      className={`section-${section.type} section-order-${index}`}
      data-section-type={section.type}
      data-section-variant={section.variant}
    >
      <SectionComponent {...section.props} />
    </section>
  );
}
