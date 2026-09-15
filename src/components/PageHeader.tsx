import { motion } from 'framer-motion'

import { Eyebrow } from '@/components/SectionHeading'
import { blurUp, fadeUp, stagger } from '@/lib/variants'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

/** Header for inner pages: oversized serif title on the left, supporting text set against a rule on the right. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="grain relative overflow-hidden bg-white pb-16 pt-40 sm:pb-20 sm:pt-48">
      <div
        className="dot-grid absolute inset-x-0 top-0 h-[28rem] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(127,176,255,0.35), transparent 70%)' }}
        aria-hidden
      />

      <motion.div
        className="container-x relative grid items-end gap-8 lg:grid-cols-12 lg:gap-12"
        variants={stagger(0.12, 0.05)}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:col-span-8">
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1
            variants={blurUp}
            className="mt-7 font-display text-[clamp(2.9rem,6.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-navy-900"
          >
            {title}
          </motion.h1>
        </div>
        {description && (
          <motion.p
            variants={fadeUp}
            className="max-w-md border-l border-royal-600/30 pl-6 text-lg leading-relaxed text-ink-600 lg:col-span-4 lg:mb-3"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
