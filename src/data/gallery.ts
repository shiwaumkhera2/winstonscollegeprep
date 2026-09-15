import { asset } from '@/lib/asset'

export interface GalleryImage {
  id: string
  /** Image under `public/gallery/`. */
  src: string
  alt: string
  caption?: string
  /** Intrinsic size — keeps the masonry layout stable while images load. */
  width: number
  height: number
}

/**
 * To add a photo: copy it into `public/gallery/`, then add an entry here with its pixel size.
 * Images render in this order.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'march-sat-1410',
    src: asset('gallery/march-sat-1410.jpg'),
    alt: 'A student holding a whiteboard that reads "March SAT 1,410" in front of a wall of university pennants',
    caption: 'March SAT — 1,410',
    width: 472,
    height: 703,
  },
  {
    id: 'sat-prep-session',
    src: asset('gallery/sat-prep-session.jpg'),
    alt: 'Winston and a student reviewing SAT prep books together at a round table',
    caption: 'SAT prep session',
    width: 476,
    height: 307,
  },
  {
    id: 'summer-sat-class',
    src: asset('gallery/summer-sat-class.jpg'),
    alt: 'A summer SAT class of students posing with a hand-drawn "Summer SAT" sign in a classroom',
    caption: 'Summer SAT class',
    width: 471,
    height: 298,
  },
  {
    id: 'classroom-tutoring',
    src: asset('gallery/classroom-tutoring.jpg'),
    alt: 'Two students standing together in the Winston classroom',
    caption: 'In the classroom',
    width: 441,
    height: 282,
  },
  {
    id: 'official-sat-study-guide',
    src: asset('gallery/official-sat-study-guide.jpg'),
    alt: 'A student holding The Official SAT Study Guide beside Winston',
    caption: 'The Official SAT Study Guide',
    width: 477,
    height: 388,
  },
  {
    id: 'sat-math-workbook',
    src: asset('gallery/sat-math-workbook.jpg'),
    alt: 'A student and Winston smiling with a math workbook for the new SAT',
    caption: 'Math workbook for the new SAT',
    width: 476,
    height: 308,
  },
  {
    id: 'winston-teaching',
    src: asset('gallery/winston-teaching.jpg'),
    alt: 'Winston teaching a writing lesson in front of a projected "Improving Paragraphs" exercise',
    caption: 'Teaching the writing section',
    width: 477,
    height: 332,
  },
  {
    id: 'sat-score-1470',
    src: asset('gallery/sat-score-1470.jpg'),
    alt: 'Winston giving a thumbs up next to a student holding a sign that reads "SAT score 1,470"',
    caption: 'SAT score — 1,470',
    width: 477,
    height: 720,
  },
  {
    id: 'sat-winston-sign',
    src: asset('gallery/sat-winston-sign.jpg'),
    alt: 'A student holding a "SAT Winston" card in front of Dartmouth, Brown, Princeton and Penn pennants',
    caption: 'SAT day at Winston',
    width: 477,
    height: 337,
  },
  {
    id: 'toefl-official-guide',
    src: asset('gallery/toefl-official-guide.jpg'),
    alt: 'Winston pointing at The Official Guide to the New TOEFL held by a student',
    caption: 'TOEFL preparation',
    width: 479,
    height: 386,
  },
  {
    id: 'winston-with-student',
    src: asset('gallery/winston-with-student.jpg'),
    alt: 'Winston with a student in a hallway, Harvard and MIT flags pinned to a corkboard behind them',
    caption: 'Winston with a student',
    width: 476,
    height: 307,
  },
  {
    id: 'barrons-sat-math',
    src: asset('gallery/barrons-sat-math.jpg'),
    alt: "Winston and a student working through Barron's SAT Math Workbook side by side",
    caption: 'SAT math, one to one',
    width: 476,
    height: 309,
  },
  {
    id: 'march-sat-1440',
    src: asset('gallery/march-sat-1440.jpg'),
    alt: 'A smiling student holding a whiteboard that reads "March SAT 1,440"',
    caption: 'March SAT — 1,440',
    width: 479,
    height: 717,
  },
]
