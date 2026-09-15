import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'

import { Lightbox } from '@/components/Lightbox'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import type { GalleryImage } from '@/data/gallery'
import { spring } from '@/lib/variants'

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <RevealGroup as="ul" className="columns-1 gap-5 sm:columns-2 lg:columns-3" stagger={0.06}>
        {images.map((image, index) => (
          <RevealItem as="li" key={image.id} className="mb-5 break-inside-avoid">
            <motion.button
              type="button"
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -6 }}
              transition={spring}
              className="group relative block w-full overflow-hidden rounded-card border border-slate-200 bg-slate-100 transition-[border-color,box-shadow] duration-500 ease-silk hover:border-sky-400 hover:shadow-card-hover"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
              aria-label={`Open image: ${image.caption ?? image.alt}`}
            >
              <motion.img
                layoutId={`gallery-${image.id}`}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-silk group-hover:scale-[1.03]"
              />
              <span
                className="absolute inset-0 bg-linear-to-t from-navy-950/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span
                className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              >
                <span className="font-display text-xl italic">{image.caption}</span>
                <Maximize2 className="size-4 text-sky-300" />
              </span>
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox images={images} index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  )
}
