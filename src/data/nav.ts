export interface NavLinkItem {
  to: string
  label: string
}

export const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
]
