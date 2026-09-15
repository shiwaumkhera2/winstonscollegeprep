import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/Button'
import { ContactStrip } from '@/components/ContactStrip'
import { CourseCard } from '@/components/CourseCard'
import { CtaBanner } from '@/components/CtaBanner'
import { FeatureCard } from '@/components/FeatureCard'
import { Hero } from '@/components/Hero'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Eyebrow, SectionHeading } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { StatsSection } from '@/components/StatsSection'
import { courses } from '@/data/courses'
import { features } from '@/data/features'

export function Home() {
  const previewCourses = courses.slice(0, 6)

  return (
    <>
      <Seo path="/" />

      <Hero />
      <div className="bg-white pb-6">
        <ContactStrip />
      </div>

      <Section tone="ice" id="why-us">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <RevealGroup className="lg:col-span-5">
            <RevealItem>
              <Eyebrow>Why us</Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-7 text-balance font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.025em]">
                Why Choose Winston College Prep?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
                Focused teaching, individual attention, and a track record of results that carry students into the universities they aim
                for.
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <Button to="/services" variant="ghost" icon={<ArrowRight />}>
                Explore the programmes
              </Button>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-7" stagger={0.1}>
            {features.map((feature) => (
              <RevealItem key={feature.title} className="h-full">
                <FeatureCard {...feature} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <StatsSection />

      <Section tone="white" id="courses">
        <SectionHeading
          eyebrow="Services"
          title="Our Courses"
          description="From standardized tests to admissions strategy, each programme is built around your target score and timeline."
        />
        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {previewCourses.map((course) => (
            <RevealItem key={course.slug} className="h-full">
              <CourseCard course={course} variant="compact" />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-12 flex justify-start lg:justify-end">
          <Button to="/services" variant="secondary" size="lg" icon={<ArrowRight />}>
            View all {courses.length} courses
          </Button>
        </Reveal>
      </Section>

      <CtaBanner tone="ice" />
    </>
  )
}
