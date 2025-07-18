// PATH: app/page.tsx
import HeroLeadMagnet from './components/home/HeroLeadMagnet'
import TrustBar from './components/home/TrustBar'
import ValueProposition from './components/home/ValueProposition'
import LeadMagnetOffer from './components/home/LeadMagnetOffer'
import SocialProof from './components/home/SocialProof'
import ProfessionalShowcase from './components/home/ProfessionalShowcase'
import ROICalculator from './components/home/ROICalculator'
import UrgencyBanner from './components/home/UrgencyBanner'
import FAQSection from './components/home/FAQSection'
import FinalCTA from './components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroLeadMagnet />
      <TrustBar />
      <ValueProposition />
      <LeadMagnetOffer />
      <ProfessionalShowcase />
      <SocialProof />
      <ROICalculator />
      <UrgencyBanner />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
