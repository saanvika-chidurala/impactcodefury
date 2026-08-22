const fs = require("fs");
const path = require("path");

const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "knowledge.json"), "utf-8")
);

/**
 * Very small "RAG-style" retriever.
 * This is intentionally simple (no vector database, no embeddings) so it
 * runs anywhere with zero extra setup. It scores each knowledge article by
 * how many of its tags/title words appear in the user's message, and
 * returns the top matches. Good enough for a focused knowledge base like
 * this one; swap in a real vector store later if the knowledge base grows.
 */
function retrieveRelevantArticles(query, topN = 3) {
  const normalizedQuery = query.toLowerCase();

  const scored = knowledgeBase.map((article) => {
    let score = 0;
    const haystack = [article.title, ...article.tags].map((s) => s.toLowerCase());

    for (const term of haystack) {
      if (normalizedQuery.includes(term)) {
        score += term.length > 4 ? 2 : 1; // longer/more specific matches count more
      }
    }
    return { article, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.article);
}

function getArticleById(id) {
  return knowledgeBase.find((a) => a.id === id);
}

function getAllArticles() {
  return knowledgeBase;
}

module.exports = { retrieveRelevantArticles, getArticleById, getAllArticles };
