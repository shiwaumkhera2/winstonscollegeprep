import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/Button'
import { site } from '@/config'
import type { Course } from '@/data/courses'
import { cardLift, EASE, spring } from '@/lib/variants'

/** Logo lifts and picks up a blue glow while the card is hovered. */
const logoVariants: Variants = {
  rest: {
    scale: 1,
    filter: 'drop-shadow(0px 0px 0px rgba(79,142,247,0))',
    transition: { scale: spring, filter: { duration: 0.5, ease: EASE } },
  },
  hover: {
    scale: 1.06,
    filter: 'drop-shadow(0px 14px 28px rgba(79,142,247,0.45))',
    transition: { scale: spring, filter: { duration: 0.5, ease: EASE } },
  },
}

const cardClass =
  'group flex h-full flex-col rounded-card border border-slate-200 bg-white transition-[border-color,box-shadow] duration-500 ease-silk hover:border-sky-400 hover:shadow-card-hover'

interface CourseCardProps {
  course: Course
  /** `compact` is the smaller preview used on the home page. */
  variant?: 'full' | 'compact'
}

export function CourseCard({ course, variant = 'full' }: CourseCardProps) {
  if (variant === 'compact') {
    return (
      <motion.article variants={cardLift} initial="rest" whileHover="hover" className={cardClass}>
        <Link to="/services" className="flex h-full flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-[3px] border border-slate-200 bg-ice-50">
              <motion.img
                variants={logoVariants}
                src={course.logo}
                alt={course.logoAlt}
                width={320}
                height={160}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </span>
            <ArrowUpRight
              className="mt-1 size-5 text-ink-400 transition-[color,transform] duration-500 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal-600"
              aria-hidden
            />
          </div>
          <h3 className="mt-7 font-display text-2xl leading-tight">{course.title}</h3>
          <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-royal-600">Duration: {course.duration}</p>
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-600">{course.description}</p>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article variants={cardLift} initial="rest" whileHover="hover" className={cardClass}>
      <div className="dot-grid relative flex h-44 items-center justify-center overflow-hidden border-b border-slate-200 bg-ice-50 px-8">
        <motion.img
          variants={logoVariants}
          src={course.logo}
          alt={course.logoAlt}
          width={320}
          height={160}
          loading="lazy"
          className="relative max-h-24 w-auto object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <h3 className="font-display text-[1.65rem] leading-tight">{course.title}</h3>
        <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-royal-600">Duration: {course.duration}</p>
        <p className="mt-5 leading-relaxed text-ink-600">{course.description}</p>

        <div className="mt-7 border-t border-slate-200 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">Components:</p>
          <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {course.components.map((component) => (
              <li key={component} className="flex items-start gap-2.5 text-sm text-ink-700">
                <span className="mt-[0.65em] h-px w-3 shrink-0 bg-royal-600" aria-hidden />
                {component}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <Button to={`/contact?course=${course.slug}`} fullWidth icon={<ArrowRight />}>
            {site.cta}
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
