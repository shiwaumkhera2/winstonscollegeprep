import { CtaBanner } from '@/components/CtaBanner'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { VideoGrid } from '@/components/VideoGrid'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  return (
    <>
      <Seo
        title="What Our Students Say"
        path="/testimonials"
        description="Hear directly from Winston College Prep students about their test-prep journeys and university admissions results."
      />

      <PageHeader
        eyebrow="Testimonials"
        title="What Our Students Say"
        description="Real students, in their own words, on how preparation with Winston changed their scores and their options."
      />

      <Section tone="ice" padding="tight" className="lg:py-24">
        <VideoGrid videos={testimonials} />
      </Section>

      <CtaBanner
        tone="white"
        title="Your story could be"
        accent="next"
        description="Start with a conversation about where you are and where you want to be."
      />
    </>
  )
}
