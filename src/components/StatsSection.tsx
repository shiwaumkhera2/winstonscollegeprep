import { RevealGroup, RevealItem } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { stats, type Stat } from '@/data/stats'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/lib/useCountUp'

type NumberStat = Extract<Stat, { kind: 'number' }>
type TextStat = Extract<Stat, { kind: 'text' }>

function NumberStatCell({ stat, className }: { stat: NumberStat; className?: string }) {
  const { ref, value } = useCountUp<HTMLDivElement>(stat.value)

  return (
    <div ref={ref} className={cn('py-10 lg:py-12', className)}>
      <p className="text-gradient-light font-display text-[clamp(4rem,8vw,7rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">
        {value}
        {stat.suffix}
      </p>
      {stat.unit && <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">{stat.unit}</p>}
      <p className="mt-2 max-w-[18rem] text-ice-100/80">{stat.label}</p>
    </div>
  )
}

function TextStatRow({ stat }: { stat: TextStat }) {
  return (
    <div className="flex gap-5">
      <span className="mt-4 h-px w-8 shrink-0 bg-sky-400" aria-hidden />
      <div>
        <p className="font-display text-2xl leading-snug text-white">{stat.title}</p>
        <p className="mt-2 leading-relaxed text-ice-100/70">{stat.description}</p>
      </div>
    </div>
  )
}

/** The one dark band on the site: outcomes in oversized serif numerals. */
export function StatsSection() {
  const numberStats = stats.filter((s): s is NumberStat => s.kind === 'number')
  const textStats = stats.filter((s): s is TextStat => s.kind === 'text')

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28 lg:py-36">
      <div className="dot-grid-light absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(47,91,224,0.45), transparent 70%)' }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Achievements"
          title="Results our students can measure"
          description="Score gains and admissions outcomes that open doors at universities around the world."
          onDark
        />

        <RevealGroup className="mt-20 grid border-t border-white/10 lg:grid-cols-3" stagger={0.12}>
          {numberStats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={cn(
                'border-b border-white/10 lg:border-b-0',
                index > 0 && 'lg:border-l lg:pl-10',
                index < numberStats.length - 1 && 'lg:pr-10',
              )}
            >
              <NumberStatCell stat={stat} />
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-14 grid gap-x-16 gap-y-8 border-t border-white/10 pt-12 md:grid-cols-2" stagger={0.12}>
          {textStats.map((stat) => (
            <RevealItem key={stat.title}>
              <TextStatRow stat={stat} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
