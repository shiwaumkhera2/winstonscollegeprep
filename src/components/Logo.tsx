import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'

interface LogoProps {
  onDark?: boolean
  className?: string
}

export function Logo({ onDark = false, className }: LogoProps) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-3', className)} aria-label="Winston College Prep — home">
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center rounded-[3px] font-display text-[1.2rem] font-semibold leading-none transition-colors duration-500',
          onDark ? 'bg-white text-navy-900' : 'bg-navy-900 text-white group-hover:bg-royal-600',
        )}
      >
        W
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[1.4rem] font-semibold tracking-[-0.01em]', onDark ? 'text-white' : 'text-navy-900')}>
          Winston
        </span>
        <span
          className={cn(
            'mt-1 text-[9.5px] font-semibold uppercase tracking-[0.28em]',
            onDark ? 'text-sky-300' : 'text-ink-500',
          )}
        >
          College Prep
        </span>
      </span>
    </Link>
  )
}
