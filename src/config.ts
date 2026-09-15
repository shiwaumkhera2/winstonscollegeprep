import { asset } from '@/lib/asset'

/** Business details used across the site. Edit here, not in components. */
export const site = {
  name: 'Winston College Prep',
  shortName: 'Winston',
  altName: 'Winston Academy',
  tagline: 'Your Path to Academic Excellence',
  subheadline: 'Expert preparation for SAT, ACT, IELTS, TOEFL, GRE, GMAT, and IB',
  description:
    'Expert preparation for SAT, ACT, IELTS, TOEFL, GRE, GMAT, and IB. Personalized tutoring and admissions coaching from Winston College Prep.',
  /** Deployed origin (+ base path, no trailing slash). Injected at build time — see vite.config.ts. */
  url: (import.meta.env.VITE_SITE_URL ?? 'https://winstoncollegeprep.net').replace(/\/+$/, ''),
  email: 'wgaspardpe@gmail.com',
  phone: '+51 969 770 267',
  phoneHref: 'tel:+51969770267',
  whatsappHref: 'https://wa.me/51969770267',
  cta: 'Start Your Journey',
  ogImage: '/og-image.png',
}

/** Portrait shown on the Contact page. Replace `public/portrait.jpg` to update it. */
export const portrait = {
  src: asset('portrait.jpg'),
  alt: 'Winston smiling in front of University of Pennsylvania and Yale pennants',
  name: 'Winston',
  title: 'Founder, Winston College Prep',
  width: 464,
  height: 454,
}

/**
 * Static form service for the contact form (GitHub Pages has no backend).
 *   Formspree:  VITE_FORM_ENDPOINT=https://formspree.io/f/<id>
 *   Web3Forms:  VITE_FORM_ENDPOINT=https://api.web3forms.com/submit + VITE_WEB3FORMS_KEY=<key>
 * When empty, the form falls back to opening the visitor's email app.
 */
export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT?.trim() ?? ''
export const WEB3FORMS_ACCESS_KEY: string = import.meta.env.VITE_WEB3FORMS_KEY?.trim() ?? ''
