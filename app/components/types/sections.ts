// Path: app/types/sections.ts
// This file defines the modular section system for dynamic homepage composition

export type SectionType = 'hero' | 'value-proposition' | 'professional-showcase' | 'trust-builders' | 'cta' | 'process' | 'benefits';
export type SectionVariant = 'A' | 'B' | 'C';

export interface SectionConfig {
  id: string;
  type: SectionType;
  variant: SectionVariant;
  order: number;
  isActive: boolean;
  props: Record<string, any>;
  mobileProps?: Record<string, any>; // Optional mobile-specific props
  testingMetrics?: {
    views: number;
    conversions: number;
    variant: string;
  };
}

export interface HomepageConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  sections: SectionConfig[];
  targetAudience?: 'buyers' | 'professionals' | 'both';
  campaign?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Default homepage configuration
export const defaultHomepageConfig: HomepageConfig = {
  id: 'default-homepage',
  name: 'Default Homepage',
  description: 'Professional project management platform for Italian property investment',
  isActive: true,
  targetAudience: 'both',
  sections: [
    {
      id: 'hero-section',
      type: 'hero',
      variant: 'A',
      order: 1,
      isActive: true,
      props: {
        headline: 'Your Trusted Partner for Italian Property Investment',
        subheadline: 'Professional project management platform connecting international buyers with verified Italian property experts',
        ctaText: 'Start Your Project',
        ctaLink: '/get-started',
        secondaryCtaText: 'Browse Professionals',
        secondaryCtaLink: '/professionals',
        backgroundType: 'gradient' // or 'image', 'video'
      }
    },
    {
      id: 'value-prop-section',
      type: 'value-proposition',
      variant: 'A',
      order: 2,
      isActive: true,
      props: {
        title: 'Why Choose Apulink',
        features: [
          {
            icon: 'Shield',
            title: 'Verified Professionals',
            description: 'Every expert is thoroughly vetted and certified'
          },
          {
            icon: 'FileText',
            title: 'Document Management',
            description: 'Secure vault for all your property documents'
          },
          {
            icon: 'Users',
            title: 'Team Collaboration',
            description: 'Real-time project management with your entire team'
          },
          {
            icon: 'Euro',
            title: 'Budget Tracking',
            description: 'Complete financial transparency and control'
          }
        ]
      }
    },
    {
      id: 'process-section',
      type: 'process',
      variant: 'A',
      order: 3,
      isActive: true,
      props: {
        title: 'How It Works',
        steps: [
          {
            number: '01',
            title: 'Create Your Project',
            description: 'Set up your property investment project with goals and timeline'
          },
          {
            number: '02',
            title: 'Build Your Team',
            description: 'Browse and select from verified professionals'
          },
          {
            number: '03',
            title: 'Manage Together',
            description: 'Collaborate in real-time with shared documents and milestones'
          },
          {
            number: '04',
            title: 'Complete Successfully',
            description: 'Track progress and celebrate your Italian property success'
          }
        ]
      }
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};
