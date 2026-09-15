import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { tapShrink } from '@/lib/variants'

const MotionLink = motion.create(Link)

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  /** Internal route — renders a react-router Link. */
  to?: string
  /** External URL — renders an anchor. */
  href?: string
  external?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  variant?: Variant
  size?: Size
  icon?: ReactNode
  fullWidth?: boolean
  className?: string
}

const base =
  'group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-card font-medium tracking-[0.01em] whitespace-nowrap select-none transition-[color,box-shadow,border-color,background-color] duration-500 ease-silk disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-royal-600 text-white hover:shadow-glow',
  secondary: 'border border-navy-900/20 bg-transparent text-navy-900 hover:border-navy-900 hover:text-white',
  ghost: 'text-royal-600 hover:text-navy-900',
  inverse: 'bg-white text-navy-900 hover:text-white hover:shadow-glow',
}

/** The panel that sweeps in from the left on hover. */
const sweeps: Record<Variant, string> = {
  primary: 'bg-accent-gradient',
  secondary: 'bg-navy-900',
  ghost: '',
  inverse: 'bg-accent-gradient',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-[15px]',
}

const MAGNET_RANGE = 6

export function Button({
  children,
  to,
  href,
  external,
  type = 'button',
  onClick,
  disabled,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className,
}: ButtonProps) {
  const reduceMotion = useReducedMotion()

  // Magnetic hover: the button drifts a few pixels toward the cursor and springs back.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 })

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || disabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)) * MAGNET_RANGE)
    y.set(Math.max(-1, Math.min(1, dy)) * MAGNET_RANGE)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = cn(base, variants[variant], sizes[size], variant === 'ghost' && 'h-auto px-0', fullWidth && 'w-full', className)

  const motionProps = {
    style: { x: springX, y: springY },
    onPointerMove,
    onPointerLeave,
    whileTap: disabled ? undefined : tapShrink,
  }

  const content = (
    <>
      {sweeps[variant] && (
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 -z-10 -translate-x-[101%] transition-transform duration-[650ms] ease-silk group-hover:translate-x-0',
            sweeps[variant],
          )}
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative inline-flex transition-transform duration-500 ease-silk group-hover:translate-x-0.5 [&>svg]:size-[1.05em]">
          {icon}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps}>
        {content}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={classes} {...motionProps}>
      {content}
    </motion.button>
  )
}
