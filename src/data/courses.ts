import { asset } from '@/lib/asset'

export interface Course {
  /** URL-safe id. Also used to preselect the course on the contact form (`/contact?course=<slug>`). */
  slug: string
  title: string
  /** Short name for dropdowns and compact cards. */
  shortTitle: string
  duration: string
  description: string
  components: string[]
  /** Image under `public/logos/`. Drop the official exam logo in at the same path to replace the placeholder. */
  logo: string
  logoAlt: string
}

export const courses: Course[] = [
  {
    slug: 'sat',
    title: 'SAT Preparation',
    shortTitle: 'SAT',
    duration: '12 weeks',
    description:
      'Comprehensive preparation for the SAT exam, covering Math, Reading, and Writing sections. Our program includes practice tests, personalized feedback, and proven strategies for success.',
    components: ['Math', 'Evidence-Based Reading', 'Writing & Language', 'Optional Essay'],
    logo: asset('logos/sat.svg'),
    logoAlt: 'SAT logo',
  },
  {
    slug: 'act',
    title: 'ACT Preparation',
    shortTitle: 'ACT',
    duration: '12 weeks',
    description:
      'Expert guidance for ACT success, focusing on English, Math, Reading, and Science sections. Includes targeted practice and time management techniques.',
    components: ['English', 'Mathematics', 'Reading', 'Science', 'Optional Writing'],
    logo: asset('logos/act.svg'),
    logoAlt: 'ACT logo',
  },
  {
    slug: 'gre',
    title: 'GRE Coaching',
    shortTitle: 'GRE',
    duration: '10 weeks',
    description:
      'Advanced preparation for the GRE, covering Quantitative Reasoning, Verbal Reasoning, and Analytical Writing. Includes extensive practice and personalized study plans.',
    components: ['Quantitative Reasoning', 'Verbal Reasoning', 'Analytical Writing'],
    logo: asset('logos/gre.svg'),
    logoAlt: 'GRE logo',
  },
  {
    slug: 'ap',
    title: 'Advanced Placement (AP)',
    shortTitle: 'AP',
    duration: 'Customized',
    description:
      'Winston Academy offers tailored support from expert AP tutors, focusing on personalized study plans and test taking strategies. They can help with multiple AP subjects and provide a comprehensive study experience.',
    components: ['Personalized Study Plans', 'Test Taking Strategies', 'Multiple AP Subjects', 'Expert Tutoring'],
    logo: asset('logos/ap.svg'),
    logoAlt: 'Advanced Placement logo',
  },
  {
    slug: 'ielts',
    title: 'IELTS Training',
    shortTitle: 'IELTS',
    duration: '8 weeks',
    description:
      'Intensive IELTS preparation covering all four skills: Listening, Reading, Writing, and Speaking. Includes mock tests and individual feedback sessions.',
    components: ['Listening', 'Reading', 'Writing', 'Speaking'],
    logo: asset('logos/ielts.svg'),
    logoAlt: 'IELTS logo',
  },
  {
    slug: 'toefl',
    title: 'TOEFL Preparation',
    shortTitle: 'TOEFL',
    duration: '8 weeks',
    description:
      'Comprehensive TOEFL preparation program designed to help you achieve your target score. Focus on academic English and test-taking strategies.',
    components: ['Reading', 'Listening', 'Speaking', 'Writing'],
    logo: asset('logos/toefl.svg'),
    logoAlt: 'TOEFL logo',
  },
  {
    slug: 'gmat',
    title: 'GMAT Preparation',
    shortTitle: 'GMAT',
    duration: '10 weeks',
    description:
      'Comprehensive GMAT preparation focusing on Quantitative, Verbal, Integrated Reasoning, and Analytical Writing sections. Includes business school application guidance.',
    components: ['Quantitative', 'Verbal', 'Integrated Reasoning', 'Analytical Writing'],
    logo: asset('logos/gmat.svg'),
    logoAlt: 'GMAT logo',
  },
  {
    slug: 'ib',
    title: 'International Baccalaureate',
    shortTitle: 'IB',
    duration: 'Customized',
    description:
      'Support for IB Diploma Programme subjects and core components. Includes guidance for Extended Essay, Theory of Knowledge, and CAS activities.',
    components: ['Subject Support', 'Extended Essay', 'Theory of Knowledge', 'CAS'],
    logo: asset('logos/ib.svg'),
    logoAlt: 'International Baccalaureate logo',
  },
  {
    slug: 'college-admissions',
    title: 'College Admissions',
    shortTitle: 'College Admissions',
    duration: 'Customized',
    description:
      'Complete college admissions guidance, including application strategy, essay writing, and interview preparation for US and European universities.',
    components: ['Application Strategy', 'Essay Writing', 'Interview Prep', 'Portfolio Review'],
    logo: asset('logos/college-admissions.svg'),
    logoAlt: 'College Admissions',
  },
  {
    slug: 'business-english',
    title: 'Business English',
    shortTitle: 'Business English',
    duration: 'Customized',
    description:
      'Professional English coaching for workplace communication, presentations, and business writing. Sessions are built around your industry and the situations you actually face, from client calls to board-level presentations.',
    components: ['Presentations & Public Speaking', 'Business Writing & Email', 'Meetings & Negotiation', 'Industry Vocabulary'],
    logo: asset('logos/business-english.svg'),
    logoAlt: 'Business English',
  },
]

export function findCourse(slug: string | null | undefined): Course | undefined {
  return courses.find((course) => course.slug === slug)
}
