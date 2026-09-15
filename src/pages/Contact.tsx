import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'

import { ContactForm } from '@/components/ContactForm'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { Eyebrow } from '@/components/SectionHeading'
import { Seo } from '@/components/Seo'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { portrait, site } from '@/config'
import { blurUp, fadeUp, stagger } from '@/lib/variants'

const directContact = [
  {
    label: 'WhatsApp',
    value: site.phone,
    href: site.whatsappHref,
    external: true,
    icon: <WhatsAppIcon className="size-5" />,
  },
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    icon: <Mail className="size-5" strokeWidth={1.6} aria-hidden />,
  },
]

export function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        path="/contact"
        description="Get in touch with Winston College Prep by WhatsApp, email, or the contact form to start your test preparation journey."
      />

      <section className="grain relative overflow-hidden bg-white pb-24 pt-40 sm:pb-32 sm:pt-48">
        <div
          className="dot-grid absolute inset-x-0 top-0 h-[32rem] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-48 top-0 size-[36rem] rounded-full opacity-70 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(127,176,255,0.35), transparent 70%)' }}
          aria-hidden
        />

        <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.div variants={stagger(0.12, 0.05)} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <Eyebrow>Get in touch</Eyebrow>
              </motion.div>
              <motion.h1
                variants={blurUp}
                className="mt-7 font-display text-[clamp(2.9rem,6.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-navy-900"
              >
                Contact <span className="italic font-normal text-royal-600">Us</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-7 max-w-xl text-xl leading-relaxed text-ink-600">
                We&rsquo;re here to help you achieve your academic goals. Get in touch with us today.
              </motion.p>
            </motion.div>

            <RevealGroup className="mt-14" stagger={0.1}>
              <RevealItem>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">Direct Contact</p>
              </RevealItem>
              <ul className="mt-4 border-t border-navy-900/10">
                {directContact.map((item) => (
                  <RevealItem as="li" key={item.label} className="border-b border-navy-900/10">
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="group flex items-center gap-5 py-5 transition-colors duration-300"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-[3px] border border-royal-600/15 bg-ice-50 text-royal-600 transition-colors duration-500 group-hover:border-sky-400/60 group-hover:bg-ice-100">
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">{item.label}</span>
                        <span className="block truncate font-display text-2xl text-navy-900 transition-colors duration-300 group-hover:text-royal-600">
                          {item.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 text-ink-400 transition-[color,transform] duration-500 ease-silk group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal-600"
                        aria-hidden
                      />
                    </a>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>

            <Reveal className="mt-12">
              <ContactForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <figure>
                <div className="relative pl-6 pt-6">
                  {/* Offset frame and plate give the portrait an editorial mount. */}
                  <span className="absolute left-0 top-0 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] border border-royal-600/25" aria-hidden />
                  <span className="absolute -bottom-6 -right-6 hidden size-40 bg-ice-100 sm:block" aria-hidden />
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    loading="lazy"
                    className="relative aspect-square w-full rounded-card object-cover shadow-card"
                  />
                </div>
                <figcaption className="mt-12 flex items-end justify-between gap-4 border-t border-navy-900/10 pt-4">
                  <div>
                    <p className="font-display text-2xl text-navy-900">{portrait.name}</p>
                    <p className="mt-1 text-sm text-ink-500">{portrait.title}</p>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-royal-600">{site.altName}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
