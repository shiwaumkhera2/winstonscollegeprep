import { RevealGroup, RevealItem } from '@/components/Reveal'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: string
  onDark?: boolean
  className?: string
}

/** Small-caps label with a short rule — the editorial marker used above every heading. */
export function Eyebrow({ children, onDark, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]',
        onDark ? 'text-sky-300' : 'text-royal-600',
        className,
      )}
    >
      <span className={cn('h-px w-8', onDark ? 'bg-sky-300/70' : 'bg-royal-600/60')} aria-hidden />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  /** `split` puts the eyebrow in the left column and the title in the right — the default asymmetry. */
  layout?: 'split' | 'left' | 'center'
  onDark?: boolean
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  layout = 'split',
  onDark = false,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const titleClass = cn(
    'text-balance font-display font-medium leading-[1.06] tracking-[-0.025em]',
    Heading === 'h1' ? 'text-[clamp(2.75rem,6vw,4.75rem)]' : 'text-[clamp(2.25rem,4.2vw,3.5rem)]',
    onDark && 'text-white',
  )
  const descriptionClass = cn('mt-6 max-w-2xl text-lg leading-relaxed', onDark ? 'text-ice-100/75' : 'text-ink-600')

  if (layout === 'split') {
    return (
      <RevealGroup className={cn('grid gap-6 lg:grid-cols-12 lg:gap-10', className)}>
        <RevealItem className="lg:col-span-4 lg:pt-3">{eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}</RevealItem>
        <div className="lg:col-span-8">
          <RevealItem>
            <Heading className={titleClass}>{title}</Heading>
          </RevealItem>
          {description && (
            <RevealItem>
              <p className={descriptionClass}>{description}</p>
            </RevealItem>
          )}
        </div>
      </RevealGroup>
    )
  }

  return (
    <RevealGroup
      className={cn('flex flex-col', layout === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
    >
      {eyebrow && (
        <RevealItem>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </RevealItem>
      )}
      <RevealItem>
        <Heading className={cn(titleClass, 'mt-6')}>{title}</Heading>
      </RevealItem>
      {description && (
        <RevealItem>
          <p className={descriptionClass}>{description}</p>
        </RevealItem>
      )}
    </RevealGroup>
  )
}
