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

// Default homepage configuration
export const defaultHomepageConfig: SectionConfig[] = [
  {
    type: 'hero',
    variant: 'A',
    props: {
      headline: 'Your Trusted Partner for Italian Property Investment',
      subheadline: 'Connect with verified professionals and manage your entire property project in one platform',
      ctaText: 'Start Your Project',
      ctaLink: '/register',
      videoUrl: 'https://res.cloudinary.com/your-cloud/video/hero-bg.mp4'
    }
  },
  {
    type: 'value-prop',
    variant: 'A',
    props: {
      title: 'Why Choose Apulink?',
      subtitle: 'Complete project management for international property buyers',
      features: [
        {
          icon: '💰',
          title: 'Save €100K+ with Expert Guidance',
          description: 'Access 7% tax rates and PIA grants with professional help'
        },
        {
          icon: '📄',
          title: 'Secure Document Management',
          description: 'Store all your property documents in one secure vault'
        },
        {
          icon: '👥',
          title: 'Verified Professionals',
          description: 'Work with certified experts who speak your language'
        },
        {
          icon: '📊',
          title: 'Budget & Timeline Tracking',
          description: 'Stay on top of costs and deadlines with real-time updates'
        }
      ]
    }
  },
  {
    type: 'process',
    variant: 'A',
    props: {
      title: 'How It Works',
      subtitle: 'From dream to keys in hand',
      steps: [
        {
          number: '1',
          title: 'Share Your Project',
          description: 'Tell us about your property goals and requirements'
        },
        {
          number: '2',
          title: 'Connect with Professionals',
          description: 'Get matched with verified experts who speak your language'
        },
        {
          number: '3',
          title: 'Manage Everything',
          description: 'Track progress, documents, and budgets in one platform'
        }
      ]
    }
  },
  {
    type: 'showcase',
    variant: 'A',
    props: {
      title: 'Trusted Professionals',
      subtitle: 'Work with Italy\'s best property experts',
      professionals: []
    }
  },
  {
    type: 'trust',
    variant: 'A',
    props: {
      title: 'Success Stories',
      testimonials: [],
      stats: [
        { value: '€2.5M+', label: 'Property Value Managed' },
        { value: '50+', label: 'Happy Buyers' },
        { value: '100+', label: 'Verified Professionals' },
        { value: '€100K+', label: 'Average Savings' }
      ]
    }
  },
  {
    type: 'cta',
    variant: 'A',
    props: {
      type: 'buyer',
      headline: 'Ready to Start Your Italian Property Journey?',
      description: 'Join hundreds of international buyers who trust Apulink',
      buttonText: 'Get Started Free',
      buttonLink: '/register'
    }
  },
  {
    type: 'cta',
    variant: 'A',
    props: {
      type: 'professional',
      headline: 'Are You a Property Professional?',
      description: 'Join our network and connect with international buyers',
      buttonText: 'Apply as Professional',
      buttonLink: '/register/professional'
    }
  }
];
