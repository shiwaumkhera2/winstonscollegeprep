import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { Eyebrow } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for does not exist." />
      <section className="grain relative bg-white">
        <div className="container-x flex min-h-[70vh] flex-col justify-center pb-24 pt-40">
          <Reveal>
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              This page took a <span className="italic font-normal text-royal-600">different path</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">The page you were looking for does not exist or has moved.</p>
            <div className="mt-10">
              <Button to="/" variant="secondary" icon={<ArrowLeft />}>
                Back to home
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
