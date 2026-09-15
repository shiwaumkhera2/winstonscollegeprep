import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { site } from '@/config'
import { navLinks } from '@/data/nav'
import { cn } from '@/lib/cn'
import { useLockBodyScroll } from '@/lib/useLockBodyScroll'
import { fadeUp, silk, stagger } from '@/lib/variants'

export function Navbar() {
  const { scrollY } = useScroll()
  // Transparent over the hero; frosted glass with a hairline once the page scrolls.
  const backgroundColor = useTransform(scrollY, [0, 120], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.72)'])
  const backdropFilter = useTransform(scrollY, [0, 120], ['blur(0px) saturate(100%)', 'blur(18px) saturate(160%)'])
  const borderColor = useTransform(scrollY, [0, 120], ['rgba(15, 28, 63, 0)', 'rgba(15, 28, 63, 0.1)'])

  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        style={
          open
            ? { backgroundColor: 'transparent', borderColor: 'transparent' }
            : { backgroundColor, backdropFilter, WebkitBackdropFilter: backdropFilter, borderColor }
        }
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <nav className="container-x flex h-20 items-center justify-between gap-6" aria-label="Primary">
          <Logo onDark={open} />

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className="relative block py-2 text-[12.5px] font-medium uppercase tracking-[0.16em] text-ink-600 transition-colors duration-300 hover:text-navy-900"
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn(isActive && 'text-navy-900')}>{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="bg-accent-gradient absolute inset-x-0 -bottom-0.5 h-px"
                          transition={silk(0.5)}
                          aria-hidden
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button to="/contact" size="sm">
              {site.cta}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              'grid size-11 place-items-center rounded-[3px] transition-colors duration-300 lg:hidden',
              open ? 'text-white hover:bg-white/10' : 'text-navy-900 hover:bg-ice-100',
            )}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu />}</AnimatePresence>
    </>
  )
}

function MobileMenu() {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 overflow-y-auto bg-navy-950 text-white lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dot-grid-light absolute inset-0 opacity-60" aria-hidden />
      <motion.nav
        aria-label="Mobile"
        className="container-x relative flex min-h-full flex-col pb-10 pt-28"
        variants={stagger(0.06, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <ul>
          {navLinks.map((link) => (
            <motion.li key={link.to} variants={fadeUp} className="border-b border-white/10">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-baseline justify-between py-5 font-display text-4xl font-medium tracking-[-0.02em] transition-colors',
                    isActive ? 'text-sky-300' : 'text-white hover:text-sky-300',
                  )
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <motion.div variants={fadeUp} className="mt-auto space-y-8 pt-12">
          <Button to="/contact" variant="inverse" fullWidth size="lg">
            {site.cta}
          </Button>
          <ul className="space-y-3 text-sm text-ice-100/80">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-white">
                <Mail className="size-4 text-sky-300" aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-white">
                <Phone className="size-4 text-sky-300" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                <WhatsAppIcon className="size-4 text-sky-300" /> WhatsApp
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    </motion.div>
  )
}
