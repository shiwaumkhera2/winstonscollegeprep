import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/Button'
import { Eyebrow } from '@/components/SectionHeading'
import { site } from '@/config'
import { courses, type Course } from '@/data/courses'
import { cn } from '@/lib/cn'
import { EASE, fadeUp, silk, stagger } from '@/lib/variants'

const LINES: string[][] = [
  ['Your', 'Path', 'to'],
  ['Academic', 'Excellence'],
]
const ACCENT_WORD = 'Excellence'
const WORD_DELAY = 0.2
const WORD_STAGGER = 0.09
const WORD_COUNT = LINES.flat().length
const AFTER_WORDS = WORD_DELAY + WORD_STAGGER * WORD_COUNT + 0.25

/** Each word arrives from a soft blur, staggered by its index. */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE, delay: WORD_DELAY + index * WORD_STAGGER },
  }),
}

/** The exams named in the subheadline, in the same order, with their durations. */
const LEDGER: Course[] = ['sat', 'act', 'ielts', 'toefl', 'gre', 'gmat', 'ib']
  .map((slug) => courses.find((course) => course.slug === slug))
  .filter((course): course is Course => Boolean(course))

export function Hero() {
  let wordIndex = 0

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-52">
      <FloatingBlobs />
      <div
        className="dot-grid absolute inset-x-0 top-0 h-[70vh] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />

      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={silk(0.8, 0.05)}>
          <Eyebrow>Test preparation &amp; admissions coaching</Eyebrow>
        </motion.div>

        <h1
          aria-label={site.tagline}
          className="mt-8 font-display text-[clamp(2.9rem,7.4vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-navy-900"
        >
          {LINES.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((word, i) => {
                const index = wordIndex++
                const isAccent = word === ACCENT_WORD
                return (
                  <span key={word} className="inline-block">
                    <motion.span
                      custom={index}
                      variants={wordVariants}
                      initial="hidden"
                      animate="visible"
                      className={cn('inline-block will-change-transform', isAccent && 'relative italic font-normal text-royal-600')}
                    >
                      {word}
                      {isAccent && <GradientUnderline delay={AFTER_WORDS} />}
                    </motion.span>
                    {i < line.length - 1 && <span aria-hidden>&nbsp;</span>}
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-6"
            variants={stagger(0.12, AFTER_WORDS - 0.35)}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="max-w-xl text-xl leading-relaxed text-ink-600 sm:text-[1.35rem]">
              {site.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact" size="lg" icon={<ArrowRight />}>
                {site.cta}
              </Button>
              <Button to="/services" size="lg" variant="secondary">
                View Our Courses
              </Button>
            </motion.div>
          </motion.div>

          <Ledger className="lg:col-span-5 lg:col-start-8" delay={AFTER_WORDS - 0.2} />
        </div>
      </div>
    </section>
  )
}

/** Slow-drifting gradient blobs behind the hero. */
function FloatingBlobs() {
  const reduceMotion = useReducedMotion()
  const drift = (dx: number, dy: number) =>
    reduceMotion ? undefined : { x: [0, dx, -dx * 0.5, 0], y: [0, dy, -dy * 0.6, 0], scale: [1, 1.06, 0.97, 1] }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -right-[12%] -top-[14%] size-[48rem] rounded-full opacity-80 blur-3xl will-change-transform"
        style={{ background: 'radial-gradient(closest-side, rgba(79,142,247,0.42), rgba(36,71,184,0.16) 55%, transparent 72%)' }}
        animate={drift(40, -30)}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[35%] -left-[14%] size-[36rem] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{ background: 'radial-gradient(closest-side, rgba(127,176,255,0.35), transparent 70%)' }}
        animate={drift(-30, 22)}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

/** Hand-drawn gradient rule beneath the accent word, drawn in after the words arrive. */
function GradientUnderline({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.04em] left-0 h-[0.16em] w-full overflow-visible"
    >
      <defs>
        <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2447b8" />
          <stop offset="1" stopColor="#4f8ef7" />
        </linearGradient>
      </defs>
      <motion.path
        d="M2 10 C 48 3, 152 3, 198 8"
        fill="none"
        stroke="url(#hero-underline)"
        strokeWidth="3.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { delay, duration: 0.9, ease: EASE }, opacity: { delay, duration: 0.2 } }}
      />
    </svg>
  )
}

/** Programme index: exam names in serif against hairlines, durations on the right. */
function Ledger({ className, delay }: { className?: string; delay: number }) {
  return (
    <motion.div className={className} variants={stagger(0.07, delay)} initial="hidden" animate="visible">
      <motion.div
        variants={fadeUp}
        className="flex items-baseline justify-between border-t border-navy-900/15 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500"
      >
        <span>Programmes</span>
        <span>Duration</span>
      </motion.div>
      <ul>
        {LEDGER.map((course) => (
          <motion.li key={course.slug} variants={fadeUp} className="border-t border-navy-900/10">
            <Link to="/services" className="group flex items-baseline justify-between gap-6 py-3">
              <span className="font-display text-2xl text-navy-900 transition-colors duration-300 group-hover:text-royal-600">
                {course.shortTitle}
              </span>
              <span className="text-sm tabular-nums text-ink-500 transition-colors duration-300 group-hover:text-navy-900">
                {course.duration}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <motion.div variants={fadeUp} className="border-t border-navy-900/15 pt-4">
        <Link
          to="/services"
          className="group inline-flex items-center gap-2 text-sm font-medium text-royal-600 transition-colors hover:text-navy-900"
        >
          Plus AP, College Admissions and Business English
          <ArrowRight className="size-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" aria-hidden />
        </Link>
      </motion.div>
    </motion.div>
  )
}
