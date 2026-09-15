import { CourseCard } from '@/components/CourseCard'
import { CtaBanner } from '@/components/CtaBanner'
import { PageHeader } from '@/components/PageHeader'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { courses } from '@/data/courses'

export function Services() {
  return (
    <>
      <Seo
        title="Our Courses"
        path="/services"
        description="SAT, ACT, GRE, GMAT, IELTS, TOEFL, AP, IB, college admissions and Business English programmes from Winston College Prep."
      />

      <PageHeader
        eyebrow="Services"
        title="Our Courses"
        description="Every programme pairs expert instruction with a personalized plan, regular practice, and feedback that moves your score."
      />

      <Section tone="ice" padding="tight" className="lg:py-24">
        <RevealGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {courses.map((course) => (
            <RevealItem key={course.slug} className="h-full">
              <CourseCard course={course} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBanner
        tone="white"
        title="Not sure which course"
        accent="fits?"
        description="Tell us your goals and timeline and we will recommend the right programme."
      />
    </>
  )
}
