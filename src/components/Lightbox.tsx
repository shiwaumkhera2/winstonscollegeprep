import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import type { GalleryImage } from '@/data/gallery'
import { useLockBodyScroll } from '@/lib/useLockBodyScroll'
import { EASE, silk } from '@/lib/variants'

interface LightboxProps {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

const controlClass =
  'z-20 grid size-11 place-items-center rounded-[3px] border border-white/15 bg-white/5 text-white backdrop-blur transition-colors duration-300 hover:border-sky-400 hover:bg-white/10'

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBodyScroll(isOpen)

  const showPrev = () => index !== null && onNavigate((index - 1 + images.length) % images.length)
  const showNext = () => index !== null && onNavigate((index + 1) % images.length)

  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index])

  const image = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.caption ?? image.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="Close image" onClick={onClose} className="absolute inset-0 bg-navy-950/92 backdrop-blur-sm" />

          <motion.figure
            key={image.id}
            layoutId={`gallery-${image.id}`}
            transition={silk(0.55)}
            className="relative z-10 flex max-h-full max-w-5xl flex-col overflow-hidden rounded-card border border-white/10 bg-navy-950 shadow-2xl"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="max-h-[78vh] w-auto max-w-full object-contain"
              style={{ maxWidth: `min(100%, ${Math.round(image.width * 1.75)}px)` }}
            />
            {image.caption && (
              <motion.figcaption
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
                className="flex items-baseline justify-between gap-4 border-t border-white/10 px-5 py-4"
              >
                <span className="font-display text-lg italic text-white">{image.caption}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] tabular-nums text-sky-300">
                  {index! + 1} / {images.length}
                </span>
              </motion.figcaption>
            )}
          </motion.figure>

          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`${controlClass} absolute right-4 top-4 sm:right-6 sm:top-6`}>
            <X className="size-5" aria-hidden />
          </button>

          {images.length > 1 && (
            <>
              <button type="button" onClick={showPrev} aria-label="Previous image" className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}>
                <ChevronLeft className="size-6" aria-hidden />
              </button>
              <button type="button" onClick={showNext} aria-label="Next image" className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}>
                <ChevronRight className="size-6" aria-hidden />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
