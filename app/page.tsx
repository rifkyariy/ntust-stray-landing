import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Navigation/Footer'
import Hero from '@/components/Hero/Hero'
import FeatureGrid from '@/components/Features/FeatureGrid'
import ArchitectureTiers from '@/components/Architecture/ArchitectureTiers'
import DashboardPreview from '@/components/Community/DashboardPreview'
import ImpactMetrics from '@/components/Community/ImpactMetrics'
import DonationCTA from '@/components/Community/DonationCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <ArchitectureTiers />
        <DashboardPreview />
        <ImpactMetrics />
        <DonationCTA />
      </main>
      <Footer />
    </>
  )
}
