import { client } from "../../sanity/lib/client"; // ⚠️ 

const RESULTS_PER_PAGE = 10;

export async function searchArticles({ query, sort = "score", page = 1 }) {
  if (!query || query.trim().length < 2) {
    return { results: [], total: 0, totalPages: 0 };
  }

  const words = query.trim().split(/\s+/).filter(Boolean);

  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;

  const params = {};
  words.forEach((word, i) => {
    params[`w${i}`] = `*${word}*`;
  });

  // AND logic: har word title/description/content/keywords mein kahin bhi ho sakta hai.
  // "keywords[] match" purane articles (jinme field hi nahi hai) ke liye safely
  // false ban jata hai - koi crash/error nahi hota.
  const wordConditions = words
    .map(
      (_, i) =>
        `(title match $w${i} || description match $w${i} || pt::text(content) match $w${i} || keywords[] match $w${i})`
    )
    .join(" && ");

  // Scoring: keywords match ko sabse zyada boost (4) - kyunki ye manually
  // curated hain, sabse accurate signal hain "user kya dhoondh raha hai" ke liye
  const scoreBoosts = words
    .map(
      (_, i) =>
        `boost(keywords[] match $w${i}, 4), boost(title match $w${i}, 3), boost(description match $w${i}, 2), boost(pt::text(content) match $w${i}, 1)`
    )
    .join(", ");

  const orderClause = sort === "newest" ? "order(date desc)" : "order(_score desc)";

  const groqQuery = `
    {
      "results": *[_type == "news" && (${wordConditions})]
      | score(${scoreBoosts})
      | ${orderClause} [${start}...${end}] {
        _id,
        title,
        slug,
        description,
        image,
        category,
        date,
        "readTime": round(length(pt::text(content)) / 5 / 180)
      },
      "total": count(*[_type == "news" && (${wordConditions})])
    }
  `;

  const data = await client.fetch(groqQuery, params);

  return {
    results: data.results,
    total: data.total,
    totalPages: Math.ceil(data.total / RESULTS_PER_PAGE),
  };
}