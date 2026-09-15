import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type Tone = 'white' | 'ice' | 'navy'

interface SectionProps {
  id?: string
  tone?: Tone
  padding?: 'default' | 'tight' | 'none'
  className?: string
  children: ReactNode
}

const tones: Record<Tone, string> = {
  white: 'grain bg-white',
  ice: 'grain bg-ice-50',
  navy: 'bg-navy-900 text-white',
}

const paddings = {
  default: 'py-24 sm:py-28 lg:py-36',
  tight: 'py-14 sm:py-16 lg:py-20',
  none: '',
}

export function Section({ id, tone = 'white', padding = 'default', className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative', tones[tone], paddings[padding], className)}>
      <div className="container-x relative">{children}</div>
    </section>
  )
}
