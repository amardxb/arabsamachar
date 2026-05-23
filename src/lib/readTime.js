/**
 * Calculates estimated read time for an article.
 * Works with plain text strings OR Sanity Portable Text (block array).
 *
 * Usage:
 *   import { getReadTime } from '@/lib/readTime'
 *   const time = getReadTime(post.body)  // Sanity blocks
 *   const time = getReadTime(post.content) // plain string
 */

const WORDS_PER_MINUTE = 200;

/**
 * Extracts plain text from Sanity Portable Text blocks.
 * @param {Array} blocks - Sanity block array
 * @returns {string}
 */
function extractTextFromBlocks(blocks) {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      // Only process text blocks (not images, code, etc.)
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text || "").join("");
    })
    .join(" ");
}

/**
 * Returns estimated read time string like "3 min read"
 * @param {string | Array} content - Plain string or Sanity Portable Text blocks
 * @returns {string} e.g. "3 min read"
 */
export function getReadTime(content) {
  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = extractTextFromBlocks(content);
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return `${minutes} min read`;
}

/**
 * Returns word count (useful for debugging or displaying separately)
 * @param {string | Array} content
 * @returns {number}
 */
export function getWordCount(content) {
  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = extractTextFromBlocks(content);
  }

  return text.trim().split(/\s+/).filter(Boolean).length;
}