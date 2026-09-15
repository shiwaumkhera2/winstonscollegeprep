import { motion, type TargetAndTransition, type Variants } from 'framer-motion'

import type { Feature, FeatureMotion } from '@/data/features'
import { cardLift, EASE, spring } from '@/lib/variants'

/** Each icon has its own hover gesture, driven by the card's `hover` variant. */
const iconHover: Record<FeatureMotion, TargetAndTransition> = {
  tilt: { rotate: -12, y: -4, transition: spring },
  pulse: { scale: [1, 1.15, 1], transition: { duration: 0.6, ease: EASE } },
  rise: { y: -4, rotate: 4, transition: spring },
  spin: { rotate: 360, transition: { duration: 0.8, ease: EASE } },
}

const iconRest: Record<FeatureMotion, TargetAndTransition> = {
  tilt: { rotate: 0, y: 0, transition: spring },
  pulse: { scale: 1, transition: spring },
  rise: { rotate: 0, y: 0, transition: spring },
  // A full turn lands where it started, so snap back silently instead of unwinding.
  spin: { rotate: 0, transition: { duration: 0 } },
}

export function FeatureCard({ title, description, icon: Icon, motion: motionKey }: Feature) {
  const iconVariants: Variants = { rest: iconRest[motionKey], hover: iconHover[motionKey] }

  return (
    <motion.article
      variants={cardLift}
      initial="rest"
      whileHover="hover"
      className="group flex h-full flex-col rounded-card border border-slate-200 bg-white p-8 transition-[border-color,box-shadow] duration-500 ease-silk hover:border-sky-400 hover:shadow-card-hover"
    >
      <motion.span
        variants={iconVariants}
        className="mb-10 grid size-12 place-items-center rounded-[3px] border border-royal-600/15 bg-ice-50 text-royal-600 transition-colors duration-500 group-hover:border-sky-400/60 group-hover:bg-ice-100"
      >
        <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden />
      </motion.span>
      <h3 className="font-display text-[1.45rem] leading-tight">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink-600">{description}</p>
    </motion.article>
  )
}
