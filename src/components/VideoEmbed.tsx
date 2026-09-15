import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

import type { VideoTestimonial } from '@/data/testimonials'
import { cn } from '@/lib/cn'
import { cardLift } from '@/lib/variants'

interface VideoEmbedProps extends VideoTestimonial {
  /** Stretch to fill the grid cell (used for the featured first video on large screens). */
  featured?: boolean
}

/**
 * Click-to-play YouTube embed. Only the thumbnail loads up front; the iframe
 * is created when the visitor presses play, which keeps the page fast.
 */
export function VideoEmbed({ id, title, featured = false }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbnail, setThumbnail] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)

  return (
    <motion.div
      variants={playing ? undefined : cardLift}
      initial="rest"
      whileHover="hover"
      className={cn(
        'group relative overflow-hidden rounded-card border border-slate-200 bg-navy-950 transition-[border-color,box-shadow] duration-500 ease-silk hover:border-sky-400 hover:shadow-card-hover',
        featured ? 'aspect-video lg:aspect-auto lg:h-full' : 'aspect-video',
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="absolute inset-0 size-full text-left">
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
            // maxresdefault is not generated for every video. YouTube then serves a tiny 120×90
            // placeholder with a 200 status, so check the decoded size and fall back to hqdefault.
            onLoad={(event) => {
              if (event.currentTarget.naturalWidth <= 120 && !thumbnail.includes('hqdefault')) {
                setThumbnail(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
              }
            }}
            onError={() => setThumbnail(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="size-full object-cover transition-transform duration-700 ease-silk group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/10 to-transparent" aria-hidden />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/20 bg-navy-950/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur" aria-hidden>
            Testimonial
          </span>

          <span className="absolute inset-0 grid place-items-center" aria-hidden>
            <span
              className={cn(
                'grid place-items-center rounded-full bg-white text-royal-600 shadow-glow transition-transform duration-500 ease-silk group-hover:scale-110',
                featured ? 'size-20 lg:size-24' : 'size-16',
              )}
            >
              <Play className={cn('ml-1 fill-current', featured ? 'size-8 lg:size-9' : 'size-6')} />
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5" aria-hidden>
            <span className={cn('font-display text-white', featured ? 'text-2xl lg:text-3xl' : 'text-lg')}>{title}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Watch</span>
          </span>
        </button>
      )}
    </motion.div>
  )
}
