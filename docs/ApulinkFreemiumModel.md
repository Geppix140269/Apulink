# 📟 BRIEFING FOR CLAUDE

**Project**: Apulink SaaS – Multilingual, AI-powered marketplace for property professionals in Italy
**Purpose**: Define and implement a smart, scalable Freemium business model for professionals and buyers
**Tone**: Brutal clarity, modern SaaS best practices, conversion-oriented

---

## 🛡️ CORE MODEL: Freemium with Premium Upsell

### 1. Basic Tier (Free)

All users (buyers & professionals) can register for free.
Limits are designed to encourage upgrade.

#### For Professionals (Free):

* Visible in search (low priority)
* Can respond to **2 inquiries per month**
* No profile highlights or badges
* Limited access to service areas (1 region)
* Contact info **masked** in messages
* No analytics, no support priority

#### For Buyers (Free):

* Can send **2 inquiries per month**
* No phone/email visibility for professionals
* No bundled requests (1 at a time)
* Cannot download full reports
* Cannot access "verified pros" filter

---

### 2. Premium Tiers (Paid)

#### For Professionals:

* **Starter** €29/month → Up to 10 quotes, 3 service regions, priority search
* **Pro** €79/month → Unlimited quotes, full analytics, highlights, messaging
* **Studio/Agency** €199/month → Team members, internal roles, bulk tools
* **Enterprise** Custom → White-label, integrations, custom onboarding

#### For Buyers (optional, low-friction):

* **Explorer** €19/month → 5 inquiries, extended search
* **Investor** €49/month → Bundled services, document vault
* **Portfolio** €99/month → Priority service, concierge contact

---

## 🔄 Trial Model

* **14-day trial** OR
* **5 free inquiries**
  → Onboarding flow should **push** them into trial by showing what they’ll lose
  → Add smart nudges: “You’ve used 80% of your trial”

---

## 🧠 Strategic Logic for Claude:

1. **Model the Freemium system as a SaaS growth funnel**, not a revenue cap.
2. Design **feature gates** and limits as psychological triggers to upgrade.
3. Build the **technical architecture** to:

   * Track usage per role (buyer/pro)
   * Handle plan assignment, upgrades, downgrades
   * Allow feature toggling via feature flags
4. Ensure **Stripe billing architecture** supports:

   * Plan upgrades/downgrades
   * Trials
   * Coupons & referral codes
5. Emphasize **behavior-based prompts**:

   * “This lead went to a Premium Pro — upgrade to respond”
   * “You’re out of free quotes — upgrade to stay visible”

---

## 🌟 Deliverables Expected from Claude:

* Database tables and relations for plan management and usage limits
* Stripe integration architecture for subscriptions and trials
* Middleware/guards to gate feature access by plan
* Usage tracking logic with flags for upsell
* Feature flag system for toggling premium features
* Pricing table component (basic version) for front-end
* Referral tracking logic (phase 2)
