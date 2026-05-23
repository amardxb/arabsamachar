import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * urlForImage — returns the full Sanity CDN URL (format auto-selected).
 * Used in <meta> tags and anywhere you need a plain string URL.
 *
 * IMPORTANT: this returns the FULL-SIZE image. For <img>/<Image> tags
 * always use imgUrl() below so the CDN delivers a correctly-sized variant.
 */
export const urlForImage = (source) => {
  try {
    if (!source?.asset?._ref) return '/fallback.png'
    return imageBuilder.image(source).auto('format').fit('max').url()
  } catch {
    return '/fallback.png'
  }
}

/**
 * imgUrl — returns a resized, format-optimised Sanity CDN URL.
 *
 * Use this for every <BlurImage> / next/image src so the browser
 * downloads the smallest variant that still looks sharp.
 *
 * @param {object} source   - Sanity image object from GROQ
 * @param {number} width    - Rendered width in px (match the CSS size)
 * @param {number} quality  - 1-100, default 75 (sweet spot for news images)
 */
export const imgUrl = (source, width = 800, quality = 75) => {
  try {
    if (!source?.asset?._ref) return '/fallback.png'
    return imageBuilder
      .image(source)
      .width(width)
      .quality(quality)
      .auto('format')   // AVIF → WebP → JPEG based on browser support
      .fit('max')
      .url()
  } catch {
    return '/fallback.png'
  }
}

/*
 * Preset helpers — use these to keep width choices consistent site-wide:
 *
 *   imgUrl(image, 320)   → thumbnail (150px wide card image)
 *   imgUrl(image, 640)   → medium (section hero on mobile)
 *   imgUrl(image, 960)   → large (featured card on tablet)
 *   imgUrl(image, 1200)  → hero (full-width article image)
 */
