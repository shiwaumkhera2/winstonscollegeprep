import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/Button'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { Section, type Tone } from '@/components/Section'
import { Eyebrow } from '@/components/SectionHeading'
import { site } from '@/config'

interface CtaBannerProps {
  /** Leading part of the headline, set upright. */
  title?: string
  /** Closing part of the headline, set in italic royal blue. */
  accent?: string
  description?: string
  tone?: Exclude<Tone, 'navy'>
}

export function CtaBanner({
  title = 'Ready to',
  accent = 'begin?',
  description = 'Tell us about your goals and we will map out the path to reach them.',
  tone = 'ice',
}: CtaBannerProps) {
  return (
    <Section tone={tone}>
      <RevealGroup className="grid gap-10 border-t border-navy-900/10 pt-12 lg:grid-cols-12 lg:items-end lg:pt-16">
        <div className="lg:col-span-8">
          <RevealItem>
            <Eyebrow>Next step</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-7 text-balance font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              {title} <span className="italic font-normal text-royal-600">{accent}</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{description}</p>
          </RevealItem>
        </div>
        <RevealItem className="lg:col-span-4 lg:justify-self-end lg:pb-2">
          <Button to="/contact" size="lg" icon={<ArrowRight />}>
            {site.cta}
          </Button>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
