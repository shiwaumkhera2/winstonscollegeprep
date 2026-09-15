import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

import { EASE } from '@/lib/variants'

interface CountUpOptions {
  duration?: number
  delay?: number
}

/**
 * Counts from 0 to `target` the first time the referenced element scrolls into view.
 * Jumps straight to the target for users who prefer reduced motion.
 */
export function useCountUp<T extends Element = HTMLDivElement>(target: number, { duration = 1.6, delay = 0.1 }: CountUpOptions = {}) {
  const ref = useRef<T | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setValue(target)
      return
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, target, duration, delay, reduceMotion])

  return { ref, value }
}
