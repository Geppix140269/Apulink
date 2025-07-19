# 🏗️ Apulink Technical Architecture & Decisions

**Last Updated:** January 2025
**Status:** MVP Built - Needs Revenue Features

## 🎨 Frontend Architecture

### Stack Decisions
```yaml
Framework: Next.js 14
  - App Router (not Pages)
  - TypeScript for type safety
  - Server Components where possible
  
Styling: Tailwind CSS
  - Utility-first approach
  - Custom theme for brand colors
  - Responsive by default
  
UI Components: 
  - Radix UI (accessible primitives)
  - Custom components in /components
  - Framer Motion for animations
  
Deployment: Netlify
  - Automatic deploys from main branch
  - Preview deploys for PRs
  - Environment variables configured
```

### Design System
```css
/* Brand Colors */
--terracotta: #C65D00;
--sage-green: #6B8E23;
--warm-cream: #FFF8DC;
--deep-navy: #2C3E50;

/* Typography */
--font-heading: 'Playfair Display', serif;
--font-body: 'Open Sans', sans-serif;

/* Breakpoints */
--mobile: 640px;
--tablet: 768px;
--desktop: 1024px;
```

### Current Design Issues to Fix
1. Font size too small on mobile
2. Contrast issues with light text
3. CTAs not prominent enough
4. Forms not mobile-optimized
5. Navigation unclear on small screens

## 🗄️ Backend Architecture

### Supabase Configuration
```typescript
// Database Tables
professionals {
  id: uuid
  user_id: uuid (FK -> auth.users)
  name: string
  profession: string
  languages: string[]
  regions: string[]
  tier: 'free' | 'starter' | 'pro' | 'studio'
  verified: boolean
  stripe_customer_id: string
  created_at: timestamp
}

inquiries {
  id: uuid
  buyer_email: string
  buyer_name: string
  property_type: string
  budget_range: string
  regions: string[]
  services_needed: string[]
  message: text
  status: 'new' | 'matched' | 'completed'
  created_at: timestamp
}

matches {
  id: uuid
  inquiry_id: uuid
  professional_id: uuid
  status: 'pending' | 'accepted' | 'rejected'
  quoted_price: decimal
  message: text
  created_at: timestamp
}

subscriptions {
  id: uuid
  professional_id: uuid
  stripe_subscription_id: string
  tier: string
  status: string
  current_period_end: timestamp
  quotes_used: integer
  quotes_limit: integer
}
```

### API Routes Structure
```
/api
  /auth
    - login.ts
    - logout.ts
    - register.ts
  /professionals
    - create.ts
    - update.ts
    - list.ts
    - [id].ts
  /inquiries
    - create.ts
    - match.ts
    - [id].ts
  /subscriptions
    - create.ts
    - update.ts
    - webhook.ts
  /chat
    - trullo.ts
```

## 🤖 AI Integration (Trullo)

### OpenAI Configuration
```typescript
// Trullo Chatbot Setup
model: "gpt-4-turbo-preview"
temperature: 0.7
max_tokens: 500

// System Prompt
"You are Trullo, Apulink's helpful assistant. 
You help foreign property buyers understand:
- Apulia's 7% tax benefits
- PIA grant opportunities  
- How to find trusted professionals
- The property buying process
Always be helpful, concise, and guide users 
towards connecting with our professionals."
```

### Trullo Features
- Answers tax/grant questions
- Qualifies buyer needs
- Suggests professional matches
- Books consultations
- Provides guides/resources

## 📝 Content Management (Sanity)

### Schema Structure
```javascript
// Blog Posts
{
  name: 'post',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'excerpt', type: 'text' },
    { name: 'content', type: 'portableText' },
    { name: 'category', type: 'reference' },
    { name: 'seoDescription', type: 'text' },
    { name: 'publishedAt', type: 'datetime' }
  ]
}

// Professional Profiles
{
  name: 'professionalProfile',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'profession', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'specialties', type: 'array' },
    { name: 'languages', type: 'array' },
    { name: 'image', type: 'image' }
  ]
}

// Region Guides
{
  name: 'regionGuide',
  fields: [
    { name: 'region', type: 'string' },
    { name: 'description', type: 'portableText' },
    { name: 'taxBenefits', type: 'text' },
    { name: 'popularTowns', type: 'array' },
    { name: 'image', type: 'image' }
  ]
}
```

## 💳 Payment Integration (To Implement)

### Stripe Configuration
```typescript
// Products & Prices
products: {
  starter: {
    monthly: 'price_starter_monthly',
    annual: 'price_starter_annual'
  },
  pro: {
    monthly: 'price_pro_monthly',
    annual: 'price_pro_annual'
  },
  studio: {
    monthly: 'price_studio_monthly',
    annual: 'price_studio_annual'
  }
}

// Webhooks to Handle
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

## 📧 Email System

### Transactional Emails (Resend)
1. Welcome email (professionals)
2. Inquiry notification
3. Match notification
4. Quote received
5. Subscription confirmation
6. Payment receipts

### Email Templates
```typescript
// Using React Email
- WelcomeProfessional.tsx
- NewInquiry.tsx
- MatchMade.tsx
- SubscriptionConfirm.tsx
```

## 🔒 Security Considerations

### Authentication
- Supabase Auth (email/password)
- JWT tokens
- Row Level Security (RLS)
- Session management

### Data Protection
- GDPR compliance required
- Personal data encryption
- Secure file uploads
- API rate limiting

## 📱 Mobile Optimization

### Current Issues
- Navigation menu broken
- Forms too small
- Tables not responsive
- Images not optimized
- Touch targets too small

### Solutions
- Hamburger menu for mobile
- Single column forms
- Horizontal scroll for tables
- Lazy loading images
- 44px minimum touch targets

## 🚀 Performance Optimizations

### Current
- Static generation where possible
- Image optimization with next/image
- Code splitting automatic
- CSS purging with Tailwind

### To Implement
- Redis caching
- CDN for assets
- Database indexing
- API response caching
- Lighthouse score >90

## 🧪 Testing Strategy

### Current
- Manual testing only
- No automated tests

### To Implement
- Jest for unit tests
- Cypress for E2E tests
- Test critical flows:
  - Registration
  - Payment
  - Matching
  - Messaging

## 📈 Analytics & Monitoring

### To Implement
- Google Analytics 4
- Hotjar for heatmaps
- Sentry for error tracking
- Uptime monitoring
- Custom events tracking

## 🔄 CI/CD Pipeline

### Current
- Direct push to main
- Netlify auto-deploys

### To Improve
- Protected main branch
- PR reviews required
- Automated testing
- Staging environment
- Environment variables

## 💡 Key Technical Decisions

1. **Next.js over plain React** - SEO critical
2. **Supabase over Firebase** - PostgreSQL preferred
3. **Netlify over Vercel** - Better for content sites
4. **Tailwind over styled-components** - Faster development
5. **TypeScript over JavaScript** - Type safety important
6. **Sanity over Contentful** - Better developer experience

## 🐛 Known Technical Debt

1. No error boundaries
2. No loading states
3. No offline support
4. No test coverage
5. No documentation
6. Inconsistent code style
7. No accessibility audit

## 📋 Next Technical Priorities

1. **Week 1:** Fix design/mobile issues
2. **Week 2:** Add Stripe payments
3. **Week 3:** Improve Trullo responses
4. **Week 4:** Add analytics
5. **Month 2:** Add testing
6. **Month 3:** Performance optimization

---

*Remember: We're building for scale from day one, but shipping fast. Technical debt is OK if it drives revenue!*
