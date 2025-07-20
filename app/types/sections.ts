// Path: /app/types/sections.ts
// Defines the types for the modular homepage sections system

export type SectionType = 'hero' | 'value-prop' | 'showcase' | 'trust' | 'cta' | 'process';
export type SectionVariant = 'A' | 'B' | 'C';

export interface SectionConfig {
  type: SectionType;
  variant: SectionVariant;
  props: Record<string, any>;
  isEnabled?: boolean;
}

export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  videoUrl?: string;
}

export interface ValuePropositionProps {
  title: string;
  subtitle: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface ProfessionalShowcaseProps {
  title: string;
  subtitle: string;
  professionals: Array<{
    id: string;
    name: string;
    profession: string;
    image: string;
    rating: number;
    projectsCompleted: number;
  }>;
}

export interface TrustBuildersProps {
  title: string;
  testimonials: Array<{
    id: string;
    name: string;
    location: string;
    quote: string;
    rating: number;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface CTAProps {
  type: 'buyer' | 'professional';
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ProcessProps {
  title: string;
  subtitle: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    icon?: string;
  }>;
}
