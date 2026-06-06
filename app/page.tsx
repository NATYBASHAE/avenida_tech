import { CinematicHero } from "@/components/home/cinematic-hero"
import { TrustStrip } from "@/components/home/trust-strip"
import { ServicesIntro } from "@/components/home/services-intro"
import { IndustriesSection } from "@/components/home/industries-section"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { ProjectProcess } from "@/components/home/project-process"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { CTASection } from "@/components/home/cta-section"

export default function Home() {
  return (
    <>
      <CinematicHero />
      <TrustStrip />
      <ServicesIntro />
      <IndustriesSection />
      <WhyChooseUs />
      <ProjectProcess />
      <CTASection />
    </>
  )
}
