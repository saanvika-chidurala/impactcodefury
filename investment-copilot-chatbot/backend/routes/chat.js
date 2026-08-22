const express = require("express");
const router = express.Router();

const { retrieveRelevantArticles } = require("../services/ragService");
const { getChatCompletion } = require("../services/groqService");
const { checkUserMessage, sanitizeModelReply, STANDARD_DISCLAIMER } = require("../services/guardrails");

// POST /api/chat
// body: { message: string, mode: "beginner"|"intermediate"|"advanced", profile: {...}, history: [{role, content}] }
router.post("/", async (req, res) => {
  try {
    const { message, mode = "beginner", profile = null, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "A non-empty 'message' string is required." });
    }

    const guardrailFlags = checkUserMessage(message);
    const retrievedArticles = retrieveRelevantArticles(message, 3);

    const { replyText, reasoning } = await getChatCompletion({
      userMessage: message,
      mode,
      profile,
      retrievedArticles,
      history,
    });

    const safeReply = sanitizeModelReply(replyText);

    res.json({
      reply: safeReply,
      disclaimer: STANDARD_DISCLAIMER,
      guardrailFlags,
      sources: retrievedArticles.map((a) => ({ id: a.id, title: a.title, source: a.source })),
      reasoning,
    });
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({ error: "Something went wrong generating a response.", details: err.message });
  }
});

module.exports = router;
