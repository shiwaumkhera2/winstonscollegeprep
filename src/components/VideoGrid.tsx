import { RevealGroup, RevealItem } from '@/components/Reveal'
import { VideoEmbed } from '@/components/VideoEmbed'
import type { VideoTestimonial } from '@/data/testimonials'
import { cn } from '@/lib/cn'

/** The first video is featured at double size; the rest fill a three-column grid. */
export function VideoGrid({ videos }: { videos: VideoTestimonial[] }) {
  return (
    <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
      {videos.map((video, index) => {
        const featured = index === 0
        return (
          <RevealItem as="li" key={video.id} className={cn(featured && 'sm:col-span-2 lg:row-span-2')}>
            <VideoEmbed {...video} featured={featured} />
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
