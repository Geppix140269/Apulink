// Path: /app/components/home/ModularHomepage.tsx
// Main component that renders the modular homepage sections

'use client';

import { SectionConfig, defaultHomepageConfig } from '@/types/sections';
import HeroA from '@/components/sections/hero/HeroA';
import ValuePropositionA from '@/components/sections/value-proposition/ValuePropositionA';
import ProcessA from '@/components/sections/process/ProcessA';
import ProfessionalShowcaseA from '@/components/sections/professional-showcase/ProfessionalShowcaseA';
import TrustBuildersA from '@/components/sections/trust-builders/TrustBuildersA';
import CTABuyer from '@/components/sections/cta/CTABuyer';
import CTAProfessional from '@/components/sections/cta/CTAProfessional';

// Component props interface
interface ModularHomepageProps {
  config?: SectionConfig[];
  userType?: 'buyer' | 'professional' | 'unknown';
}

// Section renderer component
const SectionRenderer = ({ config }: { config: SectionConfig }) => {
  const { type, variant, props, isEnabled = true } = config;

  if (!isEnabled) return null;

  // Map section types to components
  const componentMap = {
    'hero-A': HeroA,
    'value-prop-A': ValuePropositionA,
    'process-A': ProcessA,
    'showcase-A': ProfessionalShowcaseA,
    'trust-A': TrustBuildersA,
    'cta-A': props.type === 'buyer' ? CTABuyer : CTAProfessional,
  };

  const componentKey = `${type}-${variant}`;
  const Component = componentMap[componentKey as keyof typeof componentMap];

  if (!Component) {
    console.warn(`No component found for ${componentKey}`);
    return null;
  }

  // Type assertion to handle the props spreading
  return <Component {...(props as any)} />;
};

export default function ModularHomepage({ config, userType = 'unknown' }: ModularHomepageProps) {
  // Use provided config or fall back to default
  const homepageConfig = config || defaultHomepageConfig;

  // In the future, we could modify config based on userType
  // For example, showing different CTAs or reordering sections

  return (
    <main className="min-h-screen">
      {homepageConfig.map((section, index) => (
        <SectionRenderer key={`${section.type}-${index}`} config={section} />
      ))}
    </main>
  );
}
