# 🚀 Apulink CTO Brief v2.0 - PLATFORM PIVOT

**Last Updated:** July 20, 2025  
**Project Status:** STRATEGIC PIVOT IN PROGRESS  
**Critical Change:** From marketplace to project management platform

## 🎯 New Vision

**Apulink** is evolving from a simple marketplace into a **comprehensive project management platform** for international property investment in Italy. We're not just connecting people - we're orchestrating successful property investments.

**Core Innovation:** "My Apulink" dashboards and "Apulink Projects" - where buyers and professionals collaborate with enterprise-grade tools.

## 🏗️ Platform Architecture (NEW)

### Three Core Products:

1. **My Apulink for Buyers**
   - Document vault (visura, planimetria, contracts)
   - Budget management with timeline impact
   - Team collaboration with permissions
   - Project timeline tracking
   - Real-time notifications

2. **My Apulink for Professionals**
   - LinkedIn-style professional profiles
   - Portfolio showcase with case studies
   - Lead management system
   - Proposal and contract templates
   - Integrated invoicing

3. **Apulink Projects**
   - Unified workspace for buyer + professionals
   - Shared document repository
   - Milestone tracking
   - Budget visibility
   - Team messaging
   - Progress reporting

## 🔄 User Journey (REVISED)

### Phase 1: Presentation
- Modular homepage sections (A/B testable)
- Trust-building design (NO cheap elements)
- Clear value propositions
- Professional showcase

### Phase 2: Onboarding
- Progressive profiling
- Immediate value delivery
- Dashboard preview
- Guided setup wizard

### Phase 3: Recruiting
- Browse professionals like LinkedIn
- Video introductions
- Verified credentials
- Transparent pricing
- Direct booking

### Phase 4: Management
- Create Apulink Project
- Invite team members
- Set permissions
- Track everything
- Collaborate in real-time

### Phase 5: Delivery & Storage
- Permanent document vault
- Tax record keeping
- Project history
- Team archive

## 💻 Technical Requirements (UPDATED)

```yaml
Frontend Structure:
  /app
    /components
      /sections (modular homepage)
      /dashboard
        /buyer
        /professional
      /projects
      /auth
    /(authenticated)
      /my-apulink
      /projects/[id]

Key Features:
  - Modular section system
  - Role-based dashboards
  - Real-time collaboration
  - Document management
  - Budget tracking
  - Mobile notifications
  - Biometric auth

Design Principles:
  - Professional aesthetic
  - Trust-building UI
  - Mobile-first
  - Enterprise feel
  - Clean data viz
```

## 📱 Mobile Strategy (CRITICAL)

**Requirements:**
- Full feature parity with desktop
- Push notifications for all events
- Offline document access
- Camera integration
- Biometric authentication

**Implementation:**
- PWA first, React Native later
- Background sync
- Install prompts
- Native-like performance

## 💰 Revenue Model (UPDATED)

### For Professionals:
- **Basic:** €49/month (5 active projects)
- **Professional:** €99/month (unlimited projects)
- **Agency:** €299/month (team features)

### For Buyers:
- **Free:** Browse and connect
- **Success Fee:** 1% of property value (max €5,000)
- **Premium Storage:** €9.99/month after 1 year

### Additional Revenue:
- White-label solutions
- API access
- Advanced analytics
- Priority support

## 🎯 Success Metrics (NEW)

**Platform Health:**
- Dashboard activation > 60%
- Weekly active users > 70%
- Project completion > 90%
- Document uploads per project > 20

**Business Growth:**
- Month 1: 25 professionals, €2K MRR
- Month 2: 50 professionals, €5K MRR
- Month 3: 100 professionals, €10K MRR
- Month 6: 300 professionals, €30K MRR

## 🚀 Implementation Roadmap

### Week 1 (July 20-26):
1. Restructure homepage → modular sections
2. Design dashboard wireframes
3. Build authentication system
4. Create professional profiles

### Week 2 (July 27-Aug 2):
1. Build "My Apulink" for buyers
2. Document upload system
3. Budget management tool
4. Notification system

### Week 3 (Aug 3-9):
1. Build "My Apulink" for professionals
2. Create "Apulink Projects"
3. Team collaboration features
4. Mobile PWA setup

### Week 4 (Aug 10-16):
1. Payment integration
2. Beta launch preparation
3. Onboard 10 professionals
4. Gather feedback

## 🛠️ Current Status Check

### What Exists:
- Basic homepage (needs complete rebuild)
- Professional registration (needs redesign)
- Database connection (needs schema update)
- Trullo chatbot (can enhance)

### What's Missing:
- Modular section system
- Dashboard infrastructure
- Document management
- Project collaboration
- Mobile capabilities
- Professional profiles
- Payment system
- Notification system

## 🔧 Stack Decisions (UPDATED)

```yaml
Frontend:
  - Next.js 14 (unchanged)
  - Zustand for state management
  - React Query for data fetching
  - Radix UI + professional theme
  
Backend:
  - Supabase (unchanged)
  - Edge Functions for complex logic
  - Realtime for collaboration
  - Row Level Security enhanced
  
Mobile:
  - PWA with next-pwa
  - Push notifications
  - Service workers
  - React Native (Phase 2)
  
Payments:
  - Stripe for subscriptions
  - Escrow for success fees
  - Invoice generation
```

## 📋 Today's Priorities (July 20)

1. **Restructure Homepage**
   - Create `/components/sections` structure
   - Build first modular section
   - Remove current monolithic design

2. **Design Dashboards**
   - Wireframe "My Apulink" for buyers
   - Wireframe "My Apulink" for professionals
   - Define data models

3. **Fix Registration**
   - Professional onboarding flow
   - Remove fee mentions
   - Add profile preview

4. **Plan Authentication**
   - Multi-factor setup
   - Role-based access
   - Session management

## 💡 Key Principles

1. **Trust First** - Every element builds confidence
2. **Value Visible** - Show ROI immediately  
3. **Professional Always** - No amateur elements
4. **Mobile Equal** - Not mobile "friendly", mobile FIRST
5. **Security Paramount** - Handle sensitive docs

## 🎬 Next Session Brief

Start every session by:
1. Reading this updated brief
2. Checking pivot progress
3. Building modular, professional features
4. Testing on mobile
5. Thinking "project management platform"

**Remember:** We're not building a marketplace. We're building the operating system for international property investment in Italy.

---

*"Make it so professional that competitors look amateur. Make it so useful that users can't imagine working without it."*
