import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

import { fadeUp, stagger as staggerVariants, viewport } from '@/lib/variants'

interface RevealProps {
  children: ReactNode
  className?: string
  variants?: Variants
}

/** Fades a block up the first time it scrolls into view. */
export function Reveal({ children, className, variants = fadeUp }: RevealProps) {
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="visible" viewport={viewport}>
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  /** Seconds between each child's entrance. */
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Container whose `RevealItem` children stagger in once it scrolls into view. */
export function RevealGroup({ children, className, stagger = 0.08, delay = 0, as = 'div' }: RevealGroupProps) {
  const Component = as === 'ul' ? motion.ul : as === 'ol' ? motion.ol : motion.div
  return (
    <Component
      className={className}
      variants={staggerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Component>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: 'div' | 'li'
}

export function RevealItem({ children, className, variants = fadeUp, as = 'div' }: RevealItemProps) {
  const Component = as === 'li' ? motion.li : motion.div
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  )
}
