import { Mail, Phone } from 'lucide-react'

import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { site } from '@/config'

/** Hairline contact row shown directly beneath the hero. */
export function ContactStrip() {
  return (
    <div className="container-x">
      <div className="flex flex-col gap-4 border-y border-navy-900/10 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 text-navy-900">
            <Mail className="size-4 text-royal-600" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">Email Us</span>
            <span className="font-medium transition-colors duration-300 group-hover:text-royal-600">{site.email}</span>
          </a>
          <a href={site.phoneHref} className="group inline-flex items-center gap-3 text-navy-900">
            <Phone className="size-4 text-royal-600" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">Tel</span>
            <span className="font-medium tabular-nums transition-colors duration-300 group-hover:text-royal-600">{site.phone}</span>
          </a>
        </div>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-royal-600 transition-colors duration-300 hover:text-navy-900"
        >
          <WhatsAppIcon className="size-4" />
          Message us on WhatsApp
        </a>
      </div>
    </div>
  )
}
