export type Stat =
  | {
      kind: 'number'
      /** Counts up from 0 to this value when scrolled into view. */
      value: number
      suffix?: string
      unit?: string
      label: string
    }
  | {
      kind: 'text'
      title: string
      description: string
    }

export const stats: Stat[] = [
  { kind: 'number', value: 4, suffix: '+', unit: 'points', label: 'Average ACT score improvement' },
  { kind: 'number', value: 200, suffix: '+', unit: 'points', label: 'Average SAT score improvement' },
  { kind: 'number', value: 95, suffix: '%', unit: 'acceptance rate', label: 'Of our students are accepted to college' },
  {
    kind: 'text',
    title: 'Consistent IELTS & TOEFL score improvements',
    description: 'Students reach the band and scaled scores their target universities ask for.',
  },
  {
    kind: 'text',
    title: 'Students admitted to top universities worldwide',
    description: 'From the United States to Europe, our students go on to study at leading institutions.',
  },
]
