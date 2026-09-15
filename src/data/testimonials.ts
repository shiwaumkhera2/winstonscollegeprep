/**
 * YouTube video IDs for the Testimonials page (the part after `watch?v=`).
 * Add a new ID to this array and it will appear in the grid automatically.
 */
export const testimonialVideoIds: string[] = [
  'ToLEyVWvXJ0',
  'XTx1RImJtqQ',
  'ZTEbCbgcG2Q',
  'sL7zkEwbnH4',
  'fUiGgx2g4xk',
  'vuuHZybeEOU',
  'ZlxvrUi8Cxs',
  'PRmQ12VsiFk',
  '1GNe9o4Lbg4',
  '76Uga6ieA0g',
]

export interface VideoTestimonial {
  id: string
  /** Used for the iframe title and the play button's accessible label. */
  title: string
}

export const testimonials: VideoTestimonial[] = testimonialVideoIds.map((id, index) => ({
  id,
  title: `Student testimonial ${index + 1}`,
}))
