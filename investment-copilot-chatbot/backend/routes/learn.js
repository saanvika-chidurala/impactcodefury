const express = require("express");
const router = express.Router();
const { getAllArticles, getArticleById } = require("../services/ragService");

// GET /api/learn - list all articles (for the Learning Hub)
router.get("/", (req, res) => {
  res.json({ articles: getAllArticles() });
});

// GET /api/learn/:id - single article
router.get("/:id", (req, res) => {
  const article = getArticleById(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found." });
  res.json({ article });
});

module.exports = router;
