import { CtaBanner } from '@/components/CtaBanner'
import { Gallery } from '@/components/Gallery'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { gallery } from '@/data/gallery'

export function GalleryPage() {
  return (
    <>
      <Seo title="Gallery" path="/gallery" description="Moments from classes, workshops and celebrations at Winston College Prep." />

      <PageHeader eyebrow="Gallery" title="Gallery" description="A look inside our classes, workshops, and the moments worth celebrating." />

      <Section tone="ice" padding="tight" className="lg:py-24">
        <Gallery images={gallery} />
      </Section>

      <CtaBanner tone="white" />
    </>
  )
}
