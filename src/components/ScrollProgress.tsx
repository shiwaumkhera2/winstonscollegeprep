import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar along the top edge that fills as the visitor scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-accent-gradient fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
    />
  )
}
