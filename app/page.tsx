// PATH: app/page.tsx
import HeroLeadMagnet from './components/home/HeroLeadMagnet'
import UserTypeCards from './components/home/UserTypeCards'
import HowItWorks from './components/home/HowItWorks'
import SurveyPackages from './components/home/SurveyPackages'
import WhyUseApulink from './components/home/WhyUseApulink'

export default function HomePage() {
  return (
    <>
      <HeroLeadMagnet />
      <UserTypeCards />
      <HowItWorks />
      <SurveyPackages />
      <WhyUseApulink />
    </>
  )
}
