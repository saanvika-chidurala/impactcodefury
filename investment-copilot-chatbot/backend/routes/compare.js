const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const { sanitizeModelReply, STANDARD_DISCLAIMER, buildSystemGuardrailPrompt } = require("../services/guardrails");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

// POST /api/compare
// body: { options: [{ name, expectedReturnPct, riskLevel, feesPct, liquidity, notes }], mode }
router.post("/", async (req, res) => {
  try {
    const { options, mode = "beginner" } = req.body;

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Provide at least two options to compare." });
    }

    // Structured, deterministic comparison table (no AI needed for the numbers).
    const table = options.map((o) => ({
      name: o.name || "Unnamed option",
      expectedReturnPct: o.expectedReturnPct ?? null,
      riskLevel: o.riskLevel || "unspecified",
      feesPct: o.feesPct ?? null,
      liquidity: o.liquidity || "unspecified",
      notes: o.notes || "",
    }));

    let aiSummary = null;
    if (process.env.GROQ_API_KEY) {
      const prompt =
        `Compare these investment options for a ${mode} investor in 4-6 short bullet points, ` +
        `covering trade-offs (not a recommendation of which to pick): ${JSON.stringify(table)}`;

      const completion = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemGuardrailPrompt() },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 400,
      });

      aiSummary = sanitizeModelReply(completion.choices[0]?.message?.content || "");
    }

    res.json({ table, aiSummary, disclaimer: STANDARD_DISCLAIMER });
  } catch (err) {
    console.error("Compare route error:", err);
    res.status(500).json({ error: "Could not compare options.", details: err.message });
  }
});

module.exports = router;
