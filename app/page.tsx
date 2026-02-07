import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CourseCategories from '@/components/CourseCategories'
import Stats from '@/components/Stats'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import CTA from '@/components/CTA'
import UpcomingBatches from '@/components/UpcomingBatches'
import CourseCarousel from '@/components/CourseCarousel'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />
      <Stats />
      <CourseCarousel />
      <UpcomingBatches />
      <CourseCategories />
      <Features />
      <PricingSection />
      <TestimonialsCarousel />
      <CTA />
    </div>
  )
}
