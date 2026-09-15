import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Reveal } from '@/components/Reveal'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { site } from '@/config'
import { navLinks } from '@/data/nav'
import { fadeIn } from '@/lib/variants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-ice-100/80">
      <div className="dot-grid-light absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-64 left-1/2 size-[50rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(36,71,184,0.55), transparent 70%)' }}
        aria-hidden
      />

      <div className="container-x relative pb-10 pt-20 sm:pt-24">
        <Reveal variants={fadeIn}>
          <p className="font-display text-[clamp(3rem,8.6vw,8rem)] font-medium leading-[0.92] tracking-[-0.035em] text-white">
            <span className="block sm:inline">Winston </span>
            <span className="italic font-normal text-sky-300">College Prep</span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl text-white">{site.tagline}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-ice-100/70">{site.subheadline}.</p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-ice-100/50">Also known as {site.altName}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">Quick links</h3>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-display text-lg text-white/90 transition-colors hover:text-sky-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">Contact</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-white/90 transition-colors hover:text-sky-300">
                  <Mail className="size-4 shrink-0 text-sky-300" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 tabular-nums text-white/90 transition-colors hover:text-sky-300">
                  <Phone className="size-4 shrink-0 text-sky-300" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-white/90 transition-colors hover:text-sky-300"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-sky-300" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ice-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>SAT · ACT · IELTS · TOEFL · GRE · GMAT · IB · AP</p>
        </div>
      </div>
    </footer>
  )
}
