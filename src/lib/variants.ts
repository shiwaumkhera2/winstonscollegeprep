import type { Transition, Variants } from 'framer-motion'

/** One easing curve for the whole site — silky, never bouncy. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.5,
  base: 0.7,
  slow: 0.85,
} as const

/** Shared `whileInView` viewport settings: reveal once, slightly before the element is fully visible. */
export const viewport = { once: true, margin: '-80px' } as const

export const silk = (duration: number = DURATION.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
})

/** Spring used for hover micro-interactions so they feel alive rather than mechanical. */
export const spring: Transition = { type: 'spring', stiffness: 300, damping: 18 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: silk() },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: silk() },
}

/** Blur-to-sharp reveal used for hero words and large display type. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: silk(DURATION.slow) },
}

/** Parent container that staggers its children's `hidden` → `visible` transitions. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Route change: soft fade + 12px upward slide. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: silk(DURATION.fast) },
  exit: { opacity: 0, y: -8, transition: { duration: 0.28, ease: EASE } },
}

/** Card hover: lift and grow slightly. Pair with a border/shadow change in CSS. */
export const cardLift: Variants = {
  rest: { y: 0, scale: 1, transition: spring },
  hover: { y: -8, scale: 1.02, transition: spring },
}

export const tapShrink = { scale: 0.98 }
