import { Globe, GraduationCap, Target, TrendingUp, type LucideIcon } from 'lucide-react'

/** How the icon reacts when the card is hovered. Implemented in `FeatureCard`. */
export type FeatureMotion = 'tilt' | 'pulse' | 'rise' | 'spin'

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
  motion: FeatureMotion
}

export const features: Feature[] = [
  {
    title: 'Expert Instructors',
    description: 'Learn from experienced educators with proven track records.',
    icon: GraduationCap,
    motion: 'tilt',
  },
  {
    title: 'Personalized Attention',
    description: 'Small class sizes ensure individual focus and support.',
    icon: Target,
    motion: 'pulse',
  },
  {
    title: 'Proven Results',
    description: 'Consistently high success rates in test scores and admissions.',
    icon: TrendingUp,
    motion: 'rise',
  },
  {
    title: 'Global Perspective',
    description: 'Prepare for international education opportunities.',
    icon: Globe,
    motion: 'spin',
  },
]
