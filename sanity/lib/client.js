import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,          // serve from Sanity's global CDN (free, fast)
  perspective: 'published', // never accidentally serve drafts on the frontend
})

/**
 * sanityFetch — thin wrapper that adds Next.js fetch cache tags.
 * Use this instead of client.fetch() everywhere so you can do
 * on-demand revalidation from /api/revalidate.
 *
 * @param {string}   query  - GROQ query string
 * @param {object}   params - GROQ parameters (optional)
 * @param {string[]} tags   - Cache tags for revalidateTags() (optional)
 */
export async function sanityFetch(query, params = {}, tags = []) {
  return client.fetch(query, params, {
    next: {
      revalidate: false,   // cache forever (on-demand revalidation via webhook)
      tags: ['sanity', ...tags],
    },
  })
}
